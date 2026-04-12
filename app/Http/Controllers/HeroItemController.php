<?php

namespace App\Http\Controllers;

use App\Models\HeroItem;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Inertia\Response;

class HeroItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $heroItems = HeroItem::ordered()->get();

        return inertia('hero-items/index', [
            'heroItems' => $heroItems,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia('hero-items/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|url',
            'link' => 'nullable|string|url',
            'link_text' => 'nullable|string|max:255',
            'badge_text' => 'nullable|string|max:255',
            'badge_color' => ['nullable', Rule::in(['primary', 'secondary', 'accent', 'destructive', 'success'])],
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        HeroItem::create($validated);

        return redirect()->route('hero-items.index')->with('success', 'تم إضافة العنصر البطولي بنجاح');
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroItem $heroItem): Response
    {
        return inertia('hero-items/show', [
            'heroItem' => $heroItem,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HeroItem $heroItem): Response
    {
        return inertia('hero-items/edit', [
            'heroItem' => $heroItem,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroItem $heroItem): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|url',
            'link' => 'nullable|string|url',
            'link_text' => 'nullable|string|max:255',
            'badge_text' => 'nullable|string|max:255',
            'badge_color' => ['nullable', Rule::in(['primary', 'secondary', 'accent', 'destructive', 'success'])],
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $heroItem->update($validated);

        return redirect()->route('hero-items.index')->with('success', 'تم تحديث العنصر البطولي بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroItem $heroItem): RedirectResponse
    {
        $heroItem->delete();

        return redirect()->route('hero-items.index')->with('success', 'تم حذف العنصر البطولي بنجاح');
    }
}
