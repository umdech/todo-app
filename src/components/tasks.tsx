import axios from 'axios'
import React, { useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { addTodo } from '../actions/actionCreators'
import ErrorMessage from './errorMessage'
import Input from './input'
import Lists from './lists'
import SelectField from './select'

type Option = {
    label: string,
    value: string
}

const options = [
    { value: 'all', label: 'All' },
    { value: 'true', label: 'Done' },
    { value: 'false', label: 'Undone' }
]

const HeadingContains = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`

const Heading = styled.h1`
    font-size: 24px;
    font-weight: 500;
    margin: 0;
`

const InputWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 2rem;
    padding: 0 4.5rem 0 1.25rem;
    position: relative;
`

const Tasks = () => {
    const [filter, setFilter] = useState<Option>({ value: 'all', label: 'All' })
    const [value, setValue] = useState('')
    const [disabled, setDeisable] = useState(false)
    const [error, setError] = useState('')

    const todos: ITodo[] = useSelector(
        (state: TodoState) => {
            if (filter.value !== 'all') {
                return state.todos.filter((todo: ITodo) => todo.completed === (filter.value === 'true'))
            } else {
                return state.todos
            }
        },
        shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch()

    const handleFilter = (option: Option) => {
        setFilter(option)
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setValue(value)
    }


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const clearValue = value.trim()
        // Check if is not null and length less than 50 characters.
        if (clearValue && (clearValue.length <= 50)) {
            setDeisable(true)
            const data: ITodo = {
                id: uuid(),
                title: clearValue,
                completed: false
            }
            dispatch(addTodo(data))
            // Clear value
            setValue('')
            setDeisable(false)
            axios.post(`${process.env.REACT_APP_API_URL}/todos`, data)
                .then(() => {
                    setError('')
                })
                .catch(err => {
                    setError(err.message)
                    setTimeout(() => {
                        setError('')
                    }, 3000)
                })
        }
    }

    return (
        <>
            <HeadingContains>
                {/* Heading */}
                <Heading>Tasks</Heading>

                {/* Filter */}
                <div>
                    <SelectField
                        name="filter"
                        options={options}
                        onChange={handleFilter}
                        defaultValue={filter} />
                </div>
            </HeadingContains>

            {/* Task items */}
            <Lists todos={todos} />

            {/* Add new todo input */}
            <InputWrapper>
                <form onSubmit={handleSubmit}>
                    <Input
                        name="task"
                        value={value}
                        onChange={handleInput}
                        maxLength={50}
                        placeholder="Add your todo..."
                        autoComplete='off'
                        disabled={disabled}
                        mode="add" />
                </form>
            </InputWrapper>
            {error && <ErrorMessage message={error} />}
        </>
    )
}

export default Tasks