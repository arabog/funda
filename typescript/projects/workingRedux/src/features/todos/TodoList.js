import { selectTodoIds } from './todosSlice'



const todoIds = useSelector(selectTodoIds)

const loadingStatus = useSelector(state => state.todos.status)

if (loadingStatus === 'loading') {
          return (
                    <div className="todo-list">
                              <div className="loader" />
                    </div>
          )
}