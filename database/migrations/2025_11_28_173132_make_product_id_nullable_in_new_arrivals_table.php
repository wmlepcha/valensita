<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * This migration makes product_id nullable and changes the foreign key
     * constraint from cascade delete to set null, making New Arrivals
     * independent from Hero Section products.
     */
    public function up(): void
    {
        Schema::table('new_arrivals', function (Blueprint $table) {
            // Drop the existing foreign key constraint
            $table->dropForeign(['product_id']);
            
            // Make product_id nullable
            $table->unsignedBigInteger('product_id')->nullable()->change();
            
            // Re-add the foreign key constraint with set null on delete
            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('new_arrivals', function (Blueprint $table) {
            // Drop the foreign key constraint
            $table->dropForeign(['product_id']);
            
            // Make product_id not nullable again
            $table->unsignedBigInteger('product_id')->nullable(false)->change();
            
            // Re-add the foreign key constraint with cascade delete
            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('cascade');
        });
    }
};
