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
        Schema::table('hero_items', function (Blueprint $table) {
            $table->text('care_instructions')->nullable()->after('height');
            $table->text('shipping_info')->nullable()->after('care_instructions');
            $table->string('premium_text')->nullable()->after('shipping_info');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_items', function (Blueprint $table) {
            $table->dropColumn(['care_instructions', 'shipping_info', 'premium_text']);
        });
    }
};
