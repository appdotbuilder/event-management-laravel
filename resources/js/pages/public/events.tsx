import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    events: {
        data: Event[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        date: string | null;
        category: string | null;
    };
    categories: string[];
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

export default function PublicEvents({ events, filters, categories }: Props) {
    const [dateFilter, setDateFilter] = useState(filters.date || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');

    const handleFilter = () => {
        router.get('/events', {
            date: dateFilter || undefined,
            category: categoryFilter || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setDateFilter('');
        setCategoryFilter('');
        router.get('/events', {}, {
            preserveState: true,
            preserveScroll: true,
        });
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
            <Head title="Event Publik" />
            
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
                                    href="/"
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/login"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Login Admin
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Title & Stats */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            📅 Event Publik
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Temukan event menarik di berbagai kategori. Total {events.total} event tersedia.
                        </p>
                    </div>

                    {/* Filters */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-lg">🔍 Filter Event</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-2">Tanggal</label>
                                    <Input
                                        type="date"
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-2">Kategori</label>
                                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Semua Kategori</SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {getCategoryIcon(category)} {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end gap-2">
                                    <Button onClick={handleFilter}>
                                        Filter
                                    </Button>
                                    {(dateFilter || categoryFilter) && (
                                        <Button variant="outline" onClick={clearFilters}>
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Events Grid */}
                    {events.data.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {events.data.map((event) => (
                                <Card key={event.id} className="hover:shadow-lg transition-shadow">
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
                                        <div className="flex items-start justify-between mb-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                                                {getCategoryIcon(event.category)} {event.category}
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg">{event.name}</CardTitle>
                                        <CardDescription>
                                            📅 {formatDateTime(event.start_datetime)}
                                            {event.end_datetime && (
                                                <div className="mt-1">
                                                    ⏰ Durasi: {event.duration_text}
                                                </div>
                                            )}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {event.video_link && (
                                                <a 
                                                    href={event.video_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-red-600 hover:text-red-700 text-sm"
                                                >
                                                    🎥 Lihat Video
                                                </a>
                                            )}
                                            {event.web_link && (
                                                <a 
                                                    href={event.web_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
                                                >
                                                    🌐 Info Lengkap
                                                </a>
                                            )}
                                            <Link
                                                href={`/events/${event.id}`}
                                                className="block w-full"
                                            >
                                                <Button variant="outline" className="w-full">
                                                    Lihat Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="text-center py-12">
                                <div className="text-6xl mb-4">📅</div>
                                <h3 className="text-xl font-semibold mb-2">Tidak ada event ditemukan</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Coba ubah filter atau cek kembali nanti untuk event terbaru.
                                </p>
                                {(dateFilter || categoryFilter) && (
                                    <Button onClick={clearFilters}>
                                        Reset Filter
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Pagination */}
                    {events.last_page > 1 && (
                        <div className="flex justify-center space-x-2">
                            {events.links.map((link, index) => (
                                <div key={index}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            className={`px-3 py-2 rounded-lg ${
                                                link.active 
                                                    ? 'bg-blue-600 text-white' 
                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span 
                                            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}