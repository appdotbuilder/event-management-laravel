import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Event Management" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        🎉 Dashboard Event Manager
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Selamat datang di panel admin. Kelola event Anda dengan mudah!
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Link href="/admin/events/create">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 text-center">
                                <div className="text-3xl mb-2">➕</div>
                                <div className="font-semibold">Tambah Event</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Buat event baru</div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/events">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 text-center">
                                <div className="text-3xl mb-2">📅</div>
                                <div className="font-semibold">Kelola Event</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Lihat semua event</div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/statistics">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 text-center">
                                <div className="text-3xl mb-2">📊</div>
                                <div className="font-semibold">Statistik</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Analisis data</div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/events">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 text-center">
                                <div className="text-3xl mb-2">👁️</div>
                                <div className="font-semibold">Preview</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Halaman publik</div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📅 Manajemen Event
                            </CardTitle>
                            <CardDescription>
                                Kelola semua event dengan mudah
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600 dark:text-gray-400">
                                Sistem manajemen event lengkap dengan fitur:
                            </p>
                            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                                <li>✅ Input detail event (nama, tanggal, kategori)</li>
                                <li>✅ Upload gambar dan link video</li>
                                <li>✅ 5 kategori: Umum, Pemuda, Budaya, Olahraga, Pariwisata</li>
                                <li>✅ Filter berdasarkan tanggal dan kategori</li>
                                <li>✅ Tampilan otomatis di halaman publik</li>
                            </ul>
                            <div className="pt-4">
                                <Link href="/admin/events">
                                    <Button className="w-full">
                                        Kelola Event Sekarang
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📊 Analytics & Statistik
                            </CardTitle>
                            <CardDescription>
                                Visualisasi data event yang komprehensif
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-600 dark:text-gray-400">
                                Analisis mendalam dengan berbagai visualisasi:
                            </p>
                            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                                <li>📊 Pie chart jumlah event per kategori</li>
                                <li>📈 Bar chart total durasi per kategori</li>
                                <li>🕐 Analisis waktu event (pagi, siang, sore, malam)</li>
                                <li>⏱️ Detail durasi setiap event</li>
                                <li>💡 Insight dan rekomendasi otomatis</li>
                            </ul>
                            <div className="pt-4">
                                <Link href="/statistics">
                                    <Button variant="outline" className="w-full">
                                        Lihat Statistik
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tips & Info */}
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                            💡 Tips Penggunaan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
                            <div>
                                <h4 className="font-semibold mb-2">Untuk Admin:</h4>
                                <ul className="space-y-1">
                                    <li>• Nama event dan tanggal mulai wajib diisi</li>
                                    <li>• Upload gambar untuk tampilan yang menarik</li>
                                    <li>• Gunakan kategori yang sesuai untuk filter yang mudah</li>
                                    <li>• Link video dan web bersifat opsional</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Fitur Unggulan:</h4>
                                <ul className="space-y-1">
                                    <li>• Event langsung tampil di halaman publik</li>
                                    <li>• Filter canggih berdasarkan tanggal & kategori</li>
                                    <li>• Statistik real-time dengan visualisasi</li>
                                    <li>• Interface responsive untuk mobile & desktop</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl mb-2">🏠</div>
                                <div className="font-medium">Halaman Utama</div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/events">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl mb-2">🌐</div>
                                <div className="font-medium">Event Publik</div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/settings">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl mb-2">⚙️</div>
                                <div className="font-medium">Pengaturan</div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}