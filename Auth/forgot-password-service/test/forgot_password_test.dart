import 'package:test/test.dart';
import 'package:forgot_password_service/token_service.dart';

void main() {
  group('TokenService', () {
    final service = TokenService();

    test('should generate token of correct length', () {
      final token = service.generateToken();
      expect(token.length, equals(32));
    });

    test('should generate different tokens', () {
      final token1 = service.generateToken();
      final token2 = service.generateToken();
      expect(token1, isNot(equals(token2)));
    });

    test('should return correct expiry date', () {
      final now = DateTime.now().toUtc();
      final expiry = service.getExpiryDate(hours: 2);
      final difference = expiry.difference(now).inHours;
      expect(difference, inInclusiveRange(1, 2)); // allow small drift
    });
  });
}
