<?php

namespace App\Http\Middleware;

use App\Repository\UserRepository;
use Auth0\Login\Auth0Service;
use Auth0\Login\Contract\Auth0UserRepository;
use Auth0\SDK\API\Authentication;
use Auth0\SDK\Auth0;
use Auth0\SDK\Exception\CoreException;
use Auth0\SDK\Exception\InvalidTokenException;
use Closure;
use Illuminate\Http\Response;

class Auth0JwtMiddleware
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $accessToken = $request->bearerToken();
        try {
            $user = $this->userRepository->getUser($accessToken);

            if (!$user) {
                return response()->json("Unauthorized user", Response::HTTP_UNAUTHORIZED);
            }
            \Auth::login($user);

        } catch (InvalidTokenException $e) {
            return response()->json($e->getMessage(), Response::HTTP_UNAUTHORIZED);

        } catch (CoreException $e) {
            return response()->json($e->getMessage(), Response::HTTP_UNAUTHORIZED);
        }
        return $next($request);
    }
}
