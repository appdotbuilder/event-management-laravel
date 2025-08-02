import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
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
    created_at: string;
    updated_at: string;
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

export default function ShowEvent({ event }: Props) {
    const handleDelete = () => {
        if (confirm(`Yakin ingin menghapus event "${event.name}"?`)) {
            router.delete(`/admin/events/${event.id}`, {
                onSuccess: () => {
                    router.visit('/admin/events');
                }
            });
        }
    };

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
            <Head title={`${event.name} - Detail Event`} />
            <AppShell>
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">👁️ Detail Event</h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Informasi lengkap event
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/admin/events">
                                <Button variant="outline">
                                    ← Kembali
                                </Button>
                            </Link>
                            <Link href={`/admin/events/${event.id}/edit`}>
                                <Button>
                                    ✏️ Edit
                                </Button>
                            </Link>
                        </div>
                    </div>

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
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                            📅 Informasi Waktu
                                        </h3>
                                        <div className="space-y-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Mulai</p>
                                                <p className="font-medium">{formatDateTime(event.start_datetime)}</p>
                                            </div>
                                            {event.end_datetime && (
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Berakhir</p>
                                                    <p className="font-medium">{formatDateTime(event.end_datetime)}</p>
                                                </div>
                                            )}
                                            {event.end_datetime && (
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Durasi</p>
                                                    <p className="font-medium">{event.duration_text}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                            ℹ️ Informasi Sistem
                                        </h3>
                                        <div className="space-y-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm">
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">ID Event: </span>
                                                <span className="font-mono">{event.id}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">Dibuat: </span>
                                                <span>{formatDateTime(event.created_at)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">Diperbarui: </span>
                                                <span>{formatDateTime(event.updated_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                            🔗 Link & Media
                                        </h3>
                                        <div className="space-y-3">
                                            {event.video_link ? (
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Video Event</p>
                                                    <a 
                                                        href={event.video_link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-block w-full"
                                                    >
                                                        <Button variant="outline" className="w-full justify-start">
                                                            🎥 Buka Video
                                                        </Button>
                                                    </a>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Video Event</p>
                                                    <p className="text-sm text-gray-500">Tidak ada video</p>
                                                </div>
                                            )}

                                            {event.web_link ? (
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Website/Instagram</p>
                                                    <a 
                                                        href={event.web_link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-block w-full"
                                                    >
                                                        <Button variant="outline" className="w-full justify-start">
                                                            🌐 Buka Link
                                                        </Button>
                                                    </a>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Website/Instagram</p>
                                                    <p className="text-sm text-gray-500">Tidak ada link web</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                            👁️ Preview Publik
                                        </h3>
                                        <div className="space-y-3">
                                            <Link href={`/events/${event.id}`} target="_blank">
                                                <Button variant="outline" className="w-full">
                                                    🔗 Lihat di Halaman Publik
                                                </Button>
                                            </Link>
                                            <p className="text-xs text-gray-500">
                                                Event ini sudah bisa dilihat publik di halaman event
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6 border-t">
                                <Link href={`/admin/events/${event.id}/edit`} className="flex-1">
                                    <Button className="w-full">
                                        ✏️ Edit Event
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    className="px-8"
                                >
                                    🗑️ Hapus
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}