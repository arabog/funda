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
                                                            style={{color}}
                                                            onChange={handleColorChange}
                                                  >
                                                            <option value=""></option>
                                                            {colorOptions}
                                                  </select>
                                                  
                                                  {/* <button className='destroy' onClick={onDelete}><TimesSolid /></button> */}

                                                  <button className='destroy' onClick={onDelete}>
                                                            <i data-fa-symbol="delete" class="fas fa-trash fa-fw"></i>
                                                  </button>
                                        </div>
                              </div>          
                    </li>
          )
}

export default TodoListItem