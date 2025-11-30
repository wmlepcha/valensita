<?php

namespace Database\Seeders;

use App\Models\AboutSection;
use App\Models\AboutValue;
use Illuminate\Database\Seeder;

class AboutSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete existing about sections (cascade will delete values)
        AboutSection::query()->delete();

        // Create about section
        $aboutSection = AboutSection::create([
            'title' => 'ABOUT US',
            'description' => 'Valensita isn\'t just a brand - it\'s a culture. Rooted in streetwear and individuality, we craft premium apparel that blends luxury with accessibility. From bold graphic tees to essential hoodies, we\'re building a community where fashion is fearless, inclusive, and unapologetically bold.',
            'background_image_url' => '/storage/images/stay-in-the-loop-bg.png',
            'is_active' => true,
        ]);

        // Create brand values
        AboutValue::create([
            'about_section_id' => $aboutSection->id,
            'icon_name' => 'lightbulb',
            'label' => 'CREATIVE EXPRESSION',
            'order' => 1,
            'is_active' => true,
        ]);

        AboutValue::create([
            'about_section_id' => $aboutSection->id,
            'icon_name' => 'heart',
            'label' => 'INCLUSIVITY',
            'order' => 2,
            'is_active' => true,
        ]);

        AboutValue::create([
            'about_section_id' => $aboutSection->id,
            'icon_name' => 'star',
            'label' => 'HIGH QUALITY',
            'order' => 3,
            'is_active' => true,
        ]);

        AboutValue::create([
            'about_section_id' => $aboutSection->id,
            'icon_name' => 'globe',
            'label' => 'SUSTAINABILITY',
            'order' => 4,
            'is_active' => true,
        ]);
    }
}
