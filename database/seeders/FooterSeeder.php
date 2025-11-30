<?php

namespace Database\Seeders;

use App\Models\Footer;
use App\Models\FooterSocialLink;
use App\Models\FooterServiceItem;
use Illuminate\Database\Seeder;

class FooterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete existing footers (cascade will delete social links)
        Footer::query()->delete();

        // Create footer
        $footer = Footer::create([
            'brand_name' => 'VALENSITA',
            'description' => 'Modern luxury streetwear for the bold and refined. Curated collections that express your unique style.',
            'logo_url' => '/storage/images/valensita-footer-logo.png',
            'is_active' => true,
        ]);

        // Create social media links
        FooterSocialLink::create([
            'footer_id' => $footer->id,
            'platform' => 'instagram',
            'url' => 'https://instagram.com',
            'order' => 1,
            'is_active' => true,
        ]);

        FooterSocialLink::create([
            'footer_id' => $footer->id,
            'platform' => 'youtube',
            'url' => 'https://youtube.com',
            'order' => 2,
            'is_active' => true,
        ]);

        FooterSocialLink::create([
            'footer_id' => $footer->id,
            'platform' => 'facebook',
            'url' => 'https://facebook.com',
            'order' => 3,
            'is_active' => true,
        ]);

        // Create service items for marquee banner
        FooterServiceItem::create([
            'footer_id' => $footer->id,
            'text' => 'SHIPPING WITHIN 24 HOURS',
            'order' => 1,
            'is_active' => true,
        ]);

        FooterServiceItem::create([
            'footer_id' => $footer->id,
            'text' => 'FREE DELIVERY',
            'order' => 2,
            'is_active' => true,
        ]);

        FooterServiceItem::create([
            'footer_id' => $footer->id,
            'text' => 'EXCHANGE AND RETURN',
            'order' => 3,
            'is_active' => true,
        ]);
    }
}
