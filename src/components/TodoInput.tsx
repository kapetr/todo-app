import { useState, type KeyboardEvent } from 'react'

interface Props {
  onAdd: (title: string) => void
}

export function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('')

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const trimmed = value.trim()
      if (trimmed) {
        onAdd(trimmed)
        setValue('')
      }
    }
  }

  return (
    <input
      className="todo-input"
      type="text"
      placeholder="What needs to be done?"
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  )
}
