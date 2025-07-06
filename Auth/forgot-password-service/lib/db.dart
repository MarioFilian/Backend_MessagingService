import 'package:postgres/postgres.dart';

class Database {
  final PostgreSQLConnection connection;

  Database({
    required String host,
    required int port,
    required String databaseName,
    required String username,
    required String password,
  }) : connection = PostgreSQLConnection(host, port, databaseName,
            username: username, password: password);

  Future<void> open() async {
    await connection.open();
  }

  Future<void> createResetTokensTableIfNotExists() async {
    await connection.query('''
      CREATE TABLE IF NOT EXISTS reset_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        token TEXT NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    ''');
  }

  Future<List<List<dynamic>>> getUserByEmail(String email) async {
    return await connection.query(
      'SELECT id, enabled FROM users WHERE email = @email LIMIT 1',
      substitutionValues: {'email': email},
    );
  }

  Future<void> insertResetToken(
      int userId, String token, DateTime expiresAt) async {
    await connection.query(
      '''
      INSERT INTO reset_tokens (user_id, token, expires_at)
      VALUES (@user_id, @token, @expires_at)
      ''',
      substitutionValues: {
        'user_id': userId,
        'token': token,
        'expires_at': expiresAt.toIso8601String(),
      },
    );
  }
}
