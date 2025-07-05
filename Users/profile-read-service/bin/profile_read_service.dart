import 'dart:convert';
import 'dart:io';

import 'package:dotenv/dotenv.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:postgres/postgres.dart';

late final PostgreSQLConnection db;

Future<void> main() async {
  final env = DotEnv()..load();

  final host = env['DB_HOST'] ?? 'localhost';
  final port = int.tryParse(env['DB_PORT'] ?? '5432') ?? 5432;
  final dbName = env['DB_NAME'] ?? 'postgres';
  final user = env['DB_USER'] ?? 'postgres';
  final password = env['DB_PASSWORD'] ?? '';

  db = PostgreSQLConnection(
    host,
    port,
    dbName,
    username: user,
    password: password,
  );

  try {
    await db.open();
    print('✅ Connected to PostgreSQL at $host:$port/$dbName');
  } catch (e) {
    print('❌ Could not connect to PostgreSQL: $e');
    exit(1);
  }

  final router = Router();

  // GET /profile/<id>
  router.get('/profile/<id|[0-9]+>', (Request request, String id) async {
    try {
      final result = await db.query(
        'SELECT id, username, email FROM users WHERE id = @id',
        substitutionValues: {'id': int.parse(id)},
      );

      if (result.isEmpty) {
        return Response.notFound(
          jsonEncode({'error': 'User not found'}),
          headers: {'content-type': 'application/json'},
        );
      }

      final row = result.first;
      final user = {
        'id': row[0],
        'username': row[1],
        'email': row[2],
      };

      return Response.ok(
        jsonEncode(user),
        headers: {'content-type': 'application/json'},
      );
    } catch (e, stack) {
      print('❌ Error in /profile/$id: $e\n$stack');
      return Response.internalServerError(
        body: jsonEncode({'error': 'Internal Server Error'}),
        headers: {'content-type': 'application/json'},
      );
    }
  });

  final handler = Pipeline().addMiddleware(logRequests()).addHandler(router);

  final server = await serve(handler, InternetAddress.anyIPv4, 3008);
  print('🚀 Server running on http://localhost:${server.port}');
}
