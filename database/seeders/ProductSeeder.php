<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'سماعات لاسلكية',
                'description' => 'سماعات لاسلكية عالية الجودة مع ميزة إلغاء الضوضاء وعمر بطارية يصل إلى 20 ساعة.',
                'price' => 129.99,
                'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                'category' => 'إلكترونيات',
                'stock' => 50,
            ],
            [
                'name' => 'ساعة ذكية',
                'description' => 'ساعة ذكية متطورة مع مراقبة صحية ونظام تحديد المواقع ومقاومة للماء.',
                'price' => 299.99,
                'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                'category' => 'إلكترونيات',
                'stock' => 30,
            ],
            [
                'name' => 'أحذية رياضية',
                'description' => 'أحذية رياضية مريحة بتصميم شبكي يسمح بالتنفس ونعل مبطن.',
                'price' => 89.99,
                'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                'category' => 'رياضة',
                'stock' => 100,
            ],
            [
                'name' => 'حقيبة ظهر جلدية',
                'description' => 'حقيبة ظهر جلدية أنيقة مع عدة جيوب وحجرة مخصصة للكمبيوتر المحمول.',
                'price' => 149.99,
                'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                'category' => 'موضة',
                'stock' => 25,
            ],
            [
                'name' => 'ماكينة قهوة',
                'description' => 'ماكينة قهوة أوتوماتيكية مع مؤقت قابل للبرمجة وجرة حرارية.',
                'price' => 79.99,
                'image' => 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
                'category' => 'المنزل',
                'stock' => 40,
            ],
            [
                'name' => 'مصباح مكتب',
                'description' => 'مصباح مكتب LED مع سطوع قابل للتعديل ودرجات حرارة ألوان متعددة.',
                'price' => 45.99,
                'image' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
                'category' => 'المنزل',
                'stock' => 60,
            ],
            [
                'name' => 'سماعة بلوتوث',
                'description' => 'سماعة بلوتوث محمولة بصوت جهير قوي ومدة تشغيل تصل إلى 12 ساعة.',
                'price' => 69.99,
                'image' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
                'category' => 'إلكترونيات',
                'stock' => 45,
            ],
            [
                'name' => 'حصيرة يوغا',
                'description' => 'حصيرة يوغا غير قابلة للانزلاق مع حزام حمل ومادة صديقة للبيئة.',
                'price' => 34.99,
                'image' => 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
                'category' => 'رياضة',
                'stock' => 80,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
