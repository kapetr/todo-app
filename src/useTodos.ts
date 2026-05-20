import { useReducer, useCallback, useEffect } from 'react'
import { todosReducer } from './todosReducer'
import type { State, Todo } from './types'

const STORAGE_KEY = 'todo-app:todos:v1'

function loadFromStorage(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const valid = parsed.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        typeof item.completed === 'boolean'
    )
    return valid ? (parsed as Todo[]) : []
  } catch {
    return []
  }
}

let counter = 0
function generateId(): string {
  return `todo-${Date.now()}-${++counter}`
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, undefined, loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

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

  const editTodo = useCallback((id: string, title: string) => {
    dispatch({ type: 'edit', id, title })
  }, [])

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'clearCompleted' })
  }, [])

  return { todos, dispatch, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted }
}
