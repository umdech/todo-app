import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { theme } from './style/theme'

const TodoApp = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>
)

// test0: Make sure the output has the correct important
// DOM nodes and the correct values.
test('renders the correct initial DOM', () => {
    const app = render(<TodoApp />)

    const addNewInput = app.getByTestId('addNewInput')
    const todos = app.queryAllByTestId('todo')
    const completed = app.getByTestId('completed')

    // The input should be blank
    expect(addNewInput.getAttribute('value')).toBe('')

    // There should be 0 todos in the document.
    expect(todos.length).toBe(0)

    // The text should show "0 Completed"
    expect(completed).toHaveTextContent(/0 Completed/i)
})

// test1: Make sure it creates a todo when a user types
// something in the input and clicks the create button.
test('it create new todo', () => {
    const app = render(<TodoApp />)

    const addNewInput = app.getByTestId('addNewInput')
    const addNewBtn = app.getByTestId('addNewBtn')
    const completed = app.getByTestId('completed')

    // Create the todo.
    fireEvent.change(addNewInput, { target: { value: 'Submit the work.' } })
    fireEvent.click(addNewBtn)

    const todos = app.getAllByTestId('todo')
    const todo = app.getByTestId('todo')
    const todoNameElement = todos[0]

    // The name should be in the document as "Submit the work."
    expect(todoNameElement.textContent).toBe('Submit the work.')

    // The text should show "0 Completed"
    expect(completed).toHaveTextContent(/0 Completed/i)

    // The input field should be blank.
    expect(addNewInput.getAttribute('value')).toBe('')

    // The todo should be in the document.
    expect(todo).toBeInTheDocument();

    // There should be 1 todo in the document.
    expect(todos.length).toBe(1);
})