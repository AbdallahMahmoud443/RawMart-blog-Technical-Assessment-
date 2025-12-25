<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_user_cannot_Signup_with_no_data(): void
    {
        $response = $this->post(route('v1:auth:signup'), []);
        $response->assertStatus(422);
        $response->assertJsonStructure([
            'title',
            'detail',
            'instance',
            'code',
            'links',
        ]);
    }
    public function test_user_cannot_Signup_with_non_unique_email(): void
    {
        Storage::fake('public');
        $image = UploadedFile::fake()->image('avatar.jpg', 600, 400)->size(1024);
        $email = $this->createUser()->email;

        $response = $this->post(route('v1:auth:signup'), [
            'name' => 'Existing User',
            'email' => $email,
            'image' =>  $image,
            'password' => 'password123',
            'confirm_password' => 'password123',
        ]);
        $response->assertStatus(422);
        $response->assertExactJson([
            "title" => "Validation failed",
            "detail" => "{\"email\":[\"The email has already been taken.\"]}",
            "instance" => "api/v1/auth/signup",
            "code" => "VALIDATION_FAILED",
            "links" => "http://localhost:8000/api/v1/errors/422"
        ]);
    }
    public function test_user_can_signup_with_valid_data(): void
    {
        Storage::fake('public');
        $image = UploadedFile::fake()->image('avatar.jpg', 600, 400)->size(1024);
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'confirm_password' => 'password123',
            'image' => $image,
        ];
        $response = $this->post(uri: route(name: 'v1:auth:signup'), data: $userData);
        $response->assertStatus(201);
        $response->assertJsonStructure([
            'message',
            'access_token',
            'token_type',
            'user',
            'expire_in',
        ]);
    }
}
