<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\HeroItem;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $products = Product::all()->map(function (Product $product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => (float) $product->price,
                'image' => $product->image,
                'category' => $product->category,
                'stock' => $product->stock,
            ];
        });

        $heroItems = HeroItem::active()->ordered()->get();

        return inertia('Home', [
            'products' => $products,
            'heroItems' => $heroItems,
        ]);
    }
}
