import React, { useState } from 'react'
import styled from 'styled-components'
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
const Tasks = () => {
    const [filter, setFilter] = useState({ value: '', label: 'All' })
    const [value, setValue] = useState('')

    const handleFilter = (option: Option) => {
        setFilter(option)
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setValue(value)
    }

    const handleCreate = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const clearValue = value.trim()
        // Check if is not null and length less than 50 characters.
        if (clearValue && (clearValue.length <= 50)) {
            console.log(clearValue)
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
            <form onSubmit={handleCreate}>
                <Input
                    name="task"
                    value={value}
                    onChange={handleInput}
                    maxLength={50}
                    placeholder="Add your todo..."
                    autoComplete='off' />
            </form>
        </>
    )
}

export default Tasks