import { createSelector } from "reselect";
import { StatusFilters } from '../filters/filtersSlice'

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

// export const selectedFilteredTodos = createSelector(
//           // First input selector: all todos
//           state => state.todo,

//            // Second input selector: current status filter
//           state => state.filters.status.
//           // Output selector: receives both values
//           (todos, status) => {
//                     if (status === StatusFilters.All) {
//                               return todos
//                     }
//           }

//           const completedStatus = status === StatusFilters.Completed

//           // Return either active or completed todos based on filter
//           return todos.filter(todo => todo.completed === completedStatus)
// )

// We can then expand our selectFilteredTodos to also include color filtering in the selection as well:
export const selectFilteredTodos = createSelector(
          // First input selector: all todos
          selectTodos,

          // Second input selector: all filter values
          state => state.filters,

          // Output selector: receives both values
          (todos, filters) => {
                    const { status, colors } = filters

                    const showAllCompletions = status === StatusFilters.All

                    if (showAllCompletions && colors.length === 0) {
                              return todos
                    }
          
                    const completedStatus = status === StatusFilters.Completed

                    // Return either active or completed todos based on filter
                    return todos.filter(todo => {
                              const statusMatches = showAllCompletions || todo.completed === completedStatus
                              
                              const colorMatches = colors.length === 0 || colors.includes(todo.color)
                              
                              return statusMatches && colorMatches
                    })
          }
)


export const selectedFilteredTodoIds = createSelector(
          // Pass our other memoized selector as an input
          selectedFilteredTodos,

           // And derive data in the output selector
          fitteredTodos => selectedFilteredTodos.map(todo => todo.id)
)