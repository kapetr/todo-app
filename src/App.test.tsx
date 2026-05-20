import { render, screen } from '@testing-library/react'
import App from './App'

test('renders todo app heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /todo app/i })).toBeInTheDocument()
})
