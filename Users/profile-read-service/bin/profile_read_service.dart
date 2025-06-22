import 'dart:convert';
import 'dart:io';
import 'dart:math';

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

  // POST /forgot-password
  router.post('/forgot-password', (Request request) async {
    try {
      final payload = await request.readAsString();
      final data = jsonDecode(payload);

      final emailRaw = data['email'];
      final email = emailRaw is String ? emailRaw.trim() : null;

      if (email == null || email.isEmpty) {
        return Response(
          400,
          body: jsonEncode({'error': 'Email is required'}),
          headers: {'content-type': 'application/json'},
        );
      }

      final userResult = await db.query(
        'SELECT id, enabled FROM users WHERE email = @email LIMIT 1',
        substitutionValues: {'email': email},
      );

      if (userResult.isEmpty) {
        return Response(
          404,
          body: jsonEncode({'error': 'User not found'}),
          headers: {'content-type': 'application/json'},
        );
      }

      final userId = userResult.first[0];
      final enabled = userResult.first[1] as bool? ?? false;

      if (!enabled) {
        return Response.forbidden(
          jsonEncode({'error': 'User is disabled'}),
          headers: {'content-type': 'application/json'},
        );
      }

      final token = _generateToken();
      final expiresAt = DateTime.now().toUtc().add(const Duration(hours: 1));

      await db.query(
        'INSERT INTO reset_tokens(token, user_id, expires_at) VALUES (@token, @userId, @expiresAt)',
        substitutionValues: {
          'token': token,
          'userId': userId,
          'expiresAt': expiresAt,
        },
      );

      print('🔐 Generated token for $email: $token');

      return Response.ok(
        jsonEncode({'message': 'Token generated', 'token': token}),
        headers: {'content-type': 'application/json'},
      );
    } catch (e, stack) {
      print('❌ Error in /forgot-password: $e\n$stack');
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

String _generateToken([int length = 32]) {
  const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  final rand = Random.secure();
  return List.generate(length, (_) => chars[rand.nextInt(chars.length)]).join();
}
