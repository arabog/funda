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


React.lazy
The React.lazy function lets you render a dynamic import as 
a regular component.

Before:
import OtherComponent from './OtherComponent';

After:
const OtherComponent = React.lazy(() => import('./OtherComponent'));

This will automatically load the bundle containing the OtherComponent 
when this component is first rendered.

React.lazy takes a function that must call a dynamic import(). This 
must return a Promise which resolves to a module with a default 
export containing a React component.

The lazy component should then be rendered inside a Suspense component, 
which allows us to show some fallback content (such as a loading indicator) 
while we’re waiting for the lazy component to load.

import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
          return (
                    <div>
                              <Suspense fallback={<div>Loading...</div>}>
                                        <OtherComponent />
                              </Suspense>
                    </div>
          );
}

The fallback prop accepts any React elements that you want to 
render while waiting for the component to load. You can place 
the Suspense component anywhere above the lazy component. 
You can even wrap multiple lazy components with a single 
Suspense component.

import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
          return (
                    <div>
                              <Suspense fallback={<div>Loading...</div>}>
                                        <section>
                                                  <OtherComponent />
                                                  <AnotherComponent />
                                        </section>
                              </Suspense>
                    </div>
          );
}


Avoiding fallbacks
Any component may suspend as a result of rendering, even components 
that were already shown to the user. In order for screen content to always 
be consistent, if an already shown component suspends, React has to hide 
its tree up to the closest <Suspense> boundary. However, from the user’s 
perspective, this can be disorienting.

Consider this tab switcher:

import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';

const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));

function MyComponent() {
          const [tab, setTab] = React.useState('photos');
          
          function handleTabSelect(tab) {
                    setTab(tab);
          };

          return (
                    <div>
                              <Tabs onTabSelect={handleTabSelect} />

                              <Suspense fallback={<Glimmer />}>
                                        {tab === 'photos' ? <Photos /> : <Comments />}
                              </Suspense>
                    </div>
          );
}

In this example, if tab gets changed from 'photos' to 'comments', but 
Comments suspends, the user will see a glimmer. This makes sense 
because the user no longer wants to see Photos, the Comments 
component is not ready to render anything, and React needs to keep 
the user experience consistent, so it has no choice but to show 
the Glimmer above.

However, sometimes this user experience is not desirable. In particular, 
it is sometimes better to show the “old” UI while the new UI is being 
prepared. You can use the new startTransition API to make React do this:

function handleTabSelect(tab) {
          startTransition(() => {
                    setTab(tab);
          });
}

Here, you tell React that setting tab to 'comments' is not an urgent update, 
but is a transition that may take some time. React will then keep the old 
UI in place and interactive, and will switch to showing <Comments /> 
when it is ready.


Error boundaries
If the other module fails to load (for example, due to network failure), 
it will trigger an error. You can handle these errors to show a nice user 
experience and manage recovery with Error Boundaries. Once you’ve 
created your Error Boundary, you can use it anywhere above your lazy 
components to display an error state when there’s a network error.

import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
          <div>
                    <MyErrorBoundary>
                              <Suspense fallback={<div>Loading...</div>}>
                                        <section>
                                                  <OtherComponent />
                                                  <AnotherComponent />
                                        </section>
                              </Suspense>
                    </MyErrorBoundary>
          </div>
);





