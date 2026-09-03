import { render, screen } from '@testing-library/react'
import Todo from './Todo'
import { test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

test('renders todos text, status and buttons, when done: false', async () => {
  const todo = { text: 'Learn about containers', done: false }
  const user = userEvent.setup()
  const mockHandler = vi.fn()
  const mockHandler2 = vi.fn()
  render(
    <Todo
      todo={todo}
      onClickComplete={() => mockHandler}
      onClickDelete={() => mockHandler2}
    />,
  )

  const element = screen.getByText('Learn about containers')
  expect(element).toBeDefined()

  const element2 = screen.getByText('This todo is not done')
  expect(element2).toBeDefined()

  const completeButton = screen.getByText('Set as done')
  await user.click(completeButton)

  const deleteButton = screen.getByText('Delete')
  await user.click(deleteButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler2.mock.calls).toHaveLength(1)
})
