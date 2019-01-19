<?php

namespace App\Transformers;

use App\Budget;
use Flugg\Responder\Transformers\Transformer;
use Swap\Laravel\Facades\Swap;

class BudgetTransformer extends Transformer
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
    protected $load = ['user', 'category'];

    /**
     * Transform the model.
     *
     * @param  \App\Budget $budget
     * @return array
     */
    public function transform(Budget $budget)
    {
        return [
            'id' => (int)$budget->id,
            'userId' => (int)$budget->user_id,
            'categoryId' => (int)$budget->category_id,
            'limitPerDay' => (float)$budget->limit_per_day,
            'currency' => $budget->currency,
            'localAmount' => round($budget->limit_per_day * Swap::latest($budget->currency . '/' . request()->user()->currency)->getValue(), 2)
        ];
    }
}
