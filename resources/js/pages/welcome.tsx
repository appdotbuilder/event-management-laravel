import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Event Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="w-full bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-900/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🎉</span>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Event Manager</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                <Link
                                    href="/events"
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                                >
                                    Lihat Event
                                </Link>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                                    🎉 Sistem Manajemen Event
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                    Platform lengkap untuk mengelola dan menampilkan event dengan analisis mendalam
                                </p>
                            </div>

                            {/* Feature Cards */}
                            <div className="grid md:grid-cols-3 gap-6 mt-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="text-4xl mb-4">📅</div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Event Publik</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        Jelajahi event berdasarkan kategori dan tanggal
                                    </p>
                                    <Link
                                        href="/events"
                                        className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:text-blue-300"
                                    >
                                        Lihat Event →
                                    </Link>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="text-4xl mb-4">⚙️</div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Panel Admin</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        Kelola event dengan mudah dan efisien
                                    </p>
                                    {auth.user ? (
                                        <Link
                                            href="/admin/events"
                                            className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors dark:bg-green-900 dark:text-green-300"
                                        >
                                            Kelola Event →
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('login')}
                                            className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300"
                                        >
                                            Login Dulu →
                                        </Link>
                                    )}
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="text-4xl mb-4">📊</div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Statistik</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        Analisis data dengan visualisasi chart
                                    </p>
                                    {auth.user ? (
                                        <Link
                                            href="/statistics"
                                            className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors dark:bg-purple-900 dark:text-purple-300"
                                        >
                                            Lihat Stats →
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('login')}
                                            className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300"
                                        >
                                            Login Dulu →
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mt-12">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">✨ Fitur Lengkap</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span>🏷️</span>
                                            <span className="font-medium text-gray-900 dark:text-white">5 Kategori</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Umum, Pemuda, Budaya, Olahraga, Pariwisata
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span>🖼️</span>
                                            <span className="font-medium text-gray-900 dark:text-white">Media Support</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Upload gambar dan link video
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span>🔍</span>
                                            <span className="font-medium text-gray-900 dark:text-white">Filter Canggih</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Filter berdasarkan tanggal & kategori
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span>📈</span>
                                            <span className="font-medium text-gray-900 dark:text-white">Analytics</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Pie chart, bar chart, dan durasi
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-12">
                                {!auth.user && (
                                    <div className="space-y-4">
                                        <p className="text-lg text-gray-600 dark:text-gray-300">
                                            🚀 Mulai kelola event Anda sekarang!
                                        </p>
                                        <div className="flex justify-center space-x-4">
                                            <Link
                                                href={route('register')}
                                                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                                            >
                                                Daftar Gratis
                                            </Link>
                                            <Link
                                                href="/events"
                                                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
                                            >
                                                Lihat Event
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <p>Built with ❤️ for event management</p>
                </footer>
            </div>
        </>
    );
}