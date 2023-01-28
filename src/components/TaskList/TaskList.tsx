import PropTypes from 'prop-types'

import { Todo } from '../../@types/todo.type'
import { todoProptypes } from '../../PropTypes/todo.proptype'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: Boolean
  todos: Todo[]
  handleChangeStatus: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleChangeStatus, startEditTodo, deleteTodo } = props

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeStatus(todo.id, !todo.done)}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                🖊️
              </button>
              <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList

// Check type when run

TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(todoProptypes),
  handleChangeStatus: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}
