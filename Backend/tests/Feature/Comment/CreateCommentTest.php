<?php

namespace Tests\Feature\Comment;

use App\Models\Post;
use Illuminate\Support\Str;
use Tests\TestCase;

class CreateCommentTest extends TestCase
{
    public function test_user_can_not_create_comment_with_without_login(): void
    {
        $post = Post::factory()->create();
        $response = $this->postJson('/api/v1/comments', [
            'Content' => 'Test Comment Post',
            'user_id' => $post->author,
            "post_id" => $post->id,
        ]);

        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_create_comment_with_without_invalid_token(): void
    {
        $token = Str::uuid();
        $post = Post::factory()->create();
        $response = $this->postJson('/api/v1/comments', [
            'Content' => 'Test Comment Post',
            'user_id' => $post->author,
            "post_id" => $post->id,
        ], [
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_create_comment_with_invalid_data(): void
    {
        $user = $this->authenticate();
        $post = Post::factory()->create();
        $response = $this->postJson('/api/v1/comments', [
            'Content' => '',
            'user_id' => $post->author,
            "post_id" => $post->id,
        ], [
            'Authorization' => 'Bearer ' . $user->token
        ]);

        $response->assertStatus(422);
    }
    public function test_user_can_create_comment_with_valid_token(): void
    {
        $user = $this->authenticate();
        $post = Post::factory()->create();
        $response = $this->postJson('/api/v1/comments', [
            'content' => 'Test Comment Post',
            'user_id' => $post->author,
            "post_id" => $post->id,
        ], [
            'Authorization' => 'Bearer ' . $user->getJWTIdentifier()
        ]);
        $response->assertStatus(200);
    }
}
