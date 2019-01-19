<?php

namespace App\Transformers;

use App\Recurrence;
use Doctrine\DBAL\Types\BigIntType;
use Flugg\Responder\Transformers\Transformer;
use Swap\Laravel\Facades\Swap;

class RecurrenceTransformer extends Transformer
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
     * @param  \App\Recurrence $recurrence
     * @return array
     */
    public function transform(Recurrence $recurrence)
    {
        return [
            'id' => (int) $recurrence->id,
            'userId' => (int) $recurrence->user_id,
            'categoryId' => (int) $recurrence->category_id,
            'amount' => (float) $recurrence->amount,
            'description' => $recurrence->description,
            'frequency' => $recurrence->frequency,
            'nextTimestamp' => $recurrence->next_timestamp,
            'currency' => $recurrence->currency,
            'localAmount' => round($recurrence->amount * Swap::latest($recurrence->currency . '/' . request()->user()->currency)->getValue(), 2)
        ];
    }
}
