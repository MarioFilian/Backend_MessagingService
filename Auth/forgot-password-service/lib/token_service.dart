import 'dart:math';

class TokenService {
  String generateToken([int length = 32]) {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    final rand = Random.secure();
    return List.generate(length, (_) => chars[rand.nextInt(chars.length)])
        .join();
  }

  DateTime getExpiryDate({int hours = 1}) =>
      DateTime.now().toUtc().add(Duration(hours: hours));
}
