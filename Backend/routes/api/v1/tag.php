<?php

use App\Http\Controllers\v1\tags\ListTagsController;
use Illuminate\Support\Facades\Route;


Route::get('/', ListTagsController::class)->name('list');
