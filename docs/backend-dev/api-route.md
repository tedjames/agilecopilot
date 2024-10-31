## API Routes in Next.js

API routes provide a solution to build a public API with Next.js.

Any file inside the folder pages/api is mapped to /api/\* and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size.

For example, the following API route returns a JSON response with a status code of 200:

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: "Hello from Next.js!" });
}
```

### HTTP Methods

To handle different HTTP methods in an API route, you can use req.method in your request handler, like so:

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
```

### Response Helpers

The Server Response object, (often abbreviated as res) includes a set of Express.js-like helper methods to improve the developer experience and increase the speed of creating new API endpoints.

The included helpers are:

res.status(code) - A function to set the status code. code must be a valid HTTP status code
res.json(body) - Sends a JSON response. body must be a serializable object
res.send(body) - Sends the HTTP response. body can be a string, an object or a Buffer
res.redirect([status,] path) - Redirects to a specified path or URL. status must be a valid HTTP status code. If not specified, status defaults to "307" "Temporary redirect".
res.revalidate(urlPath) - Revalidate a page on demand using getStaticProps. urlPath must be a string.

### Setting the status code of a response

When sending a response back to the client, you can set the status code of the response.

The following example sets the status code of the response to 200 (OK) and returns a message property with the value of Hello from Next.js! as a JSON response:

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: "Hello from Next.js!" });
}
```

### Sending a JSON response

When sending a response back to the client you can send a JSON response, this must be a serializable object. In a real world application you might want to let the client know the status of the request depending on the result of the requested endpoint.

The following example sends a JSON response with the status code 200 (OK) and the result of the async operation. It's contained in a try catch block to handle any errors that may occur, with the appropriate status code and error message caught and sent back to the client:

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await someAsyncOperation();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
```

### Sending a HTTP response

Sending an HTTP response works the same way as when sending a JSON response. The only difference is that the response body can be a string, an object or a Buffer.

The following example sends a HTTP response with the status code 200 (OK) and the result of the async operation.

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await someAsyncOperation();
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ error: "failed to fetch data" });
  }
}
```

### Redirects to a specified path or URL

Taking a form as an example, you may want to redirect your client to a specified path or URL once they have submitted the form.

The following example redirects the client to the / path if the form is successfully submitted:

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, message } = req.body;

  try {
    await handleFormInputAsync({ name, message });
    res.redirect(307, "/");
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch data" });
  }
}
```

### Adding TypeScript types

You can make your API Routes more type-safe by importing the NextApiRequest and NextApiResponse types from next, in addition to those, you can also type your response data:

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: "Hello from Next.js!" });
}
```

Note: The body of NextApiRequest is any because the client may include any payload. You should validate the type/shape of the body at runtime before using it.

### Dynamic API Routes

API Routes support dynamic routes, and follow the same file naming rules used for pages/.

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  res.end(`Post: ${pid}`);
}
```

Now, a request to /api/post/abc will respond with the text: Post: abc.

### Catch all API routes

API Routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:

pages/api/post/[...slug].js matches /api/post/a, but also /api/post/a/b, /api/post/a/b/c and so on.
Good to know: You can use names other than slug, such as: [...param]

Matched parameters will be sent as a query parameter (slug in the example) to the page, and it will always be an array, so, the path /api/post/a will have the following query object:
{ "slug": ["a"] }

And in the case of /api/post/a/b, and any other matching path, new parameters will be added to the array, like so:
{ "slug": ["a", "b"] }

For example:

```tsx
// pages/api/post/[...slug].ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  res.end(`Post: ${slug.join(", ")}`);
}
```

Now, a request to /api/post/a/b/c will respond with the text: Post: a, b, c.

###Optional catch all API routes
Catch all routes can be made optional by including the parameter in double brackets ([[...slug]]).

For example, pages/api/post/[[...slug]].js will match /api/post, /api/post/a, /api/post/a/b, and so on.

The main difference between catch all and optional catch all routes is that with optional, the route without the parameter is also matched (/api/post in the example above).

The query objects are as follows:

{ } // GET `/api/post` (empty object)
{ "slug": ["a"] } // `GET /api/post/a` (single-element array)
{ "slug": ["a", "b"] } // `GET /api/post/a/b` (multi-element array)

Caveats

Predefined API routes take precedence over dynamic API routes, and dynamic API routes over catch all API routes. Take a look at the following examples:
pages/api/post/create.js - Will match /api/post/create
pages/api/post/[pid].js - Will match /api/post/1, /api/post/abc, etc. But not /api/post/create
pages/api/post/[...slug].js - Will match /api/post/1/2, /api/post/a/b/c, etc. But not /api/post/create, /api/post/abc
