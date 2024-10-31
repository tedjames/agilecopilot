## Middleware

Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Middleware runs before cached content and routes are matched. See Matching Paths for more details.

### Use Cases

Integrating Middleware into your application can lead to significant improvements in performance, security, and user experience. Some common scenarios where Middleware is particularly effective include:

Authentication and Authorization: Ensure user identity and check session cookies before granting access to specific pages or API routes.
Server-Side Redirects: Redirect users at the server level based on certain conditions (e.g., locale, user role).
Path Rewriting: Support A/B testing, feature rollouts, or legacy paths by dynamically rewriting paths to API routes or pages based on request properties.
Bot Detection: Protect your resources by detecting and blocking bot traffic.
Logging and Analytics: Capture and analyze request data for insights before processing by the page or API.
Feature Flagging: Enable or disable features dynamically for seamless feature rollouts or testing.
Recognizing situations where middleware may not be the optimal approach is just as crucial. Here are some scenarios to be mindful of:

Complex Data Fetching and Manipulation: Middleware is not designed for direct data fetching or manipulation, this should be done within Route Handlers or server-side utilities instead.
Heavy Computational Tasks: Middleware should be lightweight and respond quickly or it can cause delays in page load. Heavy computational tasks or long-running processes should be done within dedicated Route Handlers.
Extensive Session Management: While Middleware can manage basic session tasks, extensive session management should be managed by dedicated authentication services or within Route Handlers.
Direct Database Operations: Performing direct database operations within Middleware is not recommended. Database interactions should done within Route Handlers or server-side utilities.

### Convention

Use the file middleware.ts (or .js) in the root of your project to define Middleware. For example, at the same level as pages or app, or inside src if applicable.

Note: While only one middleware.ts file is supported per project, you can still organize your middleware logic modularly. Break out middleware functionalities into separate .ts or .js files and import them into your main middleware.ts file. This allows for cleaner management of route-specific middleware, aggregated in the middleware.ts for centralized control. By enforcing a single middleware file, it simplifies configuration, prevents potential conflicts, and optimizes performance by avoiding multiple middleware layers.

Example:

```ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
```

### Matching Paths

Middleware will be invoked for every route in your project. Given this, it's crucial to use matchers to precisely target or exclude specific routes. The following is the execution order:

headers from next.config.js
redirects from next.config.js
Middleware (rewrites, redirects, etc.)
beforeFiles (rewrites) from next.config.js
Filesystem routes (public/, \_next/static/, pages/, app/, etc.)
afterFiles (rewrites) from next.config.js
Dynamic Routes (/blog/[slug])
fallback (rewrites) from next.config.js
There are two ways to define which paths Middleware will run on:

Custom matcher config
Conditional statements

### Matcher

matcher allows you to filter Middleware to run on specific paths.

```ts
export const config = {
  matcher: "/about/:path*",
};
```

You can match a single path or multiple paths with an array syntax:

```ts
export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
```

The matcher config allows full regex so matching like negative lookaheads or character matching is supported. An example of a negative lookahead to match all except specific paths can be seen here:

```ts
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
```
