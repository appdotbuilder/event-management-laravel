<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Event name');
            $table->datetime('start_datetime')->comment('Event start date and time');
            $table->datetime('end_datetime')->nullable()->comment('Event end date and time');
            $table->string('image')->nullable()->comment('Event image path');
            $table->string('video_link')->nullable()->comment('Video event link');
            $table->string('web_link')->nullable()->comment('Website or Instagram link');
            $table->enum('category', ['Umum', 'Pemuda', 'Budaya', 'Olahraga', 'Pariwisata'])->default('Umum')->comment('Event category');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('start_datetime');
            $table->index('category');
            $table->index(['category', 'start_datetime']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};