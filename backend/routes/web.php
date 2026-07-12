<?php

use Illuminate\Support\Facades\Route;

// Serves the built React app directly - avoids depending on the webserver's
// DirectoryIndex order (index.php vs index.html) picking the right file for "/".
Route::get('/', function () {
    $index = public_path('index.html');

    return file_exists($index)
        ? response()->file($index)
        : view('welcome');
});

// This is an API-only app (no real web login page). Laravel's auth middleware
// resolves a "login" named route when a request doesn't send Accept: application/json
// - without this it throws a RouteNotFoundException instead of a clean 401.
Route::get('/login', function () {
    return response()->json(['message' => 'Unauthenticated.'], 401);
})->name('login');

// SPA fallback: any non-API, non-static-file request serves the React build's
// index.html so client-side routes (e.g. /admin) work on direct navigation/refresh.
Route::fallback(function () {
    $index = public_path('index.html');

    return file_exists($index)
        ? response()->file($index)
        : response()->json(['message' => 'Not Found.'], 404);
});
