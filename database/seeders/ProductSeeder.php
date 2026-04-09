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
                'name' => 'Wireless Headphones',
                'description' => 'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
                'price' => 129.99,
                'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                'category' => 'Electronics',
                'stock' => 50,
            ],
            [
                'name' => 'Smart Watch',
                'description' => 'Feature-rich smart watch with health monitoring, GPS, and water resistance.',
                'price' => 299.99,
                'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                'category' => 'Electronics',
                'stock' => 30,
            ],
            [
                'name' => 'Running Shoes',
                'description' => 'Comfortable running shoes with breathable mesh and cushioned sole.',
                'price' => 89.99,
                'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                'category' => 'Sports',
                'stock' => 100,
            ],
            [
                'name' => 'Leather Backpack',
                'description' => 'Stylish leather backpack with multiple compartments and laptop sleeve.',
                'price' => 149.99,
                'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                'category' => 'Fashion',
                'stock' => 25,
            ],
            [
                'name' => 'Coffee Maker',
                'description' => 'Automatic coffee maker with programmable timer and thermal carafe.',
                'price' => 79.99,
                'image' => 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
                'category' => 'Home',
                'stock' => 40,
            ],
            [
                'name' => 'Desk Lamp',
                'description' => 'LED desk lamp with adjustable brightness and color temperature.',
                'price' => 45.99,
                'image' => 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
                'category' => 'Home',
                'stock' => 60,
            ],
            [
                'name' => 'Bluetooth Speaker',
                'description' => 'Portable Bluetooth speaker with rich bass and 12-hour playtime.',
                'price' => 69.99,
                'image' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
                'category' => 'Electronics',
                'stock' => 45,
            ],
            [
                'name' => 'Yoga Mat',
                'description' => 'Non-slip yoga mat with carrying strap and eco-friendly material.',
                'price' => 34.99,
                'image' => 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
                'category' => 'Sports',
                'stock' => 80,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}