import { useEffect, useState } from 'react'

import { Todo } from '../../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

const syncTodoWithLocal = (handleNewTodo: (todos: Todo[]) => Todo[]) => {
  const todosString = localStorage.getItem('todos') || '[]'
  const todosObj: Todo[] = JSON.parse(todosString)
  const newTodosObj = handleNewTodo(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const finishTodos = todos.filter((todo) => todo.done)
  const notFinishTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos') || '[]'
    const todosObj: Todo[] = JSON.parse(todosString)

    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }

    setTodos((prev) => [...prev, todo])
    syncTodoWithLocal((todosObj: Todo[]) => [...todosObj, todo])
  }

  const handleChangeStatus = (id: string, done: boolean) => {
    const handler = (todos: Todo[]) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    }

    const newTodos = handler(todos)

    setTodos(newTodos)
    syncTodoWithLocal((todosObj) => handler(todosObj))
  }

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) setCurrentTodo(findedTodo)
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEditTodo = () => {
    if (currentTodo) {
      const handler = (todos: Todo[]) =>
        todos.map((todo) => (todo.id === currentTodo.id ? { ...todo, name: currentTodo.name } : todo))
      const newTodo = handler(todos)
      setTodos(newTodo)
      setCurrentTodo(null)
      syncTodoWithLocal((todosObj) => handler(todosObj))
    }
  }

  const deleteTodo = (id: string) => {
    const newTodo = todos.filter((todo) => todo.id !== id)
    setTodos(newTodo)
    syncTodoWithLocal((todosObj) => todosObj.filter((todo) => todo.id !== id))
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          doneTaskList
          todos={notFinishTodos}
          handleChangeStatus={handleChangeStatus}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          todos={finishTodos}
          handleChangeStatus={handleChangeStatus}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}

export default TodoList
