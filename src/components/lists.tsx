import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import List from './list'
import { Dispatch } from 'redux'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { addTodo } from '../actions/actionCreators'

const ListItems = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    li.list-item {
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 2rem;
        margin-bottom: 1rem;
        min-height: 46px;
        padding: 0 4.5rem 0 1.25rem;
        position: relative;
    }
`

const Lists = () => {
    const todos: readonly ITodo[] = useSelector(
        (state: TodoState) => state.todos,
        shallowEqual
    )
    const dispatch: Dispatch<any> = useDispatch()

    const [loaded, setLoad] = useState(false)

    useEffect(
        () => {
            if (!loaded) {
                axios.get(`${process.env.REACT_APP_API_URL}/todos`)
                    .then(res => {
                        if (res.data) {
                            const data = res.data
                            data.forEach((todo: ITodo) => {
                                dispatch(addTodo(todo))
                            })
                            setLoad(true)
                        }
                    })
            }
        },
        [loaded, dispatch, setLoad]
    )

    return (
        <ListItems>
            {todos.map((todo: ITodo) => (
                <List
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    key={todo.id} />
            ))}
        </ListItems>
    )
}

export default Lists