import axios from 'axios';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components'
import { addTodo } from './actions/actionCreators';
import ErrorMessage from './components/errorMessage';

import Progress from './components/progress';
import Tasks from './components/tasks';

const Box = styled.div`
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: 1.25rem;
    padding: 1rem;
    @media ${({ theme }) => theme.breakpoints.md} {
      padding: 3.75rem 6.25rem;
    }
`

function App() {
    const [loaded, setLoad] = useState(false)
    const [error, setError] = useState('')

    const todos: TodoState = useSelector(
        (state: TodoState) => state,
        shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch()

    useEffect(
        () => {
            if (!loaded) {
                axios.get(`${process.env.REACT_APP_API_URL}/todos`)
                    .then(res => {
                        if (res.data) {
                            const data: ITodo[] = res.data
                            data.forEach((todo: ITodo) => {
                                dispatch(addTodo(todo))
                            })
                            setLoad(true)
                            setError('')
                        }
                    })
                    .catch((err) => {
                        setError(err.message)
                        setTimeout(() => {
                            setError('')
                        }, 3000)
                    })
            }
        },
        [loaded, dispatch, setLoad, setError]
    )

    return (
        <div className="app">
            <div className="container">
                <Box>
                    <Progress total={todos.total} completed={todos.completed} />
                    <Tasks />
                </Box>
            </div>
            {error && <ErrorMessage message={error} />}
        </div>
    );
}

export default App;
