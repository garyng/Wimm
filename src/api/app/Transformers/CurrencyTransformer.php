<?php

namespace App\Transformers;

use App\Currency;
use Flugg\Responder\Transformers\Transformer;
use Swap\Laravel\Facades\Swap;

class CurrencyTransformer extends Transformer
{
    /**
     * List of available relations.
     *
     * @var string[]
     */
    protected $relations = [];

    /**
     * List of autoloaded default relations.
     *
     * @var array
     */
    protected $load = [];

    /**
     * Transform the model.
     *
     * @param  \App\Currency $currency
     * @return array
     */
    public function transform(Currency $currency)
    {
        return [
            'id' => (int) $currency->id,
            'code' => $currency->code,
            'name' => $currency->name,
            'rateToLocal' => Swap::latest($currency->code . '/' . request()->user()->currency)->getValue()
        ];
    }
}
