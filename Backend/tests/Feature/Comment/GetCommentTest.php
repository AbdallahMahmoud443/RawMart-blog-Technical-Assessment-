<?php

namespace Tests\Feature\Comment;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetCommentTest extends TestCase
{
    public function test_user_can_get_single_comment(): void
    {
        $user = $this->authenticate();
        $post = Post::factory()->create(['author' => $user->id]);
        $comment = $post->comments()->create([
            'content' => 'This is a comment',
            'user_id' => $post->author,
            'post_id' => $post->id,
        ]);
        $param = $post->id . '/' . $comment->id;
        $response = $this->getJson('/api/v1/comments/' . $param, [
            'Authorization' => 'Bearer ' .  $user->getJWTIdentifier()
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure(
            [
                "data" => [
                    'id',
                    'content',
                    'created_at'
                ]
            ]
        );
    }
}
