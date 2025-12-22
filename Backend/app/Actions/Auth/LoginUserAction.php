<?php

namespace App\Actions\Auth;

use App\Http\payloads\v1\auth\LoginPayload;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;

class LoginUserAction
{

    public function execute(LoginPayload $payload)
    {
        if (!$token = auth()->attempt($payload->toArray())) {
            Log::info(' User failed to log in');
            throw new AuthenticationException('Invalid credentials Please check your email and password');
        }
        Log::info('User logged in successfully');
        return $token;
    }
}
