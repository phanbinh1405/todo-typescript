import { useState } from 'react'
import PropTypes from 'prop-types'

import { Todo } from '../../@types/todo.type'
import styles from './taskInput.module.scss'
import { todoProptypes } from '../../PropTypes/todo.proptype'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      editTodo('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    currentTodo ? editTodo(value) : setName(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

export default TaskInput

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([todoProptypes, PropTypes.oneOf([null])]),
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired
}
