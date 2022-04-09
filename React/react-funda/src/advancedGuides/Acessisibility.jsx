/*Accessibility
Why Accessibility?
Web accessibility (also referred to as a11y) is the design and creation 
of websites that can be used by everyone. Accessibility support is 
necessary to allow assistive technology to interpret web pages.

React fully supports building accessible websites, often by using 
standard HTML techniques.


-: WAI-ARIA
The Web Accessibility Initiative - Accessible Rich Internet Applications 
document contains techniques for building fully accessible JavaScript 
widgets.

Note that all aria-* HTML attributes are fully supported in JSX. 
Whereas most DOM properties and attributes in React are 
camelCased, these attributes should be hyphen-cased (also 
known as kebab-case, lisp-case, etc) as they are in plain HTML:

<input
          aria-label={labelText}
          aria-required="true"
          
          type="text"
          name="name"

          value={inputValue}
          onChange={onchangeHandler}
/>


-: Semantic HTML
Semantic HTML is the foundation of accessibility in a web application. 
Using the various HTML elements to reinforce the meaning of information 
in our websites will often give us accessibility for free.

Sometimes we break HTML semantics when we add <div> elements to 
our JSX to make our React code work, especially when working with 
lists (<ol>, <ul> and <dl>) and the HTML <table>. In these cases we 
should rather use React Fragments to group together multiple elements.

For example,

import React, { Fragment } from 'react';

function ListItem({ item }) {
          return (
                    <Fragment>
                              <dt>{item.term}</dt>
                              <dd>{item.description}</dd>
                    </Fragment>
          );
}

function Glossary(props) {
          return (
                    <dl>
                              {props.items.map(item => (
                                        <ListItem item={item} key={item.id} />
                              ))}
                    </dl>
          );
}


You can map a collection of items to an array of fragments as you 
would any other type of element as well:

function Glossary(props) {
          return (
                    <dl>
                              {props.items.map(item => (
                                        // Fragments should also have a `key` prop when mapping collections
                                        <Fragment key={item.id}>
                                                  <dt>{item.term}</dt>
                                                  <dd>{item.description}</dd>
                                        </Fragment>
                              ))}
                    </dl>
          );
}

When you don’t need any props on the Fragment tag you can use 
the short syntax, if your tooling supports it:

function ListItem({ item }) {
          return (
                    <>
                              <dt>{item.term}</dt>
                              <dd>{item.description}</dd>
                    </>
          );
}


-: Accessible Forms
Labeling
Every HTML form control, such as <input> and <textarea>, needs 
to be labeled accessibly. We need to provide descriptive labels that 
are also exposed to screen readers.

Although these standard HTML practices can be directly used in 
React, note that the for attribute is written as htmlFor in JSX:

<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>

Also use landmark elements and roles, such as <main> and 
<aside>, to demarcate page regions as assistive technology 
allow the user to quickly navigate to these sections.

To set focus in React, we can use Refs to DOM elements.

import React, {useRef} from 'react'

const CustomTextInput = (props) => {
          const textInput = useRef();

          // Use the `ref` callback to store a reference to the text input DOM
          // element in an instance field (for example, textInput).
          return (
                    <input 
                              type='text'
                              ref={textInput}
                    />
          )
}

export default CustomTextInput;

// Then we can focus it elsewhere in our component when needed:

focus() {
          // Explicitly focus the text input using the raw DOM API
          // Note: we're accessing "current" to get the DOM node
          textInput.current.focus();
}

Sometimes a parent component needs to set focus to an element 
in a child component. We can do this by exposing DOM refs 
to parent components through a special prop on the child 
component that forwards the parent’s ref to the child’s DOM node.

function CustomTextInput(props) {
          return (
                    <div>
                              <input 
                                        ref={props.inputRef} 
                              />
                    </div>
          );
}

const Parent = (props) => {
          const inputElement = useRef();

          return (
                    <CustomTextInput 
                              inputRef={inputElement} 
                    />
          );
}

// Now you can set focus when required.
inputElement.current.focus();

export default Parent;


-: Mouse and pointer events
Ensure that all functionality exposed through a mouse or 
pointer event can also be accessed using the keyboard 
alone. Depending only on the pointer device will lead to 
many cases where keyboard users cannot use your 
application.

This is the outside click pattern, where a user can disable 
an opened popover by clicking outside the element.

This is typically implemented by attaching a click event to 
the window object that closes the popover:

import React, { useEffect, useRef, useState } from 'react'

const OuterClickExample = () => {
          const [isOpen, setIsOpen] = useState(false);

          const toggleContainer = useRef();

          const onClickHandler = () => {
                    setIsOpen(!isOpen);
          }

          const onClickOutsideHandler = (event) => {

                    if(isOpen && !toggleContainer.current.contains(event.target)) {
                              setIsOpen(false)
                    }

          }
          
          useEffect(() => {
                    window.addEventListener('click', (e) => onClickOutsideHandler(e));
          });

          useEffect(() => {
                    window.removeEventListener('click', (e) => onClickOutsideHandler(e));
          });


          return (
                    <div ref={toggleContainer}>
                              <button onClick = {onClickHandler}> Select an option </button>
                              
                              {
                                        isOpen && (
                                                  <ul>
                                                            <a href='https://www.google.com'><li> Option 1</li></a>
                                                            <li> Option 2</li>
                                                            <li> Option 3</li>
                                                  </ul>
                                        )
                              }
                    </div>
          )
}


export default OuterClickExample;

This may work fine for users with pointer devices, such as a mouse, 
but operating this with the keyboard alone leads to broken functionality 
when tabbing to the next element as the window object never receives 
a click event. This can lead to obscured functionality which blocks users 
from using your application.

The same functionality can be achieved by using appropriate event 
handlers instead, such as onBlur and onFocus:


import React, { useState } from 'react'

const BlurExample = () => {
          const [isOpen, setIsOpen] = useState(false);
          const [timeOutId, setTimeOutId] = useState(null);

          const onClickHandler = () => {
                    setIsOpen(!isOpen);
          }

          // We close the popover on the next tick by using setTimeout.
          // This is necessary because we need to first check if
          // another child of the element has received focus as
          // the blur event fires prior to the new focus event.
          const onBlurHandler = () => {
                    setTimeOutId(
                              setTimeout(() => {
                                        setIsOpen(false);
                              })
                    )
          }

          // If a child receives focus, do not close the popover.
          const onFocusHandler = () => {
                    clearTimeout(timeOutId);
          }

          
          // React assists us by bubbling the blur and
          // focus events to the parent.
          return (
                    <div 
                              onBlur={onBlurHandler}
                              onFocus={onFocusHandler}
                    >
                              <button 
                                        onClick={onClickHandler}
                                        aria-haspopup='true'
                                        aria-expanded={isOpen}
                              >
                                        Select an option
                              </button>

                              {
                                        isOpen && (
                                                  <ul>
                                                            <a href='https://www.google.com'><li> Option 1</li></a>
                                                            <li> Option 2</li>
                                                            <li> Option 3</li>
                                                  </ul>
                                        )
                              }
                    </div>
          )
}


export default BlurExample

This code exposes the functionality to both pointer device and 
keyboard users. Also note the added aria-* props to support 
screen-reader users. 

Create React App has this plugin with a subset of rules activated. 
If you want to enable even more accessibility rules, you can create 
an .eslintrc file in the root of your project with this content:

{
          "extends": ["react-app", "plugin:jsx-a11y/recommended"],
          "plugins": ["jsx-a11y"]
}


*/