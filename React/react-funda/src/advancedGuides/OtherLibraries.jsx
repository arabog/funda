/*
-: Integrating with Other Libraries
React can be used in any web application. It can be embedded in 
other applications and, with a little care, other applications can 
be embedded in React. This guide will examine some of the more 
common use cases, focusing on integration with jQuery and Backbone, 
but the same ideas can be applied to integrating components with 
any existing code.


-: Integrating with DOM Manipulation Plugins
React is unaware of changes made to the DOM outside of React. It 
determines updates based on its own internal representation, and 
if the same DOM nodes are manipulated by another library, React 
gets confused and has no way to recover.

This does not mean it is impossible or even necessarily difficult 
to combine React with other ways of affecting the DOM, you just 
have to be mindful of what each is doing.

The easiest way to avoid conflicts is to prevent the React component 
from updating. You can do this by rendering elements that React has 
no reason to update, like an empty <div />.





*/ 