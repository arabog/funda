import React from 'react'
import { useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';

const selectedTodos = state => state.todos


const TodosList = () => {
          let todos = useSelector(selectedTodos);

          function sortTodo(a, b) {
                    return (b.id - a.id)
          }

          todos = todos.sort(sortTodo);
          
           // since `todos` is an array, we can loop over it
          const renderedListItems = todos.map((todo) => {
                    return (
                              <TodoListItem
                                        key={todo.id}
                                        todo={todo}
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