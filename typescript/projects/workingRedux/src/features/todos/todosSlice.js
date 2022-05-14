import { createSelector } from "reselect";

export const todosLoaded = todos => {
          return {
                    type: 'todos/todosAdded',
                    payload: todos
          }
}

// Similarly, we could shorten the plain action creators if we wanted to:

// export const todoAdded = todo => ({ type: 'todos/todoAdded', payload: todo })

// export async function fetchTodos(dispatch, getState) {
//           const response = await client.get('/fakeApi/todos');
//           dispatch(todosLoaded(response.todos))
// }

export async function fetchTodos() {
          return async function fetchTodosThunk(dispatch, getState) {
                    const response = await client.get('/fakeApi/todos');
                    dispatch(todosLoaded(response.todos))
          }
}

// Same thing as the above example!
// export const fetchTodos = () => async dispatch => {
//           const response = await client.get('/fakeApi/todos')
//           dispatch(todosLoaded(response.todos))
// }

async function saveNewTodo(text) {
          return async function saveNewTodoThunk(dispatch, getState) {
                    const initialTodo = { text };
                    const res = await client.post('/fakeApi/todos', {todo: initialTodo})

                    dispatch(todosLoaded(res.todo))
          }
}

export const selectedTodoIds = createSelector(
          // First, pass one or more "input selector" functions:
          state => state.todos,

          // Then, an "output selector" that receives all the input results as arguments
          // and returns a final result value
          todos => todos.map(todo => todo.id)
)