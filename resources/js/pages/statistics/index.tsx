import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatisticsData {
    eventsByCategory: Array<{
        category: string;
        count: number;
    }>;
    durationByCategory: Array<{
        category: string;
        total_hours: number;
    }>;
    eventsByTimePeriod: Array<{
        period: string;
        count: number;
    }>;
    eventDurations: Array<{
        name: string;
        duration_text: string;
        duration_hours: number;
        category: string;
        start_date: string;
    }>;
    summary: {
        total: number;
        upcoming: number;
        past: number;
        with_duration: number;
    };
}

interface Props extends StatisticsData {
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
        'Umum': '#6B7280',
        'Pemuda': '#3B82F6',
        'Budaya': '#8B5CF6',
        'Olahraga': '#10B981',
        'Pariwisata': '#F59E0B'
    };
    return colors[category] || '#6B7280';
};

const getTimePeriodIcon = (period: string) => {
    const icons: Record<string, string> = {
        'Pagi': '🌅',
        'Siang': '☀️',
        'Sore': '🌇',
        'Malam': '🌙'
    };
    return icons[period] || '🕐';
};

export default function StatisticsIndex({ 
    eventsByCategory, 
    durationByCategory, 
    eventsByTimePeriod, 
    eventDurations, 
    summary 
}: Props) {
    const totalEvents = eventsByCategory.reduce((sum, item) => sum + item.count, 0);
    const maxDuration = Math.max(...durationByCategory.map(item => item.total_hours), 1);
    const maxTimePeriod = Math.max(...eventsByTimePeriod.map(item => item.count), 1);

    return (
        <>
            <Head title="Statistik Event" />
            <AppShell>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">📊 Statistik Event</h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Analisis dan visualisasi data event
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/admin/events">
                                <Button variant="outline">
                                    📅 Kelola Event
                                </Button>
                            </Link>
                            <Link href="/events">
                                <Button variant="outline">
                                    👁️ Lihat Publik
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">{summary.total}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Total Event</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">{summary.upcoming}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Event Mendatang</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-purple-600">{summary.past}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Event Selesai</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-orange-600">{summary.with_duration}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Ada Durasi</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Pie Chart - Events by Category */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🥧 Event per Kategori
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {eventsByCategory.length > 0 ? (
                                    eventsByCategory.map((item) => {
                                        const percentage = totalEvents > 0 ? (item.count / totalEvents * 100) : 0;
                                        return (
                                            <div key={item.category} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <span>{getCategoryIcon(item.category)}</span>
                                                        <span className="font-medium">{item.category}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                                        {item.count} event ({percentage.toFixed(1)}%)
                                                    </div>
                                                </div>
                                                <Progress 
                                                    value={percentage} 
                                                    className="h-2"
                                                    style={{
                                                        '--progress-color': getCategoryColor(item.category)
                                                    } as React.CSSProperties}
                                                />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center text-gray-500 py-8">Belum ada data event</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Bar Chart - Duration by Category */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📊 Total Durasi per Kategori
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {durationByCategory.length > 0 ? (
                                    durationByCategory.map((item) => {
                                        const percentage = maxDuration > 0 ? (item.total_hours / maxDuration * 100) : 0;
                                        return (
                                            <div key={item.category} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <span>{getCategoryIcon(item.category)}</span>
                                                        <span className="font-medium">{item.category}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                                        {item.total_hours} jam
                                                    </div>
                                                </div>
                                                <Progress 
                                                    value={percentage} 
                                                    className="h-3"
                                                    style={{
                                                        '--progress-color': getCategoryColor(item.category)
                                                    } as React.CSSProperties}
                                                />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center text-gray-500 py-8">Belum ada event dengan durasi</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Time Period Analysis */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🕐 Event Berdasarkan Waktu
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {eventsByTimePeriod.length > 0 ? (
                                    eventsByTimePeriod.map((item) => {
                                        const percentage = maxTimePeriod > 0 ? (item.count / maxTimePeriod * 100) : 0;
                                        return (
                                            <div key={item.period} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <span>{getTimePeriodIcon(item.period)}</span>
                                                        <span className="font-medium">{item.period}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                                        {item.count} event
                                                    </div>
                                                </div>
                                                <Progress value={percentage} className="h-2" />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center text-gray-500 py-8">Belum ada data event</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Individual Event Durations */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    ⏱️ Durasi Event Individual
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {eventDurations.length > 0 ? (
                                        eventDurations.map((event, index) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium truncate">{event.name}</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                                        <span>{getCategoryIcon(event.category)} {event.category}</span>
                                                        <span>•</span>
                                                        <span>{event.start_date}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-medium">{event.duration_text}</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                                        {event.duration_hours} jam
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 py-8">Belum ada event dengan durasi</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Insights */}
                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                                💡 Insight
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-blue-800 dark:text-blue-200">
                                {totalEvents > 0 ? (
                                    <>
                                        <p>• Kategori paling populer: <strong>{eventsByCategory[0]?.category || 'N/A'}</strong> dengan {eventsByCategory[0]?.count || 0} event</p>
                                        {durationByCategory.length > 0 && (
                                            <p>• Kategori dengan durasi terpanjang: <strong>{durationByCategory[0]?.category || 'N/A'}</strong> dengan total {durationByCategory[0]?.total_hours || 0} jam</p>
                                        )}
                                        {eventsByTimePeriod.length > 0 && (
                                            <p>• Waktu favorit: <strong>{eventsByTimePeriod[0]?.period || 'N/A'}</strong> dengan {eventsByTimePeriod[0]?.count || 0} event</p>
                                        )}
                                        <p>• Persentase event dengan durasi: <strong>{summary.total > 0 ? ((summary.with_duration / summary.total) * 100).toFixed(1) : 0}%</strong></p>
                                    </>
                                ) : (
                                    <p>Belum ada data untuk dianalisis. Tambahkan event untuk melihat statistik.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}