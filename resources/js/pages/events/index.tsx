import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
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

export default function EventIndex({ events, filters, categories }: Props) {
    const [dateFilter, setDateFilter] = useState(filters.date || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');

    const handleFilter = () => {
        router.get('/admin/events', {
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
        router.get('/admin/events', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (eventId: number, eventName: string) => {
        if (confirm(`Yakin ingin menghapus event "${eventName}"?`)) {
            router.delete(`/admin/events/${eventId}`, {
                preserveScroll: true,
            });
        }
    };

    const formatDateTime = (datetime: string) => {
        return new Date(datetime).toLocaleDateString('id-ID', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title="Kelola Event" />
            <AppShell>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">📅 Kelola Event</h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Total {events.total} event terdaftar
                            </p>
                        </div>
                        <Link href="/admin/events/create">
                            <Button>
                                ➕ Tambah Event
                            </Button>
                        </Link>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold">{events.total}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Total Event</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold">📊</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    <Link href="/statistics" className="hover:text-blue-600">
                                        Statistik
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold">👁️</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    <Link href="/events" className="hover:text-blue-600">
                                        Lihat Publik
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold">🏠</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    <Link href="/" className="hover:text-blue-600">
                                        Home
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card>
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

                    {/* Events List */}
                    {events.data.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                                    ⏰ {event.duration_text}
                                                </div>
                                            )}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex gap-2">
                                            <Link href={`/admin/events/${event.id}`} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    👁️ Lihat
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/events/${event.id}/edit`} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(event.id, event.name)}
                                                className="px-3"
                                            >
                                                🗑️
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="text-center py-12">
                                <div className="text-6xl mb-4">📅</div>
                                <h3 className="text-xl font-semibold mb-2">Belum ada event</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Mulai dengan membuat event pertama Anda.
                                </p>
                                <Link href="/admin/events/create">
                                    <Button>
                                        ➕ Tambah Event Pertama
                                    </Button>
                                </Link>
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
            </AppShell>
        </>
    );
}