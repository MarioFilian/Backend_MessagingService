import 'dart:convert';

import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

import 'db.dart';
import 'token_service.dart';

Handler createHandler(Database database, TokenService tokenService) {
  final router = Router();

  router.post('/forgot-password', (Request request) async {
    try {
      final body = await request.readAsString();
      final data = jsonDecode(body);
      final email = data['email']?.toString();

      if (email == null || email.isEmpty) {
        return Response(400,
            body: jsonEncode({'error': 'Email is required'}),
            headers: {'Content-Type': 'application/json'});
      }

      final userResult = await database.getUserByEmail(email);
      if (userResult.isEmpty) {
        return Response(404,
            body: jsonEncode({'error': 'Email not found'}),
            headers: {'Content-Type': 'application/json'});
      }

      final userId = userResult.first[0] as int;
      final userEnabled = userResult.first[1] as bool;

      if (!userEnabled) {
        return Response.forbidden(jsonEncode({'error': 'User is disabled'}),
            headers: {'Content-Type': 'application/json'});
      }

      final token = tokenService.generateToken();
      final expiresAt = tokenService.getExpiryDate();

      await database.insertResetToken(userId, token, expiresAt);

      print('🔐 Token for $email → $token');

      return Response.ok(
        jsonEncode({'message': 'Token generated', 'token': token}),
        headers: {'Content-Type': 'application/json'},
      );
    } catch (e, stacktrace) {
      print('Error: $e\n$stacktrace');
      return Response.internalServerError(
          body: jsonEncode({'error': 'Internal Server Error'}),
          headers: {'Content-Type': 'application/json'});
    }
  });

  return router;
}
