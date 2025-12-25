<?php

namespace Tests\Feature\Comment;

use App\Models\Comment;
use App\Models\Post;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class UpdateCommentTest extends TestCase
{
    public function test_user_can_not_update_comment_with_without_login(): void
    {
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'user_id' => $post->author,
            'post_id' => $post->id,
        ]);

        $response = $this->putJson('/api/v1/comments/update/' . $comment->id, [
            'Content' => 'Test Comment Post',
            'user_id' => $post->author,
            "post_id" => $post->id,
        ]);

        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_update_comment_with_without_invalid_token(): void
    {
        $token = Str::uuid();
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'user_id' => $post->author,
            'post_id' => $post->id,
        ]);
        $response = $this->putJson('/api/v1/comments/update/' . $comment->id, [
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
    public function test_user_can_not_update_comment_with_unauthorized_token(): void
    {
        $user = $this->authenticate(); // user 2
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'user_id' => $post->author,
            'post_id' => $post->id,
        ]);
        $response = $this->putJson('/api/v1/comments/update/' . $comment->id, [
            'content' => 'Test Comment Post',
            'user_id' => $post->author,
            "post_id" => $post->id,
        ], [
            'Authorization' => 'Bearer ' . $user->getJWTIdentifier()
        ]);

        $response->assertStatus(403);
        $response->assertJsonFragment([
            'detail' => "You don't have permission to update this Comment"
        ]);
    }
    public function test_user_can_update_comment_with_authorized_token(): void
    {
        $user = $this->authenticate(); // user 1
        $post = Post::factory()->create(['author' => $user->id]);
        $comment = Comment::factory()->create([
            'user_id' => $post->author,
            'post_id' => $post->id,
        ]);
        $response = $this->putJson('/api/v1/comments/update/' . $comment->id, [
            'content' => 'Test Comment Post',
            'user_id' => $post->author,
            "post_id" => $post->id,
        ], [
            'Authorization' => 'Bearer ' . $post->author
        ]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => 'Comment updated successfully'
        ]);
    }
}
