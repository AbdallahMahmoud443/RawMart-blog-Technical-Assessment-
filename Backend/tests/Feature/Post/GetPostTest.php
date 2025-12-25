<?php

namespace Tests\Feature\Post;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetPostTest extends TestCase
{
    public function test_get_all_non_expire_posts_with_valid_structure_respond()
    {
        Post::factory()->count(5)->create(); // create 5 posts
        $this->assertDatabaseCount('posts', 5);
        $response = $this->get('/api/v1/posts');
        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'body',
                    'expire_date',
                    'tags' => [
                        '*' => ['id', 'name']
                    ],
                    'created_at',
                    'author' => [
                        'id',
                        'name',
                        'image',

                    ]
                ]
            ]
        ]);
    }
    public function test_get_single_post_with_valid_structure_respond(): void
    {
        $post = Post::factory()->create();
        $response = $this->get('/api/v1/posts/' . $post->id);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'body',
                'expire_date',
                'tags' => [
                    '*' => ['id', 'name']
                ],
                'created_at',
                'author' => [
                    'id',
                    'name',
                    'image',

                ],
                'comments' => [
                    '*' => [
                        'id',
                        'content',
                        'created_at',
                        'author' => [
                            'id',
                            'name',
                            'image',
                        ]
                    ]
                ]
            ]
        ]);
    }
    public function test_get_expire_posts_not_display(): void
    {
        Post::factory()->count(5)->create(); // create 5 posts
        Post::factory()->create(['deleted_at' => now()->subDay(2)]);
        $response = $this->get('/api/v1/posts/');
        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
    }
    
}
