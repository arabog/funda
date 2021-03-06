/*
Refs and the DOM
Refs provide a way to access DOM nodes or React elements 
created in the render method.

In the typical React dataflow, props are the only way that parent 
components interact with their children. To modify a child, you 
re-render it with new props. However, there are a few cases where 
you need to imperatively modify a child outside of the typical dataflow. 
The child to be modified could be an instance of a React component, 
or it could be a DOM element. For both of these cases, React provides 
an escape hatch.


-: When to Use Refs
There are a few good use cases for refs:
Managing focus, text selection, or media playback.
Triggering imperative animations.
Integrating with third-party DOM libraries.

Avoid using refs for anything that can be done declaratively.
For example, instead of exposing open() and close() methods 
on a Dialog component, pass an isOpen prop to it.

Don’t Overuse Refs
Your first inclination may be to use refs to “make things happen” 
in your app. If this is the case, take a moment and think more 
critically about where state should be owned in the component 
hierarchy. Often, it becomes clear that the proper place to “own” 
that state is at a higher level in the hierarchy.

-: Creating Refs
Refs are created using React.createRef() and attached to React 
elements via the ref attribute. Refs are commonly assigned to an 
instance property when a component is constructed so they can 
be referenced throughout the component.

function MyComponent() {
          const myRef = useRef()
          
          return <div ref={myRef} />;
}


-: Accessing Refs
When a ref is passed to an element in render, a reference to the 
node becomes accessible at the current attribute of the ref.

const node = this.myRef.current;

The value of the ref differs depending on the type of the node:
When the ref attribute is used on an HTML element, the ref created 
in the constructor with React.createRef() receives the underlying 
DOM element as its current property.

When the ref attribute is used on a custom class component, the 
ref object receives the mounted instance of the component as 
its current.

You may not use the ref attribute on function components because 
they don’t have instances.

The examples below demonstrate the differences.

Adding a Ref to a DOM Element
This code uses a ref to store a reference to a DOM node:

function CustomTextInput() {
          const textInput = useRef();

          const focusTextInput() {
                     // Explicitly focus the text input using the raw DOM API
                    // Note: we're accessing "current" to get the DOM node

                    textInput.current.focus();
          }

          // tell React that we want to associate the <input> ref
          // with the `textInput` that we created in the constructor
          return(
                    <div>
                              <input type='text' ref={textInput} />

                              <input 
                                        type="button" 
                                        value='Focus the text input'
                                        onClick={focusTextInput}
                              />

                    </div>
          )
}

You can, however, use the ref attribute inside a function component 
as long as you refer to a DOM element or a class component:

function CustomTextInput(props) {
          // textInput must be declared here so the ref can refer to it
          const textInput = useRef(null);
          
          function handleClick() {
                    textInput.current.focus();
          }

          return (
                    <div>
                              <input
                                        type="text"
                                        ref={textInput} 
                              />
                              
                              <input
                                        type="button"
                                        value="Focus the text input"
                                        onClick={handleClick}
                              />
                    </div>
          );
}

React will assign the current property with the DOM element 
when the component mounts, and assign it back to null when 
it unmounts. ref updates happen before componentDidMount 
or componentDidUpdate lifecycle methods.

Exposing DOM Refs to Parent Components
In rare cases, you might want to have access to a child’s 
DOM node from a parent component. This is generally 
not recommended because it breaks component encapsulation, 
but it can occasionally be useful for triggering focus or 
measuring the size or position of a child DOM node.

While you could add a ref to the child component, this is not 
an ideal solution, as you would only get a component instance 
rather than a DOM node. Additionally, this wouldn’t work 
with function components.

-: Callback Refs
React also supports another way to set refs called “callback refs”, 
which gives more fine-grain control over when refs are set and unset.

Instead of passing a ref attribute created by createRef(), you 
pass a function. The function receives the React component 
instance or HTML DOM element as its argument, which can 
be stored and accessed elsewhere.

import React, {useCallback, useEffect} from 'react'

function CustomTextInput() {

          let textInput = null;
          
          function setTextInputRef(element) {
                    textInput = element
          }

          const focusTextInput = useCallback(() => {
                              if(textInput) {
                                        textInput.focus()

                              } 
                    }, [textInput]
          )

          useEffect(() => {
                    focusTextInput()
          }, [focusTextInput])

          return (
                    <div>
                              <input
                                        type="text"
                                        ref={setTextInputRef} 
                              />
                              
                              <input
                                        type="button"
                                        value="Focus the text input"
                                        onClick={focusTextInput}
                              />
                    </div>
          );
}

export default CustomTextInput

*/
