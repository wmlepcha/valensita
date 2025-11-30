<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            // Support Pages
            [
                'slug' => 'contact',
                'title' => 'Contact Us',
                'content' => '<p>Get in touch with us! We\'d love to hear from you.</p><p>Email: info@valensita.com<br>Phone: +1 (555) 123-4567</p>',
                'category' => 'support',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'shipping',
                'title' => 'Shipping Info',
                'content' => '<p>We offer fast and reliable shipping worldwide.</p><h3>Shipping Options</h3><ul><li>Standard Shipping: 5-7 business days</li><li>Express Shipping: 2-3 business days</li><li>Free shipping on orders over ₹5,000</li></ul>',
                'category' => 'support',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'returns',
                'title' => 'Returns',
                'content' => '<p>Not satisfied with your purchase? We offer hassle-free returns.</p><h3>Return Policy</h3><ul><li>30-day return window</li><li>Items must be unworn and in original packaging</li><li>Free return shipping for eligible items</li></ul>',
                'category' => 'support',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'slug' => 'faq',
                'title' => 'FAQ',
                'content' => '<h3>Frequently Asked Questions</h3><h4>What is your return policy?</h4><p>We offer a 30-day return window for unworn items in original packaging.</p><h4>Do you ship internationally?</h4><p>Yes, we ship worldwide with various shipping options available.</p><h4>How can I track my order?</h4><p>You will receive a tracking number via email once your order ships.</p>',
                'category' => 'support',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'slug' => 'size-guide',
                'title' => 'Size Guide',
                'content' => '<h3>Size Guide</h3><p>Find your perfect fit with our comprehensive size guide.</p><h4>How to Measure</h4><ul><li>Measure your chest at the fullest point</li><li>Measure your waist at the narrowest point</li><li>Measure your hips at the fullest point</li></ul><p>Refer to our size chart for detailed measurements.</p>',
                'category' => 'support',
                'order' => 5,
                'is_active' => true,
            ],
            
            // Company Pages
            [
                'slug' => 'about',
                'title' => 'About Us',
                'content' => '<p>Valensita isn\'t just a brand - it\'s a culture. Rooted in streetwear and individuality, we craft premium apparel that blends luxury with accessibility.</p><p>From bold graphic tees to essential hoodies, we\'re building a community where fashion is fearless, inclusive, and unapologetically bold.</p>',
                'category' => 'company',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'careers',
                'title' => 'Careers',
                'content' => '<h3>Join Our Team</h3><p>We\'re always looking for talented individuals to join the Valensita family.</p><p>Check back soon for open positions, or send your resume to careers@valensita.com</p>',
                'category' => 'company',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'sustainability',
                'title' => 'Sustainability',
                'content' => '<h3>Our Commitment to Sustainability</h3><p>At Valensita, we\'re committed to sustainable fashion practices.</p><ul><li>Ethically sourced materials</li><li>Eco-friendly production processes</li><li>Reduced carbon footprint</li><li>Recyclable packaging</li></ul>',
                'category' => 'company',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'slug' => 'press',
                'title' => 'Press',
                'content' => '<h3>Press Inquiries</h3><p>For media inquiries, please contact us at press@valensita.com</p><p>We\'re happy to provide press kits, high-resolution images, and interview opportunities.</p>',
                'category' => 'company',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'slug' => 'blog',
                'title' => 'Blog',
                'content' => '<h3>Latest from Our Blog</h3><p>Stay updated with the latest fashion trends, style tips, and brand news.</p><p>Check back soon for new articles!</p>',
                'category' => 'company',
                'order' => 5,
                'is_active' => true,
            ],
            
            // Policy Pages
            [
                'slug' => 'privacy',
                'title' => 'Privacy Policy',
                'content' => '<h3>Privacy Policy</h3><p>Last updated: ' . date('F j, Y') . '</p><h4>Information We Collect</h4><p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us.</p><h4>How We Use Your Information</h4><p>We use the information we collect to provide, maintain, and improve our services.</p><h4>Your Rights</h4><p>You have the right to access, update, or delete your personal information at any time.</p>',
                'category' => 'policy',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'terms',
                'title' => 'Terms of Service',
                'content' => '<h3>Terms of Service</h3><p>Last updated: ' . date('F j, Y') . '</p><h4>Agreement to Terms</h4><p>By accessing or using our website, you agree to be bound by these Terms of Service.</p><h4>Use of Website</h4><p>You may use our website for lawful purposes only. You agree not to use the website in any way that violates any applicable laws or regulations.</p><h4>Intellectual Property</h4><p>All content on this website, including text, graphics, logos, and images, is the property of Valensita and protected by copyright laws.</p>',
                'category' => 'policy',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'cookies',
                'title' => 'Cookie Policy',
                'content' => '<h3>Cookie Policy</h3><p>Last updated: ' . date('F j, Y') . '</p><h4>What Are Cookies</h4><p>Cookies are small text files that are placed on your device when you visit our website.</p><h4>How We Use Cookies</h4><p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.</p><h4>Managing Cookies</h4><p>You can control and manage cookies through your browser settings. However, disabling cookies may affect the functionality of our website.</p>',
                'category' => 'policy',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($pages as $pageData) {
            Page::updateOrCreate(
                ['slug' => $pageData['slug']],
                $pageData
            );
        }
    }
}
