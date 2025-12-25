<?php

namespace App\Http\Controllers\v1\auth;

use App\Actions\Auth\LoginUserAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\v1\auth\LoginRequest;
use App\Http\Responses\v1\auth\MessageResponse;
use Illuminate\Http\Response;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request, LoginUserAction $action): MessageResponse
    {
        $loginPayload = $request->payload();
        $token = $action->execute(payload: $loginPayload);
        return new MessageResponse(
            message: 'Login successful',
            access_token: $token,
            token_type: 'Bearer',
            expires_in: auth()->factory()->getTTL() * 60,
            statusCode: Response::HTTP_OK
        );
    }
}
