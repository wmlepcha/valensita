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
        Schema::create('trending_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('image_url');
            $table->string('hover_image_url')->nullable();
            $table->string('category_label')->comment('e.g., T-SHIRTS, HOODIES');
            $table->string('slug');
            $table->integer('row')->default(1)->comment('Row number: 1 (top) or 2 (bottom)');
            $table->integer('order')->default(0)->comment('Order within the row');
            $table->string('background_gradient')->nullable()->comment('CSS gradient for background');
            $table->foreignId('product_id')->nullable()->constrained('products')->onDelete('set null');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('row');
            $table->index('order');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trending_items');
    }
};
