<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;


Route::prefix('v1')->as('v1:')->group(static function (): void {
    Route::prefix('auth')->as('auth:')->group(base_path('routes/api/v1/auth.php'));
    Route::prefix('posts')->as('posts:')->group(base_path('routes/api/v1/post.php'));
    Route::prefix('tags')->as('tags:')->group(base_path('routes/api/v1/tag.php'));
    Route::prefix('comments')->as('comments:')->group(base_path('routes/api/v1/comment.php'));
});
