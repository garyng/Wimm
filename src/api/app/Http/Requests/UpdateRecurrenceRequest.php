<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRecurrenceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'sometimes|required|exists:users,id',
            'category_id' => 'sometimes|required|exists:categories,id',
            'amount' => 'sometimes|required|numeric',
            'description' => 'nullable',
            'frequency' => [
                'sometimes',
                'required',
                Rule::in(['daily', 'weekly', 'monthly', 'yearly'])
            ],
            'next_timestamp' => 'sometimes|required|numeric'
        ];
    }
}
