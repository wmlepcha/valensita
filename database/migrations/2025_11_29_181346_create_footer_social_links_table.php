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
        Schema::create('footer_social_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('footer_id')->constrained('footers')->onDelete('cascade');
            $table->string('platform')->comment('instagram, youtube, facebook, twitter, etc.');
            $table->string('url');
            $table->string('icon_name')->nullable()->comment('For custom icons');
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
        Schema::dropIfExists('footer_social_links');
    }
};
