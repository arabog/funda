/*
Hooks API Reference
Hooks are a new addition in React 16.8. They let you use state and other 
React features without writing a class.

Basic Hooks
useState
const [state, setState] = useState(initialState);
Returns a stateful value, and a function to update it.

During the initial render, the returned state (state) is the same as the value 
passed as the first argument (initialState).

The setState function is used to update the state. It accepts a new state value 
and enqueues a re-render of the component.

setState(newState);

During subsequent re-renders, the first value returned by useState will 
always be the most recent state after applying updates.

Functional updates
If the new state is computed using the previous state, you can pass a 
function to setState. The function will receive the previous value, and 
return an updated value. Here’s an example of a counter component 
that uses both forms of setState:


function Counter({initialCount}) {
          const [count, setCount] = useState(initialCount);
          
          return (
                    <>
                              Count: {count}

                              <button onClick={() => setCount(initialCount)}>Reset</button>

                              <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>

                              <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
                    </>
          );
}

The ”+” and ”-” buttons use the functional form, because the 
updated value is based on the previous value. But the “Reset” 
button uses the normal form, because it always sets the count 
back to the initial value.

If your update function returns the exact same value as the current 
state, the subsequent rerender will be skipped completely.

Note
Unlike the setState method found in class components, useState 
does not automatically merge update objects. You can replicate 
this behavior by combining the function updater form with 
object spread syntax:

const [state, setState] = useState({});

setState(prevState => {
          // Object.assign would also work
          return {...prevState, ...updatedValues};
});

Another option is useReducer, which is more suited for managing 
state objects that contain multiple sub-values.

Lazy initial state
The initialState argument is the state used during the initial render. 
In subsequent renders, it is disregarded. If the initial state is the 
result of an expensive computation, you may provide a function 
instead, which will be executed only on the initial render:

const [state, setState] = useState(() => {
          const initialState = someExpensiveComputation(props);

          return initialState;
});


-: useEffect
useEffect(didUpdate);

By default, effects run after every completed render, but you can 
choose to fire them only when certain values have changed.

Cleaning up an effect
Often, effects create resources that need to be cleaned up before 
the component leaves the screen, such as a subscription or timer 
ID. To do this, the function passed to useEffect may return a 
clean-up function. For example, to create a subscription:

useEffect(() => {
          const subscription = props.source.subscribe();

          return () => {
                    // Clean up the subscription
                    subscription.unsubscribe();
          };
});

The clean-up function runs before the component is removed from 
the UI to prevent memory leaks. Additionally, if a component 
renders multiple times (as they typically do), the previous effect 
is cleaned up before executing the next effect.

Conditionally firing an effect
The default behavior for effects is to fire the effect after every 
completed render. That way an effect is always recreated if 
one of its dependencies changes.

However, this may be overkill in some cases, like the subscription 
example from the previous section. We don’t need to create a new 
subscription on every update, only if the source prop has changed.

To implement this, pass a second argument to useEffect that is the 
array of values that the effect depends on. Our updated example 
now looks like this:

useEffect(
          () => {
                    const subscription = props.source.subscribe();

                    return () => {
                              subscription.unsubscribe();
                    };
          }, [props.source],
);

Now the subscription will only be recreated when props.source 
changes.

Note
If you use this optimization, make sure the array includes all values 
from the component scope (such as props and state) that change 
over time and that are used by the effect. Otherwise, your code 
will reference stale values from previous renders.

If you want to run an effect and clean it up only once (on mount and 
unmount), you can pass an empty array ([]) as a second argument. 
This tells React that your effect doesn’t depend on any values from 
props or state, so it never needs to re-run. This isn’t handled as a 
special case — it follows directly from how the dependencies array 
always works.

The array of dependencies is not passed as arguments to the effect 
function. Conceptually, though, that’s what they represent: every 
value referenced inside the effect function should also appear in 
the dependencies array.


-: useContext
const value = useContext(MyContext);

Accepts a context object (the value returned from React.createContext) 
and returns the current context value for that context. The current context 
value is determined by the value prop of the nearest <MyContext.Provider> 
above the calling component in the tree.

When the nearest <MyContext.Provider> above the component updates, 
this Hook will trigger a rerender with the latest context value passed to that 
MyContext provider. Even if an ancestor uses React.memo, a rerender 
will still happen starting at the component itself using useContext.

Don’t forget that the argument to useContext must be the context object itself:

Correct: useContext(MyContext)

Incorrect: useContext(MyContext.Consumer)
Incorrect: useContext(MyContext.Provider)

A component calling useContext will always re-render 
when the context value changes. useContext(MyContext) 
only lets you read the context and subscribe to its changes. 
You still need a <MyContext.Provider> above in the tree 
to provide the value for this context.

Putting it together with Context.Provider:

const themes = {
          light: {
                    foreground: "#000000",
                    background: "#eeeeee"
          },
          
          dark: {
                    foreground: "#ffffff",
                    background: "#222222"
          }
};

const ThemeContext = React.createContext(themes.light);

function App() {

          return (
                    <ThemeContext.Provider value={themes.dark}>       //ds will 1st be rendered
                              <Toolbar />
                    </ThemeContext.Provider>
          );
}

function Toolbar(props) {
          
          return (
                    <div>
                              <ThemedButton />
                    </div>
                    );
}

function ThemedButton() {
          const theme = useContext(ThemeContext);

          return (
                    <button style={{ background: theme.background, color: theme.foreground }}>
                              I am styled by theme context!
                    </button>
          );
}





*/