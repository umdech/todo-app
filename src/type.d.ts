interface ITodo {
    id: string,
    title: string,
    completed: boolean
}

type TodoState = {
    todos: ITodo[],
    total: number,
    completed: number
}

type TodoAction = {
    type: string,
    todo?: ITodo,
    filter?: any
}

type TodoProps = {
    todos: ITodo[]
}

type DispatchType = (args: TodoAction) => TodoAction