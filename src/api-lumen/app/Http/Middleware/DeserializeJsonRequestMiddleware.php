<?php

namespace App\Http\Middleware;

use Closure;

class DeserializeJsonRequestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // from https://medium.com/@paulredmond/how-to-submit-json-post-requests-to-lumen-666257fe8280
        if (in_array($request->method(), ['POST', 'PUT', 'PATCH']) && $request->isJson())
        {
            $data = $request->json()->all();
            $request->request->replace(is_array($data) ? $data : []);
        }
        return $next($request);
    }
}
