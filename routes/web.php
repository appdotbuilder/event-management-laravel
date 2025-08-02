<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\EventStatisticsController;
use App\Http\Controllers\PublicEventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public welcome page showcasing the event management system
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public event pages (accessible to everyone)
Route::get('/events', [PublicEventController::class, 'index'])->name('public.events');
Route::get('/events/{event}', [PublicEventController::class, 'show'])->name('public.event');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Admin event management
    Route::resource('admin/events', EventController::class)->names([
        'index' => 'events.index',
        'create' => 'events.create',
        'store' => 'events.store',
        'show' => 'events.show',
        'edit' => 'events.edit',
        'update' => 'events.update',
        'destroy' => 'events.destroy',
    ]);
    
    // Event statistics
    Route::get('/statistics', [EventStatisticsController::class, 'index'])->name('statistics.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
