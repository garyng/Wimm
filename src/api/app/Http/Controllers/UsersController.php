<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserCurrencyRequest;
use App\User;

class UsersController extends Controller
{
    public function get()
    {
        return responder()->success(User::findOrFail(request()->user()->id))->respond();
    }

    public function currency(UpdateUserCurrencyRequest $request)
    {
        $user = User::findOrFail(request()->user()->id);
        $user->update($request->only(['currency']));
        return responder()->success($user)->respond();
    }
}
