import { renderHook, act } from '@testing-library/react'
import { useTodos } from './useTodos'

const STORAGE_KEY = 'todo-app:todos:v1'

beforeEach(() => {
  localStorage.clear()
})

test('initial state is empty when localStorage has no entry', () => {
  const { result } = renderHook(() => useTodos())
  expect(result.current.todos).toEqual([])
})

test('initial state hydrates from localStorage when valid payload is present', () => {
  const stored = [{ id: '1', title: 'Existing', completed: false }]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  const { result } = renderHook(() => useTodos())
  expect(result.current.todos).toHaveLength(1)
  expect(result.current.todos[0]).toEqual({ id: '1', title: 'Existing', completed: false })
})

test('corrupt stored JSON falls back to an empty list without throwing', () => {
  localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{')
  const { result } = renderHook(() => useTodos())
  expect(result.current.todos).toEqual([])
})

test('stored value that is not an array falls back to empty list', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: '1' }))
  const { result } = renderHook(() => useTodos())
  expect(result.current.todos).toEqual([])
})

test('stored array with wrong shape falls back to empty list', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: 1, title: 'Bad', completed: 'no' }]))
  const { result } = renderHook(() => useTodos())
  expect(result.current.todos).toEqual([])
})

test('addTodo writes updated state to localStorage', () => {
  const { result } = renderHook(() => useTodos())
  act(() => {
    result.current.addTodo('Buy milk')
  })
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
  expect(stored).toHaveLength(1)
  expect(stored[0].title).toBe('Buy milk')
})

test('toggleTodo writes updated state to localStorage', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: '1', title: 'A', completed: false }]))
  const { result } = renderHook(() => useTodos())
  act(() => {
    result.current.toggleTodo('1')
  })
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
  expect(stored[0].completed).toBe(true)
})

test('deleteTodo writes updated state to localStorage', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: '1', title: 'A', completed: false }]))
  const { result } = renderHook(() => useTodos())
  act(() => {
    result.current.deleteTodo('1')
  })
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
  expect(stored).toHaveLength(0)
})

test('dispatch clearCompleted writes updated state to localStorage', () => {
  const stored = [
    { id: '1', title: 'A', completed: true },
    { id: '2', title: 'B', completed: false },
  ]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  const { result } = renderHook(() => useTodos())
  act(() => {
    result.current.dispatch({ type: 'clearCompleted' })
  })
  const after = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
  expect(after).toHaveLength(1)
  expect(after[0].id).toBe('2')
})
