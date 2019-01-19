<?php

namespace App\Repository;


use App\User;

class UserRepository
{
    public function getUser($accessToken) {
        $jwt = \Auth0\Login\Facade\Auth0::decodeJWT($accessToken);
        $auth0Config = config('laravel-auth0');
        $auth = new \Auth0\SDK\API\Authentication('garyng.auth0.com', $auth0Config['client_id'], $jwt->aud, $jwt->scope);
        $user = $auth->userinfo($accessToken);
        return $this->upsertUser($user);
    }

    public function upsertUser($profile)
    {
        $user = User::where('auth0id', $profile['sub'])->first();
        if ($user === null) {
            $user = new User();
            $user->currency = 'MYR';
            $user->email = $profile['email']; // require email scope
            $user->auth0id = $profile['sub'];
            $user->name = $profile['name'];   // require name scope
            $user->save();
        }
        return $user;
    }
}