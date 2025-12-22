<?php

namespace App\Http\Controllers\v1\posts;

use App\Actions\Posts\DeletePostAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DeletePostController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $id, DeletePostAction $deletePostAction)
    {
        $is_deleted = $deletePostAction->execute($id);
        if ($is_deleted) return response()->json(['message' => 'Post deleted successfully'], 200);
    }
}
