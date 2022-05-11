import React from 'react'
import TodoListItem from './TodoListItem';


const TodosList = () => {
          const todos = [];

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