// /*
State and Lifecycle
Consider the ticking clock example from one of the previous sections. 
In Rendering Elements, we have only learned one way to update the UI. 
We call ReactDOM.render() to change the rendered output:

function tick() {
          const element = (
                    <div>
                              <h1>Hello, world!</h1>
                              <h2>It is {new Date().toLocaleTimeString()}.</h2>
                    </div>
          );

          ReactDOM.render(
                    element,
                    document.getElementById('root')
          );
}

setInterval(tick, 1000);

In this section, we will learn how to make the Clock component 
truly reusable and encapsulated. It will set up its own timer and 
update itself every second.

We can start by encapsulating how the clock looks:
function Clock(props) {
          return (
                    <div>
                              <h1>Hello, world!</h1>
                              <h2>It is {props.date.toLocaleTimeString()}.</h2>
                    </div>
          );
}

function tick() {
          ReactDOM.render(
                    <Clock date={new Date()} />,

                    document.getElementById('root')
          );
}

setInterval(tick, 1000);

