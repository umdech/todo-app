import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../actions/actionType"

const initialState: TodoState = {
    todos: [],
    total: 0,
    completed: 0
}

const todosReducer = (state: TodoState = initialState, action: TodoAction): TodoState => {
    switch (action.type) {
        case ADD_TODO:
            const newTodo: ITodo = {
                id: (action.todo ? action.todo.id : ''),
                title: (action.todo ? action.todo.title : ''),
                completed: (action.todo ? action.todo.completed : false)
            }
            return {
                ...state,
                todos: state.todos.concat(newTodo),
                total: state.todos.length + 1,
                completed: state.todos.filter((todo: ITodo) => todo.completed === true).length + ((action.todo ? (action.todo.completed ? 1 : 0) : 0))
            }
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo: ITodo) => (todo.id === (action.todo ? action.todo.id : null)
                    ? { ...todo, completed: action.todo ? action.todo.completed : !todo.completed }
                    : todo)),
                completed: (state.completed + (action.todo ? (action.todo.completed ? 1 : -1) : -1))
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo: ITodo) => (todo.id === (action.todo ? action.todo.id : '')
                    ? { ...todo, title: (action.todo ? action.todo.title : '') }
                    : todo))
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo: ITodo) => todo.id !== (action.todo ? action.todo.id : '')),
                total: state.todos.length - 1,
                completed: state.completed - (action.todo ? (action.todo.completed ? 1 : 0) : 0)
            }
    }
    return state
}

export default todosReducer