<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->integer('quantity')->default(0)->after('value');
        });

        // Migrate existing product quantity to size variants
        // If a product has quantity and size variants, distribute it evenly
        DB::table('products')->chunkById(100, function ($products) {
            foreach ($products as $product) {
                $sizeVariants = DB::table('product_variants')
                    ->where('product_id', $product->id)
                    ->where('type', 'size')
                    ->where('is_active', true)
                    ->get();

                if ($sizeVariants->count() > 0 && $product->quantity > 0) {
                    // Distribute quantity evenly across sizes
                    $quantityPerSize = (int) floor($product->quantity / $sizeVariants->count());
                    $remainder = $product->quantity % $sizeVariants->count();

                    foreach ($sizeVariants as $index => $variant) {
                        $quantity = $quantityPerSize + ($index < $remainder ? 1 : 0);
                        DB::table('product_variants')
                            ->where('id', $variant->id)
                            ->update(['quantity' => $quantity]);
                    }
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropColumn('quantity');
        });
    }
};
