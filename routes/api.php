<?php

use App\Http\Controllers\TaskManageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/dashboard', [AuthController::class, 'dashboard']);

    Route::prefix('task-manage')->group(function () {
        Route::get('/', [TaskManageController::class, 'index']);
        Route::post('/', [TaskManageController::class, 'store']);
        Route::get('/{id}', [TaskManageController::class, 'show']);
        Route::put('/{id}', [TaskManageController::class, 'update']);
        Route::delete('/{id}', [TaskManageController::class, 'destroy']);
    });
});






