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


-: 


*/
