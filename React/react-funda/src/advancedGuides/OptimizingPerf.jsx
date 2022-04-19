/*
Optimizing Performance
Internally, React uses several clever techniques to minimize the 
number of costly DOM operations required to update the UI. 
For many applications, using React will lead to a fast user 
interface without doing much work to specifically optimize for 
performance. Nevertheless, there are several ways you can speed 
up your React application.


-: Use the Production Build
If you’re benchmarking or experiencing performance problems 
in your React apps, make sure you’re testing with the minified 
production build.

By default, React includes many helpful warnings. These warnings 
are very useful in development. However, they make React larger 
and slower so you should make sure to use the production version 
when you deploy the app.

If you aren’t sure whether your build process is set up correctly, 
you can check it by installing React Developer Tools for Chrome. 
If you visit a site with React in production mode, the icon will have 
a dark background:

If you visit a site with React in development mode, the icon will 
have a red background:

It is expected that you use the development mode when working 
on your app, and the production mode when deploying your app 
to the users.


-: Create React App
If your project is built with Create React App, run:

npm run build

This will create a production build of your app in the build/ folder 
of your project.

Remember that this is only necessary before deploying to production. 
For normal development, use npm start.


Single-File Builds
We offer production-ready versions of React and React DOM as single files:

<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

Remember that only React files ending with .production.min.js are suitable for production.


-: Virtualize Long Lists
If your application renders long lists of data (hundreds or thousands of rows), we 
recommend using a technique known as “windowing”. This technique only renders 
a small subset of your rows at any given time, and can dramatically reduce the time 
it takes to re-render the components as well as the number of DOM nodes created.

react-window and react-virtualized are popular windowing libraries. They 
provide several reusable components for displaying lists, grids, and tabular 
data. You can also create your own windowing component, like Twitter did, 
if you want something more tailored to your application’s specific use case.



import React from 'react';
import ReactDOM from 'react-dom';
import { FixedSizeList as List } from 'react-window';

import './styles.css';

const Row = ({ index, style }) => (
          <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
                    Row {index}
          </div>
);

const Example = () => (
          <List
                    className="List"
                    height={150}
                    itemCount={1000}
                    itemSize={35}
                    width={300}
          >
                    {Row}
          </List>
);

ReactDOM.render(<Example />, document.getElementById('root'));

import { FixedSizeList as List } from 'react-window';
 
const Column = ({ index, style }) => (
          <div style={style}>Column {index}</div>
);
 
const Example = () => (
          <List
                    height={75}
                    itemCount={1000}
                    itemSize={100}
                    layout="horizontal"
                    width={300}
          >
                    {Column}
          </List>
);


-: Avoid Reconciliation
When a component’s props or state change, React decides whether 
an actual DOM update is necessary by comparing the newly returned 
element with the previously rendered one. When they are not equal, 
React will update the DOM.

Even though React only updates the changed DOM nodes, re-rendering 
still takes some time. In many cases it’s not a problem, but if the slowdown 
is noticeable, you can speed all of this up by overriding the lifecycle 
function shouldComponentUpdate, which is triggered before the 
re-rendering process starts. The default implementation of this function 
returns true, leaving React to perform the update:

If you know that in some situations your component doesn’t need to update, 
you can return false from shouldComponentUpdate instead, to skip the 
whole rendering process, including calling render() on this component 
and below.














*/
