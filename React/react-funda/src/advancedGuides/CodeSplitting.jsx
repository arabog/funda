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






