<?php

namespace App\Repository;


use App\User;
use Auth0\Login\Contract\Auth0UserRepository;
use Auth0\Login\Facade\Auth0;

class UserRepository implements Auth0UserRepository
{
    public function getUserByDecodedJWT($jwt)
    {
        $jwt->user_id = $jwt->sub;
        return $this->upsertUser($jwt);
    }

    public function getUserByUserInfo($userInfo)
    {
        return $this->upsertUser($userInfo['profile']);
    }

    protected function upsertUser($profile)
    {
        // todo: add default currency
        $user = User::where('auth0id', $profile->user_id)->first();
        if ($user === null) {
            $user = new User();
            // todo: request for email/name scope in frontend app
            $user->email = 'dummy@dummy.com'; // $profile->email; // require email scope
            $user->auth0id = $profile->user_id;
            $user->name = 'dummy name'; // $profile->name;   // require name scope
            $user->save();
        }
        return $user;
    }

    public function getUserByIdentifier($identifier)
    {
        $user = Auth0::getUser();

        if ($user === null) return null;

        $user = $this->getUserByUserInfo($user);
        if ($user && $user->auth0id == $identifier) {
            return $user;
        }
        return null;
    }
}