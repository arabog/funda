// /*

Code-Splitting
Bundling
Most React apps will have their files “bundled” using tools 
like Webpack, Rollup or Browserify. Bundling is the process 
of following imported files and merging them into a single file: 
a “bundle”. This bundle can then be included on a webpage to 
load an entire app at once.

Example
App:

// app.js
import { add } from './math.js';

console.log(add(16, 26)); // 42

// math.js
export function add(a, b) {
          return a + b;
}


Bundle:
function add(a, b) {
          return a + b;
}

console.log(add(16, 26)); // 42

If you’re using Create React App, Next.js, Gatsby, or a similar 
tool, you will have a Webpack setup out of the box to bundle 
your app.


Code Splitting
Bundling is great, but as your app grows, your bundle will grow 
too. Especially if you are including large third-party libraries. 
You need to keep an eye on the code you are including in your 
bundle so that you don’t accidentally make it so large that your 
app takes a long time to load.

To avoid winding up with a large bundle, it’s good to get ahead 
of the problem and start “splitting” your bundle. Code-Splitting 
is a feature supported by bundlers like Webpack, Rollup and 
Browserify (via factor-bundle) which can create multiple bundles 
that can be dynamically loaded at runtime.

Code-splitting your app can help you “lazy-load” just the things 
that are currently needed by the user, which can dramatically 
improve the performance of your app. While you haven’t reduced 
the overall amount of code in your app, you’ve avoided loading 
code that the user may never need, and reduced the amount of code 
needed during the initial load.


import()
The best way to introduce code-splitting into your app is through 
the dynamic import() syntax.

Before:
import { add } from './math';

console.log(add(16, 26));

After:
import("./math").then(math => {
          console.log(math.add(16, 26));
});

When Webpack comes across this syntax, it automatically starts 
code-splitting your app. If you’re using Create React App, this 
is already configured for you and you can start using it immediately. 
It’s also supported out of the box in Next.js.






