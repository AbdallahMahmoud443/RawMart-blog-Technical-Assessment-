<?php

namespace App\Http\payloads\v1\auth;

use Illuminate\Http\UploadedFile;

readonly class SignupPayload
{
    /**
     * @param string name
     * @param string email
     * @param string password
     * @param  UploadedFile image

     */
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public UploadedFile $image,
    ) {}

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
            'image' => $this->image,
        ];
    }
}
