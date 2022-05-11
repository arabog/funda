/*
import React from 'react'
// import { ReactComponent as TimesSolid } from './times-solid.svg'
import { availableColors, capitalize } from '../filters/colors'


const TodoListItem = ({ todo, onColorChange, onCompletedChange, onDelete }) => {
          const {text, completed, color} = todo;

          const handleCompletedChanged = (e) => {
                    onCompletedChange(e.target.checked);
          }

          const handleColorChange = (e) => {
                    onColorChange(e.target.checked);
          }

          const colorOptions = availableColors.map((c) => (
                    <option key={c} value={c}>
                              {capitalize(c)}
                    </option>
          ))


          return (
                    <li>
                              <idv className='view'>
                                        <div className='segment label'>
                                                  <input 
                                                            className='toggle'
                                                            type='checkbox'
                                                            checked={completed}
                                                            onChange={handleCompletedChanged}
                                                  />
                                                  
                                                  <div className='todo-text' >{text}</div>

                                                  <div className='segment buttons'>
                                                            <select 
                                                                      className='colorPicker'
                                                                      value={color}
                                                                      style={{color}} //style={{color: color}}
                                                                      onChange={handleColorChange}
                                                            >
                                                                      <option value=""></option>
                                                                      {colorOptions}
                                                            </select>
                                                            
                                                            // <button className='destroy' onClick={onDelete}><TimesSolid /></button>

                                                            <button className='destroy' onClick={onDelete}>
                                                                      <i data-fa-symbol="delete" class="fas fa-trash fa-fw"></i>
                                                            </button>
                                                  </div>
                                        </div>  
                              </idv>
                    </li>
          )
}

export default TodoListItem
*/



import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { availableColors, capitalize } from '../filters/colors'


const selectTodoById = (state, todoId) => {
          return state.todos.find(todo => todo.id === todoId)
}


// Destructure `props.id`, since we only need the ID value
const TodoListItem = ({ id }) => {

          // Call our `selectTodoById` with the state _and_ the ID value
          const todo = useSelector(state => selectTodoById(state, id));

          const { text, completed, color } = todo;

          const dispatch = useDispatch()

          const handleCompletedChanged = () => {
                    dispatch({ type: 'todos/todoToggled', payload: todo.id })
          }

          
          const handleColorChange = (e) => {
                    const color = e.target.value;

                    dispatch({
                              type: 'todos/colorSelected',
                              payload: {todoId: todo.id, color}
                    })
          }

          const onDelete = () => {
                    dispatch({type: 'todos/todoDeleted', payload: todo.id})
          }

          const colorOptions = availableColors.map(c => (
                    <option key={c} value={c}>
                              {capitalize(c)}
                    </option>
          ));


          return (
                    <li>
                              <div className='view'>
                                        <div className='segment label'>
                                                  <input 
                                                            className='toggle'
                                                            type= 'checkbox'
                                                            checked={completed}
                                                            onChange = {handleCompletedChanged}
                                                  />

                                                  <div className='todo-text'>{text ? text : ''}</div>

                                        </div>
                                                  
                                        <div className='segment -button'>
                                                  <select
                                                            className='colorPicker'
                                                            value={color}
                                                            onChange = {handleColorChange}
                                                            style = {{color}}
                                                  >
                                                            <option value= ''></option>
                                                            {colorOptions}
                                                  </select>
                                        </div>

                                        <button className='destroy' onClick={onDelete} >
                                                  <i class="fa-solid fa-trash"></i>
                                        </button>
                              </div>
                    </li>
          )
}

export default TodoListItem

