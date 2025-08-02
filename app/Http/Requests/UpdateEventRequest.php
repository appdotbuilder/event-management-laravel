<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'start_datetime' => 'required|date',
            'end_datetime' => 'nullable|date|after:start_datetime',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video_link' => 'nullable|url|max:500',
            'web_link' => 'nullable|url|max:500',
            'category' => 'required|in:Umum,Pemuda,Budaya,Olahraga,Pariwisata',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama event wajib diisi.',
            'name.max' => 'Nama event maksimal 255 karakter.',
            'start_datetime.required' => 'Tanggal dan jam mulai event wajib diisi.',
            'start_datetime.date' => 'Format tanggal dan jam mulai tidak valid.',
            'end_datetime.date' => 'Format tanggal dan jam berakhir tidak valid.',
            'end_datetime.after' => 'Tanggal dan jam berakhir harus setelah tanggal mulai.',
            'image.image' => 'File harus berupa gambar.',
            'image.mimes' => 'Gambar harus berformat jpeg, png, jpg, atau gif.',
            'image.max' => 'Ukuran gambar maksimal 2MB.',
            'video_link.url' => 'Link video harus berupa URL yang valid.',
            'video_link.max' => 'Link video maksimal 500 karakter.',
            'web_link.url' => 'Link web harus berupa URL yang valid.',
            'web_link.max' => 'Link web maksimal 500 karakter.',
            'category.required' => 'Kategori event wajib dipilih.',
            'category.in' => 'Kategori yang dipilih tidak valid.',
        ];
    }
}