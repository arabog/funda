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

*/