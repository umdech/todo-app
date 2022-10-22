import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { updateTodo, toggleTodo, deleteTodo } from '../actions/actionCreators'
import ErrorMessage from './errorMessage'
import Input from './input'

type DropdownProps = {
    opened: boolean
}

type ListItemProps = {
    disabled?: boolean
}

const ListItem = styled.li<ListItemProps>`
    background-color: ${({ disabled, theme }) => (!disabled ? theme.colors.white : theme.colors.disabledColor)};
    border-radius: 2rem;
    margin-bottom: 1rem;
    min-height: 46px;
    padding: 0 4.5rem 0 1.25rem;
    position: relative;
`

const CheckboxContains = styled.label`
    align-items: flex-start;
    cursor: pointer;
    display: inline-flex;
    padding: 0.688rem 0;
    user-select: none;
    input[type=checkbox] {
        display: none;
        &:checked ~ .checkbox {
            &:before {
                background-color: ${({ theme }) => theme.colors.secondaryColor};
                transform: scale(1);
            }
        }
        &:checked ~ .text {
            opacity: 0.5;
            text-decoration: line-through;
            @media ${({ theme }) => theme.breakpoints.md} {
                text-decoration: auto;
                &:before {
                    width: 100%;
                }
            }
        }
    }
    .checkbox {
        box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.secondaryColor};
        border-radius: 0.375rem;
        display: block;
        flex: 0 0 1.375rem;
        height: 1.375rem;
        position: relative;
        width: 1.375rem;
        &:before {
            content: '';
            background-color: transparent;
            background-image: url("data:image/svg+xml,%3Csvg id='a' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10.21 7.88'%3E%3Cpath d='M3.33,5.87L1,3.54l-1,1,3.33,3.33L10.21,1l-1-1L3.33,5.87Z' style='fill:%23fff;'/%3E%3C/svg%3E");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 60%;
            border-radius: 0.375rem;
            bottom: 0;
            display: block;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transform: scale(0.3);
            transition: all .15s ease-in-out;
        }
    }
    .text {
        display: block;
        flex: 1;
        margin-left: 1rem;
        position: relative;
        transition: all .15s ease-in-out;
        @media ${({ theme }) => theme.breakpoints.md} {
            &:before {
                content: '';
                background-color: ${({ theme }) => theme.colors.dark};
                display: block;
                height: 1px;
                position: absolute;
                top: 50%;
                width: 0;
                transition: width 0.15s linear;
            }
        }
    }
`

const DropdownContains = styled.div`
    height: 38px;
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
    width: 48px;
`

const OptionBtn = styled.button`
    background-color: transparent;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 19.2 4.8'%3E%3Cpath d='M4.8,2.4c0,.64-.25,1.25-.7,1.7-.45,.45-1.06,.7-1.7,.7s-1.25-.25-1.7-.7c-.45-.45-.7-1.06-.7-1.7S.25,1.15,.7,.7c.45-.45,1.06-.7,1.7-.7s1.25,.25,1.7,.7c.45,.45,.7,1.06,.7,1.7Zm7.2,0c0,.64-.25,1.25-.7,1.7-.45,.45-1.06,.7-1.7,.7s-1.25-.25-1.7-.7c-.45-.45-.7-1.06-.7-1.7s.25-1.25,.7-1.7c.45-.45,1.06-.7,1.7-.7s1.25,.25,1.7,.7c.45,.45,.7,1.06,.7,1.7Zm4.8,2.4c.64,0,1.25-.25,1.7-.7,.45-.45,.7-1.06,.7-1.7s-.25-1.25-.7-1.7c-.45-.45-1.06-.7-1.7-.7s-1.25,.25-1.7,.7c-.45,.45-.7,1.06-.7,1.7s.25,1.25,.7,1.7c.45,.45,1.06,.7,1.7,.7Z' style='fill:%239796a8;'/%3E%3C/svg%3E");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 35%;
    border: none;
    border-radius: 1.25rem;
    cursor: pointer;
    height: 100%;
    overflow: hidden;
    padding: 0 1rem;
    position: absolute;
    text-indent: 999rem;
    white-space: nowrap;
    width: 100%;
    transition: all .15s ease-in-out;
    &:hover {
        background-color: ${({ theme }) => theme.colors.light};
    }
`

