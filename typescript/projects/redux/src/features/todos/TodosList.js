import React from 'react'
import { useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';

const selectedTodos = state => state.todos


const TodosList = () => {
          const todos = useSelector(selectedTodos);
          console.log(todos)
          
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