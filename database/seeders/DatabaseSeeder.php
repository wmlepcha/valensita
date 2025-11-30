<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed menus, hero items, new arrivals, category sections, trending items, about section, footer, and pages
        $this->call([
            MenuSeeder::class,
            HeroItemSeeder::class,
            NewArrivalSeeder::class,
            CategorySectionSeeder::class,
            TrendingItemSeeder::class,
            AboutSectionSeeder::class,
            FooterSeeder::class,
            PageSeeder::class,
        ]);
    }
}
