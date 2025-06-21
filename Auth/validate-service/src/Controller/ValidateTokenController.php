<?php

namespace App\Controller;

use App\Service\TokenValidationService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ValidateTokenController extends AbstractController
{
    #[Route('/validate/access', name: 'validate_access', methods: ['POST'])]
    public function validateAccess(Request $request, TokenValidationService $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['accessToken'])) {
            return $this->json(['error' => 'Missing accessToken'], 400);
        }

        $valid = $validator->validateAccessToken($data['accessToken']);
        return $this->json(['valid' => $valid]);
    }

    #[Route('/validate/refresh', name: 'validate_refresh', methods: ['POST'])]
    public function validateRefresh(Request $request, TokenValidationService $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['refreshToken'])) {
            return $this->json(['error' => 'Missing refreshToken'], 400);
        }

        $valid = $validator->validateRefreshToken($data['refreshToken']);
        return $this->json(['valid' => $valid]);
    }
}
