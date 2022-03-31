/*
Thinking in React
React is, in our opinion, the premier way to build big, fast 
Web apps with JavaScript. It has scaled very well for us at 
Facebook and Instagram.

One of the many great parts of React is how it makes you 
think about apps as you build them. In this document, we’ll 
walk you through the thought process of building a searchable 
product data table using React.

Step 1: Break The UI Into A Component Hierarchy
But how do you know what should be its own component? 
Use the same techniques for deciding if you should create 
a new function or object. One such technique is the single 
responsibility principle, that is, a component should ideally 
only do one thing. If it ends up growing, it should be 
decomposed into smaller subcomponents.

Separate your UI into components, where each component 
matches one piece of your data model.

Components that appear within another component in the 
should appear as a child in the hierarchy:

Step 2: Build A Static Version in React
Now that you have your component hierarchy, it’s time to 
implement your app. The easiest way is to build a version 
that takes your data model and renders the UI but has no 
interactivity. It’s best to decouple these processes because 
building a static version requires a lot of typing and no 
thinking, and adding interactivity requires a lot of thinking 
and not a lot of typing. 

To build a static version of your app that renders your data 
model, you’ll want to build components that reuse other 
components and pass data using props. props are a way of 
passing data from parent to child. If you’re familiar with 
the concept of state, don’t use state at all to build this 
static version. State is reserved only for interactivity, that is, 
data that changes over time. Since this is a static version of 
the app, you don’t need it.

You can build top-down or bottom-up. That is, you can either 
start with building the components higher up in the hierarchy 
(i.e. starting with FilterableProductTable) or with the ones 
lower in it (ProductRow). In simpler examples, it’s usually 
easier to go top-down, and on larger projects, it’s easier to 
go bottom-up and write tests as you build.

At the end of this step, you’ll have a library of reusable 
components that render your data model. The components 
will only have render() methods since this is a static version 
of your app. The component at the top of the hierarchy 
(FilterableProductTable) will take your data model as a prop. 
If you make a change to your underlying data model and call 
root.render() again, the UI will be updated. You can see how 
your UI is updated and where to make changes. React’s 
one-way data flow (also called one-way binding) keeps 
everything modular and fast.


*/ 