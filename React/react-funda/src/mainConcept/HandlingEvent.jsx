/*
Handling Events
Handling events with React elements is very similar to 
handling events on DOM elements. There are some 
syntax differences: 
With JSX you pass a function as the event handler, 
rather than a string. 

For example, the HTML:

<button onclick="activateLasers()">
          Activate Lasers
</button>

is slightly different in React:

<button onClick={activateLasers}>
          Activate Lasers
</button>

Another difference is that you cannot return false to 
prevent default behavior in React. You must call 
preventDefault explicitly. For example, with plain 
HTML, to prevent the default form behavior of submitting, 
you can write:

<form onsubmit="console.log('You clicked submit.'); return false">
          <button type="submit">Submit</button>
</form>

In React, this could instead be:

function handleSubmit(e) {
          e.preventDefault();
          console.log('You clicked submit.');
}

When using React, you generally don’t need to call 
addEventListener to add listeners to a DOM element 
after it is created. Instead, just provide a listener when 
the element is initially rendered.

When you define a component using an ES6 class, a 
common pattern is for an event handler to be a method 
on the class. For example, this Toggle component renders 
a button that lets the user toggle between “ON” 
and “OFF” states:

class Toggle extends React.Component {
          constructor(props) {
                    super(props);
                    this.state = {isToggleOn: true};

                    // This binding is necessary to make `this` work in the callback
                    this.handleClick = this.handleClick.bind(this);
          }

          handleClick() {
                    this.setState(prevState => ({
                              isToggleOn: !prevState.isToggleOn
                    }));
          }

          render() {
                    return (
                              <button onClick={this.handleClick}>
                                        {this.state.isToggleOn ? 'ON' : 'OFF'}
                              </button>
                    );
          }
}


ReactDOM.render(
          <Toggle />,

          document.getElementById('root')
);


If you forget to bind this.handleClick and pass 
it to onClick, this will be undefined when the 
function is actually called.

Generally, if you refer to a method without () after it, 
such as onClick={this.handleClick}, you should bind 
that method.

You can use an arrow function in the callback to avoid this:

<button onClick={() => this.handleClick()}>
          Click me
</button>


The problem with this syntax is that a different callback is 
created each time the LoggingButton renders. In most 
cases, this is fine. However, if this callback is passed as 
a prop to lower components, those components might do 
an extra re-rendering. We generally recommend binding 
in the constructor 


Passing Arguments to Event Handlers
Inside a loop, it is common to want to pass an extra parameter 
to an event handler. For example, if id is the row ID, either of 
the following would work:

<button onClick={(e) => this.deleteRow(id, e)}>
          Delete Row
</button>

<button onClick={this.deleteRow.bind(this, id)}>
          Delete Row
</button>

The above two lines are equivalent.

*/ 