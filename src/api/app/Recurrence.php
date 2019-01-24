<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Recurrence
 *
 * @property int $id
 * @property int $user_id
 * @property int $category_id
 * @property float $amount
 * @property string $description
 * @property string $frequency
 * @property string $next
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Category $category
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereNext($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereUserId($value)
 * @mixin \Eloquent
 * @property int $next_timestamp
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereNextTimestamp($value)
 * @property string $currency
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Recurrence whereCurrency($value)
 */
class Recurrence extends Model
{
    protected $fillable = ['user_id', 'category_id', 'amount', 'description', 'frequency', 'currency', 'next_timestamp'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
