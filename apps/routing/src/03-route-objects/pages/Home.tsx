export const Home = () => (
  <main>
    <h1>Route Objects Example</h1>

    <p>
      This example demonstrates how to use React Router&lsquo;s &ldquo;route object&ldquo; API instead of the JSX API to
      configure your routes. Both APIs are first-class. In fact, React Router actually uses the object-based API
      internally by creating route objects from your <code>&lt;Route&gt;</code>
      elements.
    </p>

    <p>
      React Router exposes a <code>useRoutes()</code> hook that allows you to hook into the same matching algorithm that{' '}
      <code>&lt;Routes&gt;</code> uses internally to decide which <code>&lt;Route&gt;</code> to render. When you use
      this hook, you get back an element that will render your entire route hierarchy.
    </p>
  </main>
);
