import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "./actionType"

export const addTodo = (todo: ITodo) => {
    const action: TodoAction = {
        type: ADD_TODO,
        todo
    }
    return action
}

export const toggleTodo = (todo: ITodo) => {
    const action: TodoAction = {
        type: TOGGLE_TODO,
        todo
    }
    return action
}

export const updateTodo = (todo: ITodo) => {
    const action: TodoAction = {
        type: UPDATE_TODO,
        todo
    }
    return action
}

export const deleteTodo = (todo: ITodo) => {
    const action: TodoAction = {
        type: DELETE_TODO,
        todo
    }
    return action
}