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

test('toggle flips completed for target id, leaves others unchanged', () => {
  const s1 = todosReducer(empty, { type: 'add', id: '1', title: 'A' })
  const s2 = todosReducer(s1, { type: 'add', id: '2', title: 'B' })
  const s3 = todosReducer(s2, { type: 'toggle', id: '1' })
  expect(s3[0]).toEqual({ id: '1', title: 'A', completed: true })
  expect(s3[1]).toEqual({ id: '2', title: 'B', completed: false })
})

test('toggle flips completed back when toggled twice', () => {
  const s1 = todosReducer(empty, { type: 'add', id: '1', title: 'A' })
  const s2 = todosReducer(s1, { type: 'toggle', id: '1' })
  const s3 = todosReducer(s2, { type: 'toggle', id: '1' })
  expect(s3[0].completed).toBe(false)
})

test('delete removes the target id, preserves order of the rest', () => {
  const s1 = todosReducer(empty, { type: 'add', id: '1', title: 'A' })
  const s2 = todosReducer(s1, { type: 'add', id: '2', title: 'B' })
  const s3 = todosReducer(s2, { type: 'add', id: '3', title: 'C' })
  const s4 = todosReducer(s3, { type: 'delete', id: '2' })
  expect(s4).toHaveLength(2)
  expect(s4.map(t => t.id)).toEqual(['1', '3'])
})

test('delete is a no-op for unknown id', () => {
  const s1 = todosReducer(empty, { type: 'add', id: '1', title: 'A' })
  const s2 = todosReducer(s1, { type: 'delete', id: 'unknown' })
  expect(s2).toHaveLength(1)
})

test('edit updates the trimmed title for the matching id, others unchanged', () => {
  const s1 = todosReducer(empty, { type: 'add', id: '1', title: 'A' })
  const s2 = todosReducer(s1, { type: 'add', id: '2', title: 'B' })
  const s3 = todosReducer(s2, { type: 'edit', id: '1', title: '  Updated  ' })
  expect(s3[0]).toEqual({ id: '1', title: 'Updated', completed: false })
  expect(s3[1]).toEqual({ id: '2', title: 'B', completed: false })
})

test('edit with empty post-trim title deletes the todo', () => {
  const s1 = todosReducer(empty, { type: 'add', id: '1', title: 'A' })
  const s2 = todosReducer(s1, { type: 'add', id: '2', title: 'B' })
  const s3 = todosReducer(s2, { type: 'edit', id: '1', title: '   ' })
  expect(s3).toHaveLength(1)
  expect(s3[0].id).toBe('2')
})
