import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { addTodo } from '../actions/actionCreators'
import Input from './input'
import Lists from './lists'
import SelectField from './select'

type Option = {
    label: string,
    value: string
}

const options = [
    { value: '', label: 'All' },
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
    const [filter, setFilter] = useState({ value: '', label: 'All' })
    const [value, setValue] = useState('')

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
            const data: ITodo = {
                id: uuid(),
                title: clearValue,
                completed: false
            }
            axios.post(`${process.env.REACT_APP_API_URL}/todos`, data)
                .then(res => {
                    if (res.data) {
                        const data: ITodo = res.data
                        dispatch(addTodo(data))
                        // Clear value
                        setValue('')
                    }
                })
        }
    }

    return (
        <>
            <HeadingContains>
                <Heading>Tasks</Heading>
                <div>
                    <SelectField
                        name="filter"
                        options={options}
                        onChange={handleFilter}
                        defaultValue={filter} />
                </div>
            </HeadingContains>
            <Lists />
            <InputWrapper>
                <form onSubmit={handleSubmit}>
                    <Input
                        name="task"
                        value={value}
                        onChange={handleInput}
                        maxLength={50}
                        placeholder="Add your todo..."
                        autoComplete='off' />
                </form>
            </InputWrapper>
        </>
    )
}

export default Tasks