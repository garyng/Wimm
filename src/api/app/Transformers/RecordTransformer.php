<?php

namespace App\Transformers;

use App\Record;
use Flugg\Responder\Transformers\Transformer;

class RecordTransformer extends Transformer
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
     * @param  \App\Record $record
     * @return array
     */
    public function transform(Record $record)
    {
        return [
            'id' => (int)$record->id,
            'amount' => (float)$record->amount,
            'description' => $record->description,
            'categoryId' => (int)$record->category_id,
            'userId' => (int)$record->user_id,
        ];
    }
}
