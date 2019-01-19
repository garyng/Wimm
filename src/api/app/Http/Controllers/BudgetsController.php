<?php

namespace App\Http\Controllers;

use App\Budget;
use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;
use Flugg\Responder\Exceptions\Http\UnauthorizedException;

class BudgetsController extends Controller
{
    public function index()
    {
        return responder()->success(Budget::where('user_id', request()->user()->id))->respond();
    }

    public function store(StoreBudgetRequest $request)
    {
        $budget = Budget::create([
            'user_id' => $request->user()->id,
            'category_id' => $request->category_id,
            'limit_per_day' => $request->limit_per_day
        ]);
        return responder()->success($budget)->respond();
    }

    public function show(Budget $budget)
    {
        $this->check($budget);
        return responder()->success($budget)->respond();
    }

    public function update(UpdateBudgetRequest $request, Budget $budget)
    {
        $this->check($budget);
        $budget->update($request->only('category_id', 'limit_per_day'));
        return responder()->success($budget)->respond();
    }

    public function destroy(Budget $budget)
    {
        $this->check($budget);
        $budget->delete();
        return responder()->success($budget)->respond();
    }

    public function check(Budget $budget)
    {
        if ($budget->user_id != request()->user()->id) throw new UnauthorizedException("Unauthorized.");
    }
}
