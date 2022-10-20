import { ADD_TODO, DELETE_TODO, LOAD_TODOS, TOGGLE_TODO, UPDATE_TODO } from "./actionType"

export const loadTodos = (todos: ITodo[]) => {
    return { type: LOAD_TODOS, todos }
}

export const addTodo = (todo: ITodo) => {
    const action: TodoAction = {
        type: ADD_TODO,
        todo
    }
    return action
}

export const toggleTodo = ({ id }: ITodo) => {
    return { type: TOGGLE_TODO, id }
}

export const updateTodo = (todo: ITodo) => {
    const action: TodoAction = {
        type: UPDATE_TODO,
        todo
    }
    return action
}

export const deleteTodo = ({ id }: ITodo) => {
    return { type: DELETE_TODO, id }
}