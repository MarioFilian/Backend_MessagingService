import 'dart:io';

import 'package:shelf/shelf_io.dart';

import '../lib/config.dart';
import '../lib/db.dart';
import '../lib/token_service.dart';
import '../lib/handlers.dart';

void main() async {
  final config = Config.fromEnv();

  final database = Database(
    host: config.dbHost,
    port: config.dbPort,
    databaseName: config.dbName,
    username: config.dbUser,
    password: config.dbPassword,
  );

  await database.open();
  print('✅ Connected to PostgreSQL');

  await database.createResetTokensTableIfNotExists();

  final tokenService = TokenService();

  final handler = createHandler(database, tokenService);

  final server = await serve(handler, InternetAddress.anyIPv4, 3005);
  print('🚀 Server listening on port ${server.port}');
}
