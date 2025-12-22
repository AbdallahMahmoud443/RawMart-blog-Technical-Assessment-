<?php

namespace App\Actions\Posts;

use App\Models\Post;
use Illuminate\Support\Facades\Log;

class DeletePostAction
{
    public function execute(string $id)
    {
        try {
            $is_deleted = Post::where('id', $id)->delete();
            return $is_deleted;
        } catch (\Exception $e) {
            Log::info('Error deleting post: ' . $e->getMessage());
            return new \Exception('error in deleting post');
        }
    }
}
