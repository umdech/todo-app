import { applyMiddleware, createStore, Store } from "redux"
import thunk from "redux-thunk"
import todosReducer from "../reducers/todoReducers"

const store: Store<TodoState, TodoAction> & {
    dispatch: DispatchType
} = createStore(todosReducer, applyMiddleware(thunk))

export default store