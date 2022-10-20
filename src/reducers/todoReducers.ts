import { ADD_TODO, DELETE_TODO, LOAD_TODOS, TOGGLE_TODO, UPDATE_TODO } from "../actions/actionType"

const initialState: TodoState = {
    todos: []
}

const todosReducer = (state: TodoState = initialState, action: TodoAction) => {
    switch (action.type) {
        case LOAD_TODOS:
            return state
        case ADD_TODO:
            const newTodo: ITodo = {
                id: action.todo.id,
                title: action.todo.title,
                completed: action.todo.completed
            }
            return {
                ...state,
                todos: state.todos.concat(newTodo)
            }
        case TOGGLE_TODO:
            return state
        case UPDATE_TODO:
            let todos: ITodo[] = state.todos
            const result = todos.map((todo: ITodo) => (todo.id === action.todo.id
                ? { ...todo, title: action.todo.title }
                : todo))
            return {
                todos: result
            }
        case DELETE_TODO:
            return state

        // case UPDATE_TODO:
        //     return state.todos.map(todo => (todo.id === action.todo.id)
        //         ? { ...todo, title: action.todo.title }
        //         : todo)
        // case DELETE_TODO:
        //     return state.todos.filter(todo => todo.id !== action.todo.id)
    }
    return state
}

export default todosReducer