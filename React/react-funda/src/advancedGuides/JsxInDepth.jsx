/*
JSX In Depth
Fundamentally, JSX just provides syntactic sugar for the 
React.createElement(component, props, ...children) function. 
The JSX code:

<MyButton color="blue" shadowSize={2}>
          Click Me
</MyButton>

compiles into:
React.createElement(
          MyButton,
          {color: 'blue', shadowSize: 2},
          'Click Me'
)

You can also use the self-closing form of the tag if there are no children. So:

<div className="sidebar" />

compiles into:
React.createElement(
          'div',
          {className: 'sidebar'}
)


-: Specifying The React Element Type
The first part of a JSX tag determines the type of the React element.

Capitalized types indicate that the JSX tag is referring to a React 
component. These tags get compiled into a direct reference to the 
named variable, so if you use the JSX <Foo /> expression, Foo 
must be in scope.

React Must Be in Scope
Since JSX compiles into calls to React.createElement, the React 
library must also always be in scope from your JSX code.

For example, both of the imports are necessary in this code, even 
though React and CustomButton are not directly referenced from 
JavaScript:

import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
          // return React.createElement(CustomButton, {color: 'red'}, null);
          return <CustomButton color="red" />;
}

If you don’t use a JavaScript bundler and loaded React from a 
<script> tag, it is already in scope as the React global.


-: Using Dot Notation for JSX Type
You can also refer to a React component using dot-notation from 
within JSX. This is convenient if you have a single module that 
exports many React components. For example, if 
MyComponents.DatePicker is a component, you can use it 
directly from JSX with:

import React from 'react';

const MyComponents = {

          DatePicker: function DatePicker(props) {
                    return (
                                        <div>
                                                  Imagine a {props.color} datepicker here.
                                        </div>
                    )
          }
}

function BlueDatePicker() {
          return <MyComponents.DatePicker color="blue" />;
}


-: User-Defined Components Must Be Capitalized
When an element type starts with a lowercase letter, it refers 
to a built-in component like <div> or <span> and results in 
a string 'div' or 'span' passed to React.createElement. Types 
that start with a capital letter like <Foo /> compile to 
React.createElement(Foo) and correspond to a component 
defined or imported in your JavaScript file.

We recommend naming components with a capital letter. If you 
do have a component that starts with a lowercase letter, assign 
it to a capitalized variable before using it in JSX.

For example, this code will not run as expected:

import React from 'react';

// Wrong! This is a component and should have been capitalized:
function hello(props) {
          // Correct! This use of <div> is legitimate because div is a valid HTML tag:
          return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
          // Wrong! React thinks <hello /> is an HTML tag because it's not capitalized:
          return <hello toWhat="World" />;
}

To fix this, we will rename hello to Hello and use <Hello /> when referring to it:

import React from 'react';

// Correct! This is a component and should be capitalized:
function Hello(props) {
          // Correct! This use of <div> is legitimate because div is a valid HTML tag:
          return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
          // Correct! React knows <Hello /> is a component because it's capitalized.
          return <Hello toWhat="World" />;
}


-: Choosing the Type at Runtime
You cannot use a general expression as the React element type. If you 
do want to use a general expression to indicate the type of the element, 
just assign it to a capitalized variable first. This often comes up when 
you want to render a different component based on a prop:

import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
          photo: PhotoStory,
          video: VideoStory
};

function Story(props) {
          // Wrong! JSX type can't be an expression.
          return <components[props.storyType] story={props.story} />;
}

To fix this, we will assign the type to a capitalized variable first:

import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
          photo: PhotoStory,
          video: VideoStory
};

function Story(props) {
          // Correct! JSX type can be a capitalized variable.
          const SpecificStory = components[props.storyType];
          
          return <SpecificStory story={props.story} />;
}


-: JavaScript Expressions as Props
You can pass any JavaScript expression as a prop, by surrounding 
it with {}. For example, in this JSX:

<MyComponent foo={1 + 2 + 3 + 4} />

For MyComponent, the value of props.foo will be 10 because the 
expression 1 + 2 + 3 + 4 gets evaluated.

if statements and for loops are not expressions in JavaScript, so they 
can’t be used in JSX directly. Instead, you can put these in the 
surrounding code. For example:

function NumberDescriber(props) {
          let description;

          if (props.number % 2 == 0) {
                    description = <strong>even</strong>;
          } else {
                    description = <i>odd</i>;
          }

          return <div>{props.number} is an {description} number</div>;
}


-: String Literals
You can pass a string literal as a prop. These two JSX expressions 
are equivalent:

<MyComponent message="hello world" />

<MyComponent message={'hello world'} />

When you pass a string literal, its value is HTML-unescaped. So 
these two JSX expressions are equivalent:

<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />





*/

// import React from 'react';

// const MyComponents = {

//           DatePicker: function DatePicker(props) {
//                     return (
//                                         <div>
//                                                   Imagine a {props.color} datepicker here.
//                                         </div>
//                     )
//           }
// }

// function BlueDatePicker() {
//           return <MyComponents.DatePicker color="blue" />;
// }

// export default BlueDatePicker;
