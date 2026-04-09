<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $products = Product::all();

        return inertia('Home', [
            'products' => $products,
        ]);
    }
}