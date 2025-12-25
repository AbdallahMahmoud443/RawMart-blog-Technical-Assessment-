<?php

namespace Tests\Feature\Post;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class UpdatePostTest extends TestCase
{
    public function test_user_can_not_update_post_with_without_login(): void
    {
        $post = Post::factory()->create();
        $response = $this->putJson('/api/v1/posts/update/' . $post->id, [
            'title' => 'Test Post updated',
        ]);
        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_create_post_with_invalid_token(): void
    {
        $token = Str::uuid();
        $post = Post::factory()->create();
        $response = $this->putJson(
            '/api/v1/posts/update/' . $post->id,
            [
                'title' => 'Test Post updated',
            ],
            [
                'Authorization' => 'Bearer ' . $token
            ]

        );

        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_update_post_with_unauthorized_token(): void
    {
        $post = Post::factory()->create();
        $currentUser = $this->authenticate();
        $response = $this->putJson(
            '/api/v1/posts/update/' . $post->id,
            [
                'title' => $post->title,
                'body' => $post->title,
                'tags' => ['test'],
            ],
            [
                'Authorization' => 'Bearer ' . $currentUser->getJWTIdentifier()
            ]

        );
        $response->assertStatus(403);
        $response->assertJsonFragment([
            'title' => 'Unauthorized'
        ]);
    }
    public function test__user_can_update_own_post_with_valid_token(): void
    {
        $currentUser = $this->authenticate();
        $post = Post::factory()->create(['author' => $currentUser->id]);

        $response = $this->putJson(
            '/api/v1/posts/update/' . $post->id,
            [
                'title' => 'title updated',
                'body' => 'title updated',
                'tags' => ['test'],
            ],
            [
                'Authorization' => 'Bearer ' . $currentUser->getJWTIdentifier()
            ]
        );
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'message',
                'post',
            ]
        ]);
    }
    public function test_user_can_update_own_post_tags_only_with_valid_token(): void
    {
        $currentUser = $this->authenticate();
        $post = Post::factory()->create(['author' => $currentUser->id]);

        $response = $this->putJson(
            '/api/v1/posts/update/' . $post->id,
            [
                'title' => 'title updated',
                'body' => 'title updated',
                'tags' => ['test', 'php'],
            ],
            [
                'Authorization' => 'Bearer ' . $currentUser->getJWTIdentifier()
            ]
        );
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'message',
                'post',
            ]
        ]);
    }
}
