/*
jsx
const name = "John";
const element = <h1>Hello, {name}</h1>;

Compoent contains both logic and markup
You can put any valid JavaScript expression inside the curly braces in JSX

JSX is an Expression Too
After compilation, JSX expressions become regular JavaScript function 
calls and evaluate to JavaScript objects.
This means that you can use JSX inside of if statements and for loops, 
assign it to variables, accept it as arguments, and return it from functions:

function getGreeting(user) {
          if (user) {
                    return <h1>Hello, {formatName(user)}!</h1>;
          }

          return <h1>Hello, Stranger.</h1>;
}

Specifying Attributes with JSX
You may use quotes to specify string literals as attributes:
const element = <a href="https://www.reactjs.org"> link </a>;

You may also use curly braces to embed a JavaScript expression 
in an attribute:
const element = <img src={user.avatarUrl}></img>;

You should either use quotes (for string values) or curly braces 
(for expressions), but not both in the same attribute.


Since JSX is closer to JavaScript than to HTML, React DOM uses 
camelCase property naming convention instead of HTML 
attribute names.

const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;

By default, React DOM escapes any values embedded in JSX before 
rendering them. Thus it ensures that you can never inject anything 
that’s not explicitly written in your application. Everything is 
converted to a string before being rendered. This helps prevent 
XSS (cross-site-scripting) attacks.

JSX Represents Objects
Babel compiles JSX down to React.createElement() calls.

These two examples are identical:

const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

React.createElement() performs a few checks to help you 
write bug-free code but essentially it creates an object like this:

// Note: this structure is simplified
const element = {
  type: 'h1',

  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

These objects are called “React elements”. You can think of them 
as descriptions of what you want to see on the screen. React reads 
these objects and uses them to construct the DOM and keep it up 
to date.

*/ 