<?php

namespace Tests\Feature\Comment;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class DeleteCommentTest extends TestCase
{
    public function test_user_can_not_delete_comment_with_without_login(): void
    {
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'user_id' => $post->author,
            'post_id' => $post->id,
        ]);

        $response = $this->deleteJson('/api/v1/comments/delete/' . $comment->id);
        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_delete_comment_with_without_invalid_token(): void
    {
        $token = Str::uuid();
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'user_id' => $post->author,
            'post_id' => $post->id,
        ]);
        $response = $this->deleteJson('/api/v1/comments/delete/' . $comment->id, [
            'Authorization' => 'Bearer ' . $token
        ]);
        $response->assertStatus(401);
        $response->assertJsonFragment([
            'detail' => 'Unauthenticated.'
        ]);
    }
    public function test_user_can_not_delete_comment_with_unauthorized_token(): void
    {
        $user = $this->authenticate(); // user 2
        $post = Post::factory()->create();
        $comment = Comment::factory()->create([
            'user_id' => $post->author,
            'post_id' => $post->id,
        ]);
        $response = $this->deleteJson('/api/v1/comments/delete/' . $comment->id, [
            'Authorization' => 'Bearer ' . $user->getJWTIdentifier()
        ]);
        $response->assertStatus(404);
    }
    public function test_user_can_delete_comment_with_authorized_token(): void
    {
        $user = $this->authenticate(); // user 1
        $post = Post::factory()->create(['author' => $user->id]);
        $comment = Comment::factory()->create([
            'user_id' => $post->author,
            'post_id' => $post->id,
        ]);
        $response = $this->deleteJson('/api/v1/comments/delete/' . $comment->id, [
            'content' => 'Test Comment Post',
            'user_id' => $post->author,
            "post_id" => $post->id,
        ], [
            'Authorization' => 'Bearer ' . $post->author
        ]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => 'Comment deleted successfully'
        ]);
    }
}
