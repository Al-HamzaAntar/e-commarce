<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\HeroItemController;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');
Route::get('/favorites', function () {
    return Inertia::render('Favorites');
})->name('favorites');

Route::middleware(['auth', 'verified'])->group(function () {
    // Product management routes
    Route::resource('products', ProductController::class);

    // Hero items management routes
    Route::resource('hero-items', HeroItemController::class);

    Route::get('dashboard', function () {
        $totalProducts = Product::count();
        $totalCustomers = User::where('role', 'client')->count();
        $inventoryValue = Product::sum(DB::raw('price * stock'));
        $lowStockProducts = Product::where('stock', '<', 10)->count();

        $stats = [
            ['title' => 'قيمة المخزون', 'value' => '$'.number_format($inventoryValue, 2), 'change' => '+0.0%', 'type' => 'revenue'],
            ['title' => 'المنتجات', 'value' => (string) $totalProducts, 'change' => '+0%', 'type' => 'products'],
            ['title' => 'العملاء', 'value' => (string) $totalCustomers, 'change' => '+0%', 'type' => 'customers'],
            ['title' => 'المخزون المنخفض', 'value' => (string) $lowStockProducts, 'change' => '+0%', 'type' => 'lowStock'],
        ];

        $recentProducts = Product::latest()
            ->take(5)
            ->get(['id', 'name', 'price', 'category', 'stock', 'updated_at'])
            ->map(function (Product $product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'category' => $product->category,
                    'stock' => $product->stock,
                    'updated_at' => $product->updated_at->toDateString(),
                ];
            })
            ->toArray();

        return Inertia::render('dashboard', compact('stats', 'recentProducts'));
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
