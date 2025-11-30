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
        Schema::create('about_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('about_section_id')->constrained('about_sections')->onDelete('cascade');
            $table->string('icon_name')->comment('e.g., lightbulb, heart, star, globe');
            $table->string('label');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('order');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_values');
    }
};
