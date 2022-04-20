/*
React Without JSX
JSX is not a requirement for using React. Using React without JSX is 
especially convenient when you don’t want to set up compilation in 
your build environment.

Each JSX element is just syntactic sugar for calling 
React.createElement(component, props, ...children). So, anything 
you can do with JSX can also be done with just plain JavaScript.

For example, this code written with JSX:

function Hello() {
          return <div>Hello {this.props.toWhat}</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />);

can be compiled to this code that does not use JSX:

function Hello() {
          return React.createElement('div', null, `Hello ${this.props.toWhat}`);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'World'}, null));

The component can either be provided as a string, as a subclass of 
React.Component, or a plain function.

If you get tired of typing React.createElement so much, one common 
pattern is to assign a shorthand:

const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Hello World'));




*/