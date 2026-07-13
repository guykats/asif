<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\RegistrationController as AdminRegistrationController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegistrationController::class, 'store']);
Route::get('/assets', [AssetController::class, 'index']);
Route::get('/content', [ContentController::class, 'index']);
Route::post('/admin/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/registrations', [AdminRegistrationController::class, 'index']);
    Route::get('/registrations.csv', [AdminRegistrationController::class, 'exportCsv']);
    Route::delete('/registrations/{registration}', [AdminRegistrationController::class, 'destroy']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::post('/content', [ContentController::class, 'update']);
});

Route::post('/assets/{key}', [AssetController::class, 'upload'])->middleware('auth:sanctum');
