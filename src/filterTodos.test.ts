import { filterTodos } from './filterTodos'
import type { Todo } from './types'

const todos: Todo[] = [
  { id: '1', title: 'A', completed: false },
  { id: '2', title: 'B', completed: true },
  { id: '3', title: 'C', completed: false },
]

test("'all' returns input unchanged", () => {
  expect(filterTodos(todos, 'all')).toBe(todos)
})

test("'active' returns only non-completed todos in order", () => {
  expect(filterTodos(todos, 'active').map(t => t.id)).toEqual(['1', '3'])
})

test("'completed' returns only completed todos in order", () => {
  expect(filterTodos(todos, 'completed').map(t => t.id)).toEqual(['2'])
})

test("'active' with empty list returns empty array", () => {
  expect(filterTodos([], 'active')).toHaveLength(0)
})

test("'completed' with no completed todos returns empty array", () => {
  const active = todos.filter(t => !t.completed)
  expect(filterTodos(active, 'completed')).toHaveLength(0)
})
