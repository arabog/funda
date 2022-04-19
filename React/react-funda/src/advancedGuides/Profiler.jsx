/*
-: Introducing the React Profiler
React 16.5 adds support for a new DevTools profiler plugin. 
This plugin uses React’s experimental Profiler API to collect 
timing information about each component that’s rendered in 
order to identify performance bottlenecks in React applications. 
It will be fully compatible with our upcoming time slicing and 
suspense features.


-: Profiling an application
DevTools will show a “Profiler” tab for applications that support 
the new profiling API:
The “Profiler” panel will be empty initially. Click the record button 
to start profiling:

Once you’ve started recording, DevTools will automatically collect 
performance information each time your application renders. Use 
your app as you normally would. When you are finished profiling, 
click the “Stop” button.


-: Reading performance data
Browsing commits
Conceptually, React does work in two phases:

The render phase determines what changes need to be made to e.g. the 
DOM. During this phase, React calls render and then compares the result 
to the previous render.

The commit phase is when React applies any changes. (In the case of 
React DOM, this is when React inserts, updates, and removes DOM 
nodes.) React also calls lifecycles like componentDidMount and 
componentDidUpdate during this phase.

The DevTools profiler groups performance info by commit. Commits 
are displayed in a bar chart near the top of the profiler:

The color and height of each bar corresponds to how long that commit took 
to render. (Taller, yellow bars took longer than shorter, blue bars.)


-: Flame chart
The flame chart view represents the state of your application for a particular 
commit. Each bar in the chart represents a React component (e.g. App, Nav). 
The size and color of the bar represents how long it took to render the 
component and its children. (The width of a bar represents how much time 
was spent when the component last rendered and the color represents how 
much time was spent as part of the current commit.)

Yellow components took more time, blue components took less time, 
and gray components did not render at all during this commit.

Clicking on a component will also select it and show information in the 
right side panel which includes its props and state at the time of this 
commit. You can drill into these to learn more about what the component 
actually rendered during the commit:











*/