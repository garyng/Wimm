<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Currency
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency query()
 * @mixin \Eloquent
 * @property int $id
 * @property string $code
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency whereUpdatedAt($value)
 */
class Currency extends Model
{
    protected $fillable = ['code', 'name'];

}
