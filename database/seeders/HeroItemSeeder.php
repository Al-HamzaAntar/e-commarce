<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HeroItem;

class HeroItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HeroItem::create([
            'title' => 'تشكيلة جديدة من الأزياء',
            'description' => 'اكتشف أحدث التصاميم والأزياء الموسمية في متجرنا',
            'image' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
            'link' => '/products?category=أزياء',
            'link_text' => 'تسوق الآن',
            'badge_text' => 'جديد',
            'badge_color' => 'primary',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        HeroItem::create([
            'title' => 'خصومات تصل إلى 50%',
            'description' => 'عروض محدودة الوقت على جميع المنتجات المختارة',
            'image' => 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
            'link' => '/products',
            'link_text' => 'استفد من العروض',
            'badge_text' => 'خصم',
            'badge_color' => 'destructive',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        HeroItem::create([
            'title' => 'منتجات مميزة للمنزل',
            'description' => 'ديكورات وأدوات منزلية عالية الجودة تناسب ذوقك',
            'image' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
            'link' => '/products?category=منزل',
            'link_text' => 'اكتشف المزيد',
            'badge_text' => 'مميز',
            'badge_color' => 'success',
            'is_active' => true,
            'sort_order' => 3,
        ]);
    }
}
