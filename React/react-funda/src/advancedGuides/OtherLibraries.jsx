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


-: How to Approach the Problem
To demonstrate this, let’s sketch out a wrapper for a generic jQuery plugin.

We will attach a ref to the root DOM element. Inside componentDidMount, 
we will get a reference to it so we can pass it to the jQuery plugin.

To prevent React from touching the DOM after mounting, we will return 
an empty <div /> from the render() method. The <div /> element has 
no properties or children, so React has no reason to update it, leaving the 
jQuery plugin free to manage that part of the DOM:


class SomePlugin extends React.Component {
          componentDidMount() {
                    this.$el = $(this.el);
                    this.$el.somePlugin();
          }

          componentWillUnmount() {
                    this.$el.somePlugin('destroy');
          }

          render() {
                    return <div ref={el => this.el = el} />;
          }
}


Note that we defined both componentDidMount and componentWillUnmount 
lifecycle methods. Many jQuery plugins attach event listeners to the DOM so 
it’s important to detach them in componentWillUnmount. If the plugin does 
not provide a method for cleanup, you will probably have to provide your own, 
remembering to remove any event listeners the plugin registered to prevent 
memory leaks

Integrating with jQuery Chosen Plugin
For a more concrete example of these concepts, let’s write a minimal wrapper 
for the plugin Chosen, which augments <select> inputs.

Note:
Just because it’s possible, doesn’t mean that it’s the best approach for React 
apps. We encourage you to use React components when you can. React 
components are easier to reuse in React applications, and often provide 
more control over their behavior and appearance.

First, let’s look at what Chosen does to the DOM.

If you call it on a <select> DOM node, it reads the attributes off of the original 
DOM node, hides it with an inline style, and then appends a separate DOM node 
with its own visual representation right after the <select>. Then it fires jQuery 
events to notify us about the changes.

Let’s say that this is the API we’re striving for with our <Chosen> wrapper 
React component:

function Example() {
          return (
                    <Chosen onChange={value => console.log(value)}>
                              <option>vanilla</option>
                              <option>chocolate</option>
                              <option>strawberry</option>
                    </Chosen>
          );
}



*/ 


