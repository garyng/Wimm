<?php

namespace App\Transformers;

use App\Category;
use Flugg\Responder\Transformers\Transformer;

class CategoryTransformer extends Transformer
{
    /**
     * List of available relations.
     *
     * @var string[]
     */
    protected $relations = ['records', 'recurrences', 'budgets'];

    /**
     * List of autoloaded default relations.
     *
     * @var array
     */
    protected $load = [];

    /**
     * Transform the model.
     *
     * @param  \App\Category $category
     * @return array
     */
    public function transform(Category $category)
    {
        return [
            'id' => (int) $category->id,
            'name' => $category->name
        ];
    }
}
