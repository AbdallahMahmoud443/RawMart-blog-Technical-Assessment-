<?php

use App\Http\Controllers\v1\comments\CreateCommentController;
use App\Http\Controllers\v1\comments\DeleteCommentController;
use App\Http\Controllers\v1\comments\GetCommentController;
use App\Http\Controllers\v1\comments\UpdateCommentController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:api')->group(function () {
    Route::get('/{post_id}/{id}', GetCommentController::class)->name('get');
    Route::post('/', CreateCommentController::class)->name('create');
    Route::put('/update/{id}', UpdateCommentController::class)->name('update');
    Route::delete('/delete/{id}', DeleteCommentController::class)->name('delete');
});
