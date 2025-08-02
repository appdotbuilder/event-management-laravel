<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventStatisticsController extends Controller
{
    /**
     * Display event statistics.
     */
    public function index()
    {
        // Events by category (pie chart data)
        $categoryStats = DB::table('events')
            ->select('category', DB::raw('count(*) as count'))
            ->groupBy('category')
            ->get();
            
        $eventsByCategory = $categoryStats->map(function ($item) {
            return [
                'category' => $item->category,
                'count' => (int) $item->count,
            ];
        });

        // Total duration by category (bar chart data)
        $durationByCategory = Event::whereNotNull('end_datetime')
            ->get()
            ->groupBy('category')
            ->map(function ($events, $category) {
                $totalHours = $events->sum('duration_hours');
                return [
                    'category' => $category,
                    'total_hours' => $totalHours,
                ];
            })
            ->values();

        // Events by time period
        $eventsByTimePeriod = Event::all()
            ->groupBy('time_period')
            ->map(function ($events, $period) {
                return [
                    'period' => $period,
                    'count' => $events->count(),
                ];
            })
            ->values();

        // Individual event durations
        $eventDurations = Event::whereNotNull('end_datetime')
            ->orderBy('start_datetime', 'desc')
            ->take(20)
            ->get()
            ->map(function ($event) {
                return [
                    'name' => $event->name,
                    'duration_text' => $event->duration_text,
                    'duration_hours' => $event->duration_hours,
                    'category' => $event->category,
                    'start_date' => $event->start_datetime->format('d/m/Y H:i'),
                ];
            });

        // Summary statistics
        $totalEvents = Event::count();
        $upcomingEvents = Event::where('start_datetime', '>=', now())->count();
        $pastEvents = Event::where('start_datetime', '<', now())->count();
        $eventsWithDuration = Event::whereNotNull('end_datetime')->count();

        return Inertia::render('statistics/index', [
            'eventsByCategory' => $eventsByCategory,
            'durationByCategory' => $durationByCategory,
            'eventsByTimePeriod' => $eventsByTimePeriod,
            'eventDurations' => $eventDurations,
            'summary' => [
                'total' => $totalEvents,
                'upcoming' => $upcomingEvents,
                'past' => $pastEvents,
                'with_duration' => $eventsWithDuration,
            ],
        ]);
    }
}