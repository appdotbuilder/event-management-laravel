<?php

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

test('unauthenticated user cannot access admin events', function () {
    $this->get('/admin/events')
        ->assertRedirect(route('login'));
});

test('authenticated user can view admin events', function () {
    $user = User::factory()->create();
    
    $this->actingAs($user)
        ->get('/admin/events')
        ->assertOk()
        ->assertInertia(fn ($page) => 
            $page->component('events/index')
                ->has('events')
                ->has('categories')
        );
});

test('authenticated user can create event', function () {
    $user = User::factory()->create();
    
    $eventData = [
        'name' => 'Test Event',
        'start_datetime' => now()->addDays(1)->format('Y-m-d H:i'),
        'end_datetime' => now()->addDays(1)->addHours(2)->format('Y-m-d H:i'),
        'category' => 'Umum',
        'video_link' => 'https://youtube.com/watch?v=test',
        'web_link' => 'https://example.com',
        'image' => UploadedFile::fake()->image('event.jpg')
    ];

    $this->actingAs($user)
        ->post('/admin/events', $eventData)
        ->assertRedirect();
    
    expect(Event::where('name', 'Test Event')->first())
        ->not->toBeNull()
        ->category->toBe('Umum')
        ->video_link->toBe('https://youtube.com/watch?v=test')
        ->web_link->toBe('https://example.com');
});

test('event validation requires name and start datetime', function () {
    $user = User::factory()->create();
    
    $this->actingAs($user)
        ->post('/admin/events', [])
        ->assertSessionHasErrors(['name', 'start_datetime']);
});

test('authenticated user can update event', function () {
    $user = User::factory()->create();
    $event = Event::factory()->create([
        'name' => 'Original Event',
        'category' => 'Umum'
    ]);

    $updateData = [
        'name' => 'Updated Event',
        'start_datetime' => $event->start_datetime->format('Y-m-d H:i'),
        'category' => 'Pemuda',
        '_method' => 'PUT'
    ];

    $this->actingAs($user)
        ->post("/admin/events/{$event->id}", $updateData)
        ->assertRedirect();
    
    $event->refresh();
    expect($event->name)->toBe('Updated Event');
    expect($event->category)->toBe('Pemuda');
});

test('authenticated user can delete event', function () {
    $user = User::factory()->create();
    $event = Event::factory()->create();

    $this->actingAs($user)
        ->delete("/admin/events/{$event->id}")
        ->assertRedirect();

    expect(Event::find($event->id))->toBeNull();
});

test('public can view events list', function () {
    Event::factory(3)->create();

    $this->get('/events')
        ->assertOk()
        ->assertInertia(fn ($page) => 
            $page->component('public/events')
                ->has('events')
                ->has('categories')
        );
});

test('public can view event detail', function () {
    $event = Event::factory()->create();

    $this->get("/events/{$event->id}")
        ->assertOk()
        ->assertInertia(fn ($page) => 
            $page->component('public/event-detail')
                ->has('event')
        );
});

test('authenticated user can access statistics', function () {
    $user = User::factory()->create();
    Event::factory(5)->create();

    $this->actingAs($user)
        ->get('/statistics')
        ->assertOk()
        ->assertInertia(fn ($page) => 
            $page->component('statistics/index')
                ->has('eventsByCategory')
                ->has('durationByCategory')
                ->has('eventsByTimePeriod')
                ->has('summary')
        );
});

test('unauthenticated user cannot access statistics', function () {
    $this->get('/statistics')
        ->assertRedirect(route('login'));
});

test('event duration calculation works correctly', function () {
    $startTime = now();
    $endTime = $startTime->copy()->addHours(3)->addMinutes(30);
    
    $event = Event::factory()->create([
        'start_datetime' => $startTime,
        'end_datetime' => $endTime
    ]);

    expect($event->duration_text)->toBe('3 jam 30 menit');
    expect($event->duration_hours)->toBe(3);
});

test('event time period calculation works correctly', function () {
    $morningEvent = Event::factory()->create([
        'start_datetime' => now()->setTime(8, 0, 0)
    ]);
    
    $afternoonEvent = Event::factory()->create([
        'start_datetime' => now()->setTime(14, 0, 0)
    ]);
    
    $eveningEvent = Event::factory()->create([
        'start_datetime' => now()->setTime(17, 0, 0)
    ]);
    
    $nightEvent = Event::factory()->create([
        'start_datetime' => now()->setTime(20, 0, 0)
    ]);

    expect($morningEvent->time_period)->toBe('Pagi');
    expect($afternoonEvent->time_period)->toBe('Siang');
    expect($eveningEvent->time_period)->toBe('Sore');
    expect($nightEvent->time_period)->toBe('Malam');
});