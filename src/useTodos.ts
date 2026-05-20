import { useReducer, useCallback } from 'react'
import { todosReducer } from './todosReducer'
import type { State } from './types'

const initialState: State = []

let counter = 0
function generateId(): string {
  return `todo-${Date.now()}-${++counter}`
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, initialState)

  const addTodo = useCallback((title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return
    dispatch({ type: 'add', id: generateId(), title: trimmed })
  }, [])

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'toggle', id })
  }, [])

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'delete', id })
  }, [])

  return { todos, dispatch, addTodo, toggleTodo, deleteTodo }
}
