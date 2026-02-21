<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ProductImage extends Model
{
    /** @use HasFactory<\Database\Factories\ProductImageFactory> */
    use HasFactory;

    protected $fillable = [
        'product_id',
        'url',
        'alt_text',
        'sort_order',
        'is_primary',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'is_primary' => 'boolean',
        ];
    }

    /** Resolve stored path to a full public URL. */
    protected function url(): Attribute
    {
        return Attribute::get(function (string $value): string {
            if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://') || str_starts_with($value, '/')) {
                return $value;
            }
            return Storage::url($value);
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
