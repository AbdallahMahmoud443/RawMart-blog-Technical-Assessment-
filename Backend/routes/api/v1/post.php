<?php

use App\Http\Controllers\v1\posts\CreatePostController;
use App\Http\Controllers\v1\posts\DeletePostController;
use App\Http\Controllers\v1\posts\UpdatePostController;
use Illuminate\Support\Facades\Route;

Route::post('/create', CreatePostController::class)->name('create');
Route::post('/update/{id}', UpdatePostController::class)->name('update');
Route::delete('/delete/{id}', DeletePostController::class)->name('delete');
