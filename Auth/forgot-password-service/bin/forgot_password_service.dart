import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:dotenv/dotenv.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:postgres/postgres.dart';

late final PostgreSQLConnection db;

void main() async {
  // Cargar variables de entorno desde el archivo .env
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

  await db.open();
  print('✅ Connected to PostgreSQL at $host:$port ($dbName)');

  final app = Router();

  app.post('/forgot-password', (Request request) async {
    final body = await request.readAsString();
    final data = jsonDecode(body);

    final email = data['email'];
    if (email == null || email.toString().isEmpty) {
      return Response(400, body: jsonEncode({'error': 'Email is required'}));
    }

    final results = await db.query(
      '''
      SELECT id, enabled FROM users 
      WHERE email = @email
      LIMIT 1
      ''',
      substitutionValues: {'email': email},
    );

    if (results.isEmpty) {
      return Response(404, body: jsonEncode({'error': 'Email not found'}));
    }

    final userEnabled = results.first[1] == true;
    if (!userEnabled) {
      return Response.forbidden(jsonEncode({'error': 'User is disabled'}));
    }

    final token = _generateToken();
    print('🔐 Token for $email: $token');

    return Response.ok(
      jsonEncode({'message': 'Token generated', 'token': token}),
      headers: {'Content-Type': 'application/json'},
    );
  });

  final handler = const Pipeline().addMiddleware(logRequests()).addHandler(app);

  final server = await serve(handler, InternetAddress.anyIPv4, 3005);
  print('🚀 Server running on http://localhost:${server.port}');
}

String _generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  final rand = Random.secure();
  return List.generate(32, (_) => chars[rand.nextInt(chars.length)]).join();
}
