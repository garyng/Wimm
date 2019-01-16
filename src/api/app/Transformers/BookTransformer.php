<?php

namespace App\Transformers;

use App\Book;
use Flugg\Responder\Transformers\Transformer;

class BookTransformer extends Transformer
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
    protected $load = ['user', 'ratings'];

    /**
     * Transform the model.
     *
     * @param  \App\Book $book
     * @return array
     */
    public function transform(Book $book)
    {
        return [
            'id' => (int) $book->id,
            'userId' => (int) $book->user_id,
            'title' => $book->title,
            'description' => $book->description,
        ];
    }
}