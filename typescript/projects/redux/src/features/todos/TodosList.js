import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';

// const selectedTodos = state => state.todos

// const allTodos = state => state.todos;
const selectedTodosId = state => state.todos.map(todo => todo.id)

const TodosList = () => {
          // let todos = useSelector(allTodos);
          
          // function sortTodo(a, b) {
          //           return (b.id - a.id)
          // }

          // todos = todos.sort(sortTodo);

          let todosIds = useSelector(selectedTodosId, shallowEqual);

          function sortTodo(a, b) {
                    return (b - a)
          }

          todosIds = todosIds.sort(sortTodo);
          
           // since `todos` is an array, we can loop over it
          // const renderedListItems = todos.map((todo) => {
          const renderedListItems = todosIds.map((todoId) => {
                    return (
                              <TodoListItem
                                        key={todoId}
                                        // todo={todo}
                                        id={todoId}
                              />
                    )
          })

          return (
                    <ul className='todo-list'>
                              {renderedListItems}
                    </ul>
          )
}


export default TodosList