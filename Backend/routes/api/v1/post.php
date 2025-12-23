<?php

use App\Http\Controllers\v1\posts\CreatePostController;
use App\Http\Controllers\v1\posts\DeletePostController;
use App\Http\Controllers\v1\posts\GetPostController;
use App\Http\Controllers\v1\posts\ListPostsController;
use App\Http\Controllers\v1\posts\UpdatePostController;
use Illuminate\Support\Facades\Route;


Route::get('/', ListPostsController::class)->name('list');
Route::get('/{id}', GetPostController::class)->name('get');
Route::middleware('auth:api')->group(function () {
    Route::post('/create', CreatePostController::class)->name('create');
    Route::put('/update/{id}', UpdatePostController::class)->name('update');
    Route::delete('/delete/{id}', DeletePostController::class)->name('delete');
});
