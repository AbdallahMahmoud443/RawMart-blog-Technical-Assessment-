<?php

namespace Tests\Feature\Post;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class CreatePostTest extends TestCase
{
    public function test_user_can_not_create_post_with_without_login(): void
    {
        $response = $this->postJson('/api/v1/posts/create', [
            'title' => 'Test Post',
            'body' => 'This is a test post',
            'tags' => ['test', 'post']
        ]);

        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_create_post_with_invalid_token(): void
    {
        $token = Str::uuid();
        $response = $this->postJson('/api/v1/posts/create', [
            'title' => 'Test Post',
            'body' => 'This is a test post',
            'token' => $token,
            'tags' => ['test', 'post']
        ]);

        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_create_post_with_login_with_empty_data(): void
    {
        $user = $this->authenticate();
        $response = $this->postJson('/api/v1/posts/create', [], [
            'Authorization' => 'Bearer ' . $user->getJWTIdentifier()
        ]);
        $response->assertUnprocessable()->assertJsonFragment([
            "title" => "Validation failed"
        ]);
    }
    public function test_user_can_not_create_post_with_login_with_empty_tag(): void
    {
        $user = $this->authenticate();
        $response = $this->postJson('/api/v1/posts/create', [
            'title' => 'Test Post',
            'body' => 'This is a test post',
            'author' => $user->id,
            'tags' => []
        ], [
            'Authorization' => 'Bearer ' . $user->getJWTIdentifier()
        ]);

        $response->assertUnprocessable()->assertJsonFragment([
            "title" => "Validation failed",
            "detail" => '{"tags":["The tags field is required."]}'
        ]);
    }
    public function test_user_can_create_post_with_login_with_valid_data(): void
    {

        $user = $this->authenticate();
        $response = $this->postJson('/api/v1/posts/create', [
            'title' => 'Test Post',
            'body' => 'This is a test post',
            'author' => $user->id,
            'tags' => ['test', 'post']
        ], [
            'Authorization' => 'Bearer ' . $user->getJWTIdentifier()
        ]);
        $response->assertStatus(201)->assertJsonFragment([
            "message" => "Post created successfully"
        ]);
    }
}
