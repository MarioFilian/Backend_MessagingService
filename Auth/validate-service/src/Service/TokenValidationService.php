<?php

namespace App\Service;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

class TokenValidationService
{
    private string $jwtSecret;

    public function __construct()
    {
        $this->jwtSecret = $_ENV['JWT_SECRET'] ?? 'default_secret';
    }

    public function validateAccessToken(string $token): bool
    {
        try {
            $decoded = JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
            // Aquí puedes validar claims adicionales si quieres
            return true;
        } catch (ExpiredException $e) {
            // Token expirado
            return false;
        } catch (\Exception $e) {
            // Firma inválida o token mal formado
            return false;
        }
    }

    public function validateRefreshToken(string $token): bool
    {
        try {
            $decoded = JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
            return true;
        } catch (ExpiredException $e) {
            return false;
        } catch (\Exception $e) {
            return false;
        }
    }
}
