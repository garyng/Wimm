<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecurrenceRequest;
use App\Http\Requests\UpdateRecurrenceRequest;
use App\Recurrence;
use Flugg\Responder\Exceptions\Http\UnauthorizedException;

class RecurrencesController extends Controller
{
    public function index()
    {
        return responder()->success(Recurrence::where('user_id', request()->user()->id))->respond();
    }

    public function store(StoreRecurrenceRequest $request)
    {
        $recurrence = Recurrence::create([
            'user_id' => $request->user()->id,
            'category_id' => $request->category_id,
            'amount' => $request->amount,
            'description' => $request->description,
            'frequency' => $request->frequency,
            'next_timestamp' => $request->next_timestamp,
        ]);

        return responder()->success($recurrence)->respond();
    }

    public function show(Recurrence $recurrence)
    {
        $this->check($recurrence);
        return responder()->success($recurrence)->respond();
    }

    public function update(UpdateRecurrenceRequest $request, Recurrence $recurrence)
    {
        $this->check($recurrence);
        $recurrence->update($request->only(['category_id', 'amount', 'description', 'frequency', 'next_timestamp']));
        return responder()->success($recurrence)->respond();
    }

    public function destroy(Recurrence $recurrence)
    {
        $this->check($recurrence);
        $recurrence->delete();
        return responder()->success($recurrence)->respond();
    }

    public function check(Recurrence $recurrence)
    {
        if ($recurrence->user_id != request()->user()->id) throw new UnauthorizedException("Unauthorized.");
    }
}
