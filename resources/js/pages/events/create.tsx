import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
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

export default function CreateEvent({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        start_datetime: '',
        end_datetime: '',
        image: null as File | null,
        video_link: '',
        web_link: '',
        category: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/events', {
            forceFormData: true,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    return (
        <>
            <Head title="Tambah Event" />
            <AppShell>
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">➕ Tambah Event Baru</h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Isi detail event yang akan ditambahkan
                            </p>
                        </div>
                        <Link href="/admin/events">
                            <Button variant="outline">
                                ← Kembali
                            </Button>
                        </Link>
                    </div>

                    {/* Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Event</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nama Event */}
                                <div>
                                    <Label htmlFor="name">Nama Event *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama event"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Tanggal dan Jam */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="start_datetime">Tanggal & Jam Mulai *</Label>
                                        <Input
                                            id="start_datetime"
                                            type="datetime-local"
                                            value={data.start_datetime}
                                            onChange={(e) => setData('start_datetime', e.target.value)}
                                            className={errors.start_datetime ? 'border-red-500' : ''}
                                        />
                                        {errors.start_datetime && (
                                            <p className="text-red-500 text-sm mt-1">{errors.start_datetime}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="end_datetime">Tanggal & Jam Berakhir</Label>
                                        <Input
                                            id="end_datetime"
                                            type="datetime-local"
                                            value={data.end_datetime}
                                            onChange={(e) => setData('end_datetime', e.target.value)}
                                            className={errors.end_datetime ? 'border-red-500' : ''}
                                        />
                                        {errors.end_datetime && (
                                            <p className="text-red-500 text-sm mt-1">{errors.end_datetime}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Kategori */}
                                <div>
                                    <Label htmlFor="category">Kategori Event *</Label>
                                    <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih kategori event" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {getCategoryIcon(category)} {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                    )}
                                </div>

                                {/* Gambar */}
                                <div>
                                    <Label htmlFor="image">Gambar Event</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg,image/gif"
                                        onChange={handleImageChange}
                                        className={errors.image ? 'border-red-500' : ''}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Format: JPEG, PNG, JPG, GIF. Maksimal 2MB.
                                    </p>
                                    {errors.image && (
                                        <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                    )}
                                </div>

                                {/* Link Video */}
                                <div>
                                    <Label htmlFor="video_link">Link Video Event</Label>
                                    <Input
                                        id="video_link"
                                        type="url"
                                        value={data.video_link}
                                        onChange={(e) => setData('video_link', e.target.value)}
                                        placeholder="https://youtube.com/watch?v=..."
                                        className={errors.video_link ? 'border-red-500' : ''}
                                    />
                                    {errors.video_link && (
                                        <p className="text-red-500 text-sm mt-1">{errors.video_link}</p>
                                    )}
                                </div>

                                {/* Link Web/Instagram */}
                                <div>
                                    <Label htmlFor="web_link">Link Website/Instagram</Label>
                                    <Input
                                        id="web_link"
                                        type="url"
                                        value={data.web_link}
                                        onChange={(e) => setData('web_link', e.target.value)}
                                        placeholder="https://instagram.com/... atau https://website.com"
                                        className={errors.web_link ? 'border-red-500' : ''}
                                    />
                                    {errors.web_link && (
                                        <p className="text-red-500 text-sm mt-1">{errors.web_link}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1"
                                    >
                                        {processing ? 'Menyimpan...' : '💾 Simpan Event'}
                                    </Button>
                                    <Link href="/admin/events" className="flex-1">
                                        <Button type="button" variant="outline" className="w-full">
                                            Batal
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Info */}
                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-600 text-lg">💡</span>
                                <div>
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Tips</h4>
                                    <ul className="text-sm text-blue-800 dark:text-blue-200 mt-1 space-y-1">
                                        <li>• Nama event dan tanggal mulai wajib diisi</li>
                                        <li>• Gambar akan ditampilkan sebagai thumbnail event</li>
                                        <li>• Link video dan website opsional, bisa diisi nanti</li>
                                        <li>• Event yang sudah dibuat akan langsung tampil di halaman publik</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}