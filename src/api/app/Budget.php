<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Budget
 *
 * @property int $id
 * @property int $user_id
 * @property int $category_id
 * @property float $limit_per_day
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget whereLimitPerDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget whereUserId($value)
 * @mixin \Eloquent
 * @property-read \App\Category $category
 * @property-read \App\User $user
 * @property string $currency
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Budget whereCurrency($value)
 */
class Budget extends Model
{
    protected $fillable = ['user_id', 'category_id', 'limit_per_day', 'currency'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
