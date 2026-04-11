<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::latest()->paginate(10);

        return inertia('products/index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return inertia('products/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|url',
            'category' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
        ]);

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'تم إضافة المنتج بنجاح');
    }

    public function show(Product $product): Response
    {
        return inertia('products/show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product): Response
    {
        return inertia('products/edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|url',
            'category' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'تم تحديث المنتج بنجاح');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'تم حذف المنتج بنجاح');
    }
}
