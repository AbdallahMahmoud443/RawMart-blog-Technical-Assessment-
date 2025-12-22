<?php

namespace App\Actions\Auth;

use App\Actions\Media\UploadUserImageAction;
use App\Http\payloads\v1\auth\SignupPayload;
use App\Models\User;

use Illuminate\Support\Facades\Log;

class RegisterUserAction
{
    public function __construct(protected UploadUserImageAction $uploadImageAction) {}

    public function execute(SignupPayload  $payload): string
    {
        try {

            $imagePath =  $this->uploadImageAction->execute($payload->image);

            $userData = $payload->toArray();
            $userData['image'] = $imagePath;

            $user = User::create($userData);
            $token = auth()->login($user);
            Log::info('User created successfully with token', ['user' => $user]);
            return $token;
        } catch (\Exception $e) {
            Log::info('Error while registering user', ['error' => $e->getMessage()]);
            throw new \Exception('Error while registering user', $e->getMessage());
        }
    }
}
