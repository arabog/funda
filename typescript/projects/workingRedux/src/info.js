/*
-: Action Creators
In our app, we've been writing action objects directly in the code, 
where they're being dispatched:

dispatch({ type: 'todos/todoAdded', payload: trimmedText })

An action creator is a function that creates and returns an action 
object. We typically use these so we don't have to write the action 
object by hand every time:

const todoAdded = text = {
          return {
                    type: 'todos/todoAdded',
                    payload: text,
          }
}

We then use them by calling the action creator, and then passing 
the resulting action object directly to dispatch:

store.dispatch(todoAdded('Buy Milk'));

console.log(store.getState().todos)



-: Memoized Selectors
We've already seen that we can write "selector" functions, which 
accept the Redux state object as an argument, and return a value:

const selectedTodos = state => state.todos;

What if we need to derive some data? For example, maybe we 
want to have an array of only the todo IDs:

const selectedTodoIds = state => state.todos.map(todo => todo.id)

However, array.map() always returns a new array reference. We know 
that the React-Redux useSelector hook will re-run its selector function 
after every dispatched action, and if the selector result changes, it will 
force the component to re-render.

In this example, calling useSelector(selectTodoIds) will always cause 
the component to re-render after every action, because it's returning 
a new array reference!

In Part 5, we saw that we can pass shallowEqual as an argument to 
useSelector. There's another option here, though: we could use 
"memoized" selectors.

Memoization is a kind of caching - specifically, saving the results of 
an expensive calculation, and reusing those results if we see the 
same inputs later.

Memoized selector functions are selectors that save the most recent 
result value, and if you call them multiple times with the same inputs, 
will return the same result value. If you call them with different inputs 
than last time, they will recalculate a new result value, cache it, and 
return the new result.







-: 
*/
