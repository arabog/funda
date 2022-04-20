/*
React Without ES6
Normally you would define a React component as a plain JavaScript class:

function Greeting() {
          return <h1>Hello, {this.props.name}</h1>;
}

class Greeting extends React.Component {
          render() {
                    return <h1>Hello, {this.props.name}</h1>;
          }                 
}

If you don’t use ES6 yet, you may use the create-react-class module instead:

var createReactClass = require('create-react-class');

var Greeting = createReactClass({
          render: function() {
                    return <h1>Hello, {this.props.name}</h1>;
          }
});

The API of ES6 classes is similar to createReactClass() with a few exceptions.


-: Declaring Default Props
With functions and ES6 classes, defaultProps is defined as a property on the 
component itself:

class Greeting extends React.Component {
          // ...
}

Greeting.defaultProps = {
          name: 'Mary'
};

With createReactClass(), you need to define getDefaultProps() as a function 
on the passed object:

var Greeting = createReactClass({
          getDefaultProps: function() {
                    return {
                              name: 'Mary'
                    };
          },

          // ...
});







*/