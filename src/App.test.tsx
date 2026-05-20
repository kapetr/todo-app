import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders the todos heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /todos/i })).toBeInTheDocument()
})

test('renders the input placeholder', () => {
  render(<App />)
  expect(screen.getByPlaceholderText(/what needs to be done/i)).toBeInTheDocument()
})

test('adding a todo shows it in the list', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText(/what needs to be done/i)
  await userEvent.type(input, 'Write tests{Enter}')
  expect(screen.getByText('Write tests')).toBeInTheDocument()
})

test('input clears after submit', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText(/what needs to be done/i) as HTMLInputElement
  await userEvent.type(input, 'Do laundry{Enter}')
  expect(input.value).toBe('')
})

test('whitespace-only input does not add a todo', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText(/what needs to be done/i)
  await userEvent.type(input, '   {Enter}')
  expect(screen.queryByRole('listitem')).toBeNull()
})

test('multiple todos appear in insertion order', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText(/what needs to be done/i)
  await userEvent.type(input, 'First{Enter}')
  await userEvent.type(input, 'Second{Enter}')
  const items = screen.getAllByRole('listitem')
  expect(items[0]).toHaveTextContent('First')
  expect(items[1]).toHaveTextContent('Second')
})

test('clicking the checkbox toggles completed state visually', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText(/what needs to be done/i)
  await userEvent.type(input, 'Buy milk{Enter}')
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
  await userEvent.click(checkbox)
  expect(checkbox).toBeChecked()
})

test('clicking delete removes the todo', async () => {
  render(<App />)
  const input = screen.getByPlaceholderText(/what needs to be done/i)
  await userEvent.type(input, 'Buy milk{Enter}')
  expect(screen.getByText('Buy milk')).toBeInTheDocument()
  const deleteBtn = screen.getByRole('button', { name: /delete/i })
  await userEvent.click(deleteBtn)
  expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
})
