import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Event {
    id: number;
    name: string;
    start_datetime: string;
    end_datetime: string | null;
    image: string | null;
    video_link: string | null;
    web_link: string | null;
    category: string;
    duration_text: string;
    [key: string]: unknown;
}

interface Props {
    event: Event;
    [key: string]: unknown;
}

const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
        'Umum': '📢',
        'Pemuda': '👥',
        'Budaya': '🎭',
        'Olahraga': '🏆',
        'Pariwisata': '🏝️'
    };
    return icons[category] || '📅';
};

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        'Umum': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
        'Pemuda': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'Budaya': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        'Olahraga': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'Pariwisata': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
};

export default function EventDetail({ event }: Props) {
    const formatDateTime = (datetime: string) => {
        return new Date(datetime).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title={`${event.name} - Event Detail`} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-3">
                                <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
                                    <span className="text-2xl">🎉</span>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">Event Manager</span>
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/events"
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                >
                                    ← Kembali ke Event
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                        <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link>
                        <span>/</span>
                        <Link href="/events" className="hover:text-gray-900 dark:hover:text-white">Event</Link>
                        <span>/</span>
                        <span className="text-gray-900 dark:text-white">{event.name}</span>
                    </nav>

                    <Card>
                        {/* Event Image */}
                        {event.image && (
                            <div className="aspect-video overflow-hidden rounded-t-lg">
                                <img 
                                    src={`/storage/${event.image}`} 
                                    alt={event.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <CardHeader>
                            <div className="flex items-start justify-between mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                                    {getCategoryIcon(event.category)} {event.category}
                                </span>
                            </div>
                            <CardTitle className="text-3xl font-bold">{event.name}</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Event Details */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📅 Waktu Mulai</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {formatDateTime(event.start_datetime)}
                                        </p>
                                    </div>
                                    
                                    {event.end_datetime && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🏁 Waktu Berakhir</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {formatDateTime(event.end_datetime)}
                                            </p>
                                        </div>
                                    )}

                                    {event.end_datetime && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⏰ Durasi</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {event.duration_text}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Links */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🔗 Link Terkait</h3>
                                    
                                    {event.video_link && (
                                        <div>
                                            <a 
                                                href={event.video_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-block w-full"
                                            >
                                                <Button variant="outline" className="w-full justify-start">
                                                    🎥 Tonton Video Event
                                                </Button>
                                            </a>
                                        </div>
                                    )}

                                    {event.web_link && (
                                        <div>
                                            <a 
                                                href={event.web_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-block w-full"
                                            >
                                                <Button variant="outline" className="w-full justify-start">
                                                    🌐 Kunjungi Website/Instagram
                                                </Button>
                                            </a>
                                        </div>
                                    )}

                                    {!event.video_link && !event.web_link && (
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            Tidak ada link tambahan untuk event ini.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Back to Events */}
                            <div className="pt-6 border-t">
                                <Link href="/events">
                                    <Button>
                                        ← Kembali ke Daftar Event
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}