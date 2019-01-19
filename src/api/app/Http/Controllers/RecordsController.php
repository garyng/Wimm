<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecordRequest;
use App\Http\Requests\UpdateRecordRequest;
use App\Record;
use Flugg\Responder\Exceptions\Http\UnauthorizedException;

class RecordsController extends Controller
{
    public function index()
    {
        return responder()->success(Record::where('user_id', request()->user()->id))->respond();
    }

    public function store(StoreRecordRequest $request)
    {
        $record = Record::create([
            'amount' => $request->amount,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => $request->user()->id,
            'timestamp' => $request->timestamp,
            'currency' => $request->currency
        ]);
        return responder()->success($record);
    }

    public function show(Record $record)
    {
        $this->check($record);
        return responder()->success($record)->respond();
    }

    public function update(UpdateRecordRequest $request, Record $record)
    {
        $this->check($record);
        $record->update($request->only(['amount', 'description', 'category_id', 'timestamp', 'currency']));
        return responder()->success($record)->respond();
    }

    public function destroy(Record $record)
    {
        $this->check($record);
        $record->delete();
        return responder()->success($record)->respond();
    }

    public function check(Record $record)
    {
        if ($record->user_id != request()->user()->id) throw new UnauthorizedException("Unauthorized.");
    }
}
