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

    const addInput = app.getByTestId('addInput')
    const todos = app.queryAllByTestId('todo')
    const completed = app.getByTestId('completed')

    // The input should be blank
    expect(addInput.getAttribute('value')).toBe('')

    // There should be 0 todos in the document.
    expect(todos.length).toBe(0)

    // The text should show "0 Completed"
    expect(completed).toHaveTextContent(/0 Completed/i)
})

// test1: Make sure it creates a todo when a user types
// something in the input and clicks the create button.
test('it creates new todo', () => {
    const app = render(<TodoApp />)

    const addInput = app.getByTestId('addInput')
    const addBtn = app.getByTestId('addBtn')
    const completed = app.getByTestId('completed')

    // Create the todo.
    fireEvent.change(addInput, { target: { value: 'Submit the work.' } })
    fireEvent.click(addBtn)

    const todos = app.getAllByTestId('todo')
    const todo = app.getByTestId('todo')
    const todoNameElement = todos[0]

    // The name should be in the document as "Submit the work."
    expect(todoNameElement.textContent).toBe('Submit the work.')

    // The text should show "0 Completed"
    expect(completed).toHaveTextContent(/0 Completed/i)

    // The input field should be blank.
    expect(addInput.getAttribute('value')).toBe('')

    // The todo should be in the document.
    expect(todo).toBeInTheDocument();

    // There should be 1 todo in the document.
    expect(todos.length).toBe(1);
})

// test2: Make sure that after creating a todo, if the
// user toggles the checkbox, a todo complete / incomplete.
test('it checks / unchecks a todo', () => {
    const app = render(<TodoApp />)

    const completed = app.getByTestId('completed')

    const todoCheckbox = app.getByTestId('checkbox');

    // Complete a todo
    fireEvent.click(todoCheckbox)

    // The text should show "1 Completed"
    expect(completed).toHaveTextContent(/1 Completed/i)

    // Undo a todo
    fireEvent.click(todoCheckbox)

    // The text should show "0 Completed"
    expect(completed).toHaveTextContent(/0 Completed/i)
})

// test3: User clicks a edit button, a todo updates
test('it updates a todo', () => {
    const app = render(<TodoApp />)

    const editBtnOpt = app.getByTestId('editBtnOpt');

    // Click the delete button
    fireEvent.click(editBtnOpt)

    const editInput = app.getByTestId('editInput')
    const editBtn = app.getByTestId('editBtn')

    // Update the todo.
    fireEvent.change(editInput, { target: { value: 'Submit the works.' } })
    fireEvent.click(editBtn)

    const todos = app.getAllByTestId('todo')
    const todo = app.getByTestId('todo')
    const todoNameElement = todos[0]

    // The name should be in the document as "Submit the works."
    expect(todoNameElement.textContent).toBe('Submit the works.')

    // The todo should be in the document.
    expect(todo).toBeInTheDocument();

    // There should be 1 todo in the document.
    expect(todos.length).toBe(1);
})

// test4: User clicks a delete button, a todo goes away
test('it deletes a todo', () => {
    const app = render(<TodoApp />)

    const deleteBtn = app.getByTestId('deleteBtn');

    // Click the delete button
    fireEvent.click(deleteBtn)

    const todos = app.queryAllByTestId('todo');

    // There should be 0 todos found in the document.
    expect(todos.length).toBe(0);
})