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
        Schema::create('hero_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->decimal('price', 10, 2);
            $table->string('image_url')->nullable();
            $table->string('lining')->nullable()->comment('e.g., 100% Cotton');
            $table->string('material')->nullable()->comment('e.g., Size Medium');
            $table->string('height')->nullable()->comment('e.g., 5.11/180 cm');
            $table->foreignId('product_id')->nullable()->constrained('products')->onDelete('set null');
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
        Schema::dropIfExists('hero_items');
    }
};
