<?php

namespace Tests\Feature\auth;

use App\Models\User;
use Tests\TestCase;

class LoginTest extends TestCase
{
    public function test_user_cannot_login_with_no_data(): void
    {
        $response = $this->post(route('v1:auth:login'), []);
        $response->assertStatus(422);
        $response->assertJsonStructure([
            'title',
            'detail',
            'instance',
            'code',
            'links',
        ]);
    }
    public function test_user_cannot_login_with_invalid_email(): void
    {
        $response = $this->post(route('v1:auth:login'), [
            'email' => 'invalid-email',
            'password' => 'password',
        ]);
        $response->assertUnprocessable()->assertJsonFragment([
            "code" => "VALIDATION_FAILED",
            "detail" => "{\"email\":[\"The email field must be a valid email address.\"]}",
            "instance" => "api/v1/auth/login",
            "links" => "http://localhost:8000/api/v1/errors/422",
            "title" => "Validation failed"
        ]);
    }
    public function test_user_cannot_login_with_invalid_credentials(): void
    {
        $response = $this->post(route('v1:auth:login'), [
            'email' => 'test123@example.com',
            'password' => 'password',
        ]);
        $response->assertStatus(401); # check status of response
        $response->assertExactJson([
            "code" => "AUTHENTICATION_FAILED",
            "detail" => "Invalid credentials Please check your email and password",
            "instance" => "api/v1/auth/login",
            "links" => "http://localhost:8000/api/v1/errors/401",
            "title" => "Authentication failed"

        ]);
    }
    public function test_user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $response = $this->post(route('v1:auth:login'), [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);
        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'access_token',
                'token_type',
                'user',
                'expire_in',

            ]); # check structure of
    }
}
