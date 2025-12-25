<?php

namespace Tests\Feature\Post;

use App\Models\Post;
use Illuminate\Support\Str;
use Tests\TestCase;

class DeletePostTest extends TestCase
{
    public function test_user_can_not_delete_post_with_without_login(): void
    {
        $post = Post::factory()->create();
        $response = $this->deleteJson('/api/v1/posts/delete/' . $post->id);
        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_delete_post_with_invalid_token(): void
    {
        $token = Str::uuid();
        $post = Post::factory()->create();
        $response = $this->deleteJson(
            '/api/v1/posts/delete/' . $post->id,
            [
                'Authorization' => 'Bearer ' . $token
            ]

        );
        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_delete_post_with_unauthorized_token(): void
    {
        $post = Post::factory()->create();
        $currentUser = $this->authenticate();
        $response = $this->deleteJson(
            '/api/v1/posts/delete/' . $post->id,

            [
                'Authorization' => 'Bearer ' . $currentUser->getJWTIdentifier()
            ]

        );
        $response->assertStatus(403);
        $response->assertJsonFragment([
            'title' => 'Unauthorized'
        ]);
    }
    public function test_user_can_delete_own_post_with_valid_token(): void
    {
        $currentUser = $this->authenticate();
        $post = Post::factory()->create(['author' => $currentUser->id]);

        $response = $this->deleteJson(
            '/api/v1/posts/delete/' . $post->id,
            [
                'Authorization' => 'Bearer ' . $currentUser->getJWTIdentifier()
            ]
        );
        $response->assertStatus(200);
        $response->assertJsonStructure([

            'message',

        ]);
    }
}
