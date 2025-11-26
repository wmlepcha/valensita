<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackLastLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && $request->is('sukaran/*')) {
            $user = auth()->user();
            
            // Only update if last_login_at is null or more than 5 minutes ago
            // This prevents updating on every request
            if (!$user->last_login_at || ($user->last_login_at instanceof \Carbon\Carbon && $user->last_login_at->diffInMinutes(now()) > 5)) {
                $user->update([
                    'last_login_at' => now(),
                    'last_login_ip' => $request->ip(),
                ]);
            }
        }
        
        return $next($request);
    }
}
