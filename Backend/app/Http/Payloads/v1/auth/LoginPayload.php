<?php

namespace App\Http\payloads\v1\auth;

use Illuminate\Http\UploadedFile;

readonly class LoginPayload
{
    /**
     * @param string email
     * @param string password
     */
    public function __construct(
        public string $email,
        public string $password,
    ) {}

    public function toArray(): array
    {
        return [
            'email' => $this->email,
            'password' => $this->password,
        ];
    }
}
