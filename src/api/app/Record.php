<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Record
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record query()
 * @mixin \Eloquent
 * @property int $id
 * @property float $amount
 * @property string $description
 * @property int $category_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Category $category
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record whereUpdatedAt($value)
 * @property int $user_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record whereUserId($value)
 * @property string $currency
 * @property int $timestamp
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Record whereTimestamp($value)
 */
class Record extends Model
{
    protected $fillable = ['amount', 'description', 'category_id', 'timestamp', 'currency'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