const DropdownMenu = styled.ul<DropdownProps>`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 0.5rem;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    font-size: 13px;
    list-style-type: none;
    margin: 0;
    min-width: 110px;
    opacity: ${({ opened }) => opened ? 1 : 0};
    padding: 0.8rem 0.5rem;
    position: absolute;
    top: 100%;
    transform: ${({ opened }) => opened ? 'translateY(0)' : 'translateY(1rem)'};
    transition: all .15s ease-in-out;
    right: 0.25rem;
    visibility: ${({ opened }) => opened ? 'visible' : 'hidden'};
    z-index: 100;
    li {
        margin-bottom: 0.3rem;
        &:last-child {
            margin-bottom: 0;
        }
    }
    button {
        background-color: transparent;
        border: none;
        border-radius: 0.5rem;
        color: ${({ theme }) => theme.colors.text};
        cursor: pointer;
        display: block;
        padding: 0.4rem 0.5rem;
        text-align: left;
        transition: all .3s ease-in-out;
        width: 100%;
        &:hover {
            background-color: ${({ theme }) => theme.colors.light};
            color: black;
        }
        &.delete {
            color: ${({ theme }) => theme.colors.red};
            &:hover {
                color: red;
            }
        }
    }
`

const List = ({ id, title, completed }: ITodo) => {
    const dropdownRef: React.RefObject<HTMLUListElement> = React.createRef()
    const [value, setValue] = useState(title)
    const [isDropdownOpened, setIsDropdownOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [disabled, setDisable] = useState(false)
    const [error, setError] = useState('')

    const dispatch: Dispatch<any> = useDispatch()

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef && dropdownRef !== null) {
            const cur = dropdownRef.current
            if (cur && !cur.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
    }

    const handleEscKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setEdit(false)
        }
    }

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsDropdownOpen(true)
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setValue(value)
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        setEdit(true)

        // Close deopdown menu
        setIsDropdownOpen(false)

        // Reset value
        setValue(title)
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(deleteTodo({ id, title, completed }))
        axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`)
            .catch(err => {
                setError(err.message)
                setTimeout(() => {
                    setError('')
                }, 3000)
            })
    }

    const handleToggleTodo = (e: React.FormEvent<HTMLInputElement>) => {
        const { checked } = e.currentTarget
        const data: ITodo = {
            id,
            title,
            completed: checked
        }
        dispatch(toggleTodo(data))
        axios.patch(`${process.env.REACT_APP_API_URL}/todos/${data.id}`, { completed: data.completed })
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const clearValue = value.trim()
        // Check if is not null and length less than 50 characters.
        if (clearValue && (clearValue.length <= 50)) {
            setDisable(true)
            const data: ITodo = {
                id,
                title: clearValue,
                completed
            }
            dispatch(updateTodo(data))
            setEdit(false)
            setDisable(false)
            axios.patch(`${process.env.REACT_APP_API_URL}/todos/${data.id}`, { title: data.title })
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

    useEffect(
        () => {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleEscKeyDown)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
                document.removeEventListener('keydown', handleEscKeyDown)
            }
        }
    )
    return (
        <>
            <ListItem disabled={disabled}>
                {!edit ? (
                    <>
                        <CheckboxContains>
                            <input type="checkbox" defaultChecked={completed} onChange={handleToggleTodo} data-testid="checkbox" />
                            <span className="checkbox"></span>
                            <span className="text" data-testid="todo">{title}</span>
                        </CheckboxContains>
                        <DropdownContains>
                            <OptionBtn type="button" title="Options" onClick={toggleDropdown} tabIndex={-1}>Option</OptionBtn>
                            <DropdownMenu opened={isDropdownOpened} ref={dropdownRef}>
                                <li><button type="button" tabIndex={-1} onClick={handleEdit} data-testid="editBtnOpt">Edit</button></li>
                                <li><button type="button" className="delete" tabIndex={-1} onClick={handleDelete} data-testid="deleteBtn">Delete</button></li>
                            </DropdownMenu>
                        </DropdownContains>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Input
                            name="task"
                            value={value}
                            onChange={handleInput}
                            maxLength={50}
                            placeholder="Add your todo..."
                            autoComplete="off"
                            autoFocus
                            disabled={disabled}
                            mode="edit" />
                    </form>
                )}
            </ListItem>
            {error && <ErrorMessage message={error} />}
        </>
    )
}

export default List