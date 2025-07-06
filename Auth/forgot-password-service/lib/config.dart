import 'package:dotenv/dotenv.dart';

class Config {
  final String dbHost;
  final int dbPort;
  final String dbName;
  final String dbUser;
  final String dbPassword;

  Config._({
    required this.dbHost,
    required this.dbPort,
    required this.dbName,
    required this.dbUser,
    required this.dbPassword,
  });

  factory Config.fromEnv() {
    final env = DotEnv(includePlatformEnvironment: true)..load();

    return Config._(
      dbHost: env['DB_HOST'] ?? 'localhost',
      dbPort: int.tryParse(env['DB_PORT'] ?? '5432') ?? 5432,
      dbName: env['DB_NAME'] ?? 'postgres',
      dbUser: env['DB_USER'] ?? 'postgres',
      dbPassword: env['DB_PASSWORD'] ?? '',
    );
  }
}
