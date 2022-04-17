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

We will implement it as an uncontrolled component for simplicity.

First, we will create an empty component with a render() method where 
we return <select> wrapped in a <div>:

class Chosen extends React.Component {
          render() {
                    return (
                              <div>
                                        <select className="Chosen-select" ref={el => this.el = el}>
                                                  {this.props.children}
                                        </select>
                              </div>
                    );
          }
}

Notice how we wrapped <select> in an extra <div>. This is necessary 
because Chosen will append another DOM element right after the 
<select> node we passed to it. However, as far as React is concerned, 
<div> always only has a single child. This is how we ensure that React 
updates won’t conflict with the extra DOM node appended by Chosen. 
It is important that if you modify the DOM outside of React flow, you 
must ensure React doesn’t have a reason to touch those DOM nodes.

Next, we will implement the lifecycle methods. We need to initialize 
Chosen with the ref to the <select> node in componentDidMount, 
and tear it down in componentWillUnmount:

componentDidMount() {
          this.$el = $(this.el);
          this.$el.chosen();
}

componentWillUnmount() {
          this.$el.chosen('destroy');
}

Note that React assigns no special meaning to the this.el field. It only 
works because we have previously assigned this field from a ref in the 
render() method:

<select className="Chosen-select" ref={el => this.el = el}>

This is enough to get our component to render, but we also want to 
be notified about the value changes. To do this, we will subscribe to 
the jQuery change event on the <select> managed by Chosen.

We won’t pass this.props.onChange directly to Chosen because component’s 
props might change over time, and that includes event handlers. Instead, 
we will declare a handleChange() method that calls this.props.onChange, 
and subscribe it to the jQuery change event:

componentDidMount() {
          this.$el = $(this.el);
          this.$el.chosen();

          this.handleChange = this.handleChange.bind(this);
          this.$el.on('change', this.handleChange);
}

componentWillUnmount() {
          this.$el.off('change', this.handleChange);
          this.$el.chosen('destroy');
}

handleChange(e) {
          this.props.onChange(e.target.value);
}

Finally, there is one more thing left to do. In React, props can change over 
time. For example, the <Chosen> component can get different children if 
parent component’s state changes. This means that at integration points it 
is important that we manually update the DOM in response to prop updates, 
since we no longer let React manage the DOM for us.

Chosen’s documentation suggests that we can use jQuery trigger() API 
to notify it about changes to the original DOM element. We will let 
React take care of updating this.props.children inside <select>, but 
we will also add a componentDidUpdate() lifecycle method that 
notifies Chosen about changes in the children list:

componentDidUpdate(prevProps) {
          if (prevProps.children !== this.props.children) {
                    this.$el.trigger("chosen:updated");
          }
}

This way, Chosen will know to update its DOM element when the 
<select> children managed by React change.

The complete implementation of the Chosen component looks like this:



*/ 


