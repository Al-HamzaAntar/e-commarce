<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroItem extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'link',
        'link_text',
        'badge_text',
        'badge_color',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }
}
