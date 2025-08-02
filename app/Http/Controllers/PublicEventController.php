<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicEventController extends Controller
{
    /**
     * Display public events listing.
     */
    public function index(Request $request)
    {
        $events = Event::query()
            ->filterByDate($request->date)
            ->filterByCategory($request->category)
            ->where('start_datetime', '>=', now())
            ->orderBy('start_datetime', 'asc')
            ->paginate(12);

        return Inertia::render('public/events', [
            'events' => $events,
            'filters' => [
                'date' => $request->date,
                'category' => $request->category,
            ],
            'categories' => ['Umum', 'Pemuda', 'Budaya', 'Olahraga', 'Pariwisata'],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Inertia::render('public/event-detail', [
            'event' => $event,
        ]);
    }
}