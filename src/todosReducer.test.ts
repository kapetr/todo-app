import { todosReducer } from './todosReducer'
import type { State } from './types'

const empty: State = []

test('add appends a new todo with trimmed title and completed:false', () => {
  const next = todosReducer(empty, { type: 'add', id: '1', title: '  Buy milk  ' })
  expect(next).toHaveLength(1)
  expect(next[0]).toEqual({ id: '1', title: 'Buy milk', completed: false })
})

test('add is a no-op for whitespace-only titles', () => {
  const next = todosReducer(empty, { type: 'add', id: '1', title: '   ' })
  expect(next).toHaveLength(0)
})

test('add is a no-op for empty string titles', () => {
  const next = todosReducer(empty, { type: 'add', id: '1', title: '' })
  expect(next).toHaveLength(0)
})

test('add appends in insertion order', () => {
  const s1 = todosReducer(empty, { type: 'add', id: '1', title: 'First' })
  const s2 = todosReducer(s1, { type: 'add', id: '2', title: 'Second' })
  expect(s2.map(t => t.title)).toEqual(['First', 'Second'])
})
