<?php

namespace App\Http\Controllers\v1\auth;

use App\Actions\Auth\LoginUserAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\v1\auth\LoginRequest;


class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request, LoginUserAction $action)
    {
        $loginPayload = $request->payload();
        $token = $action->execute(payload: $loginPayload);
        return response()->json([
            'message' => 'logged in successfully',
            'token' => $token,
            'type' => 'Bearer',
        ], 200);
    }
}
