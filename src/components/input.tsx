import React from 'react'
import styled from 'styled-components'

type ButtonProps = {
    show: boolean
}

const InputField = styled.input`
    background-color: ${({ theme }) => theme.colors.white};
    border: none;
    outline: none !important;
    padding: 0.845rem 0;
    width: 100%;
    &:disabled {
        background-color: ${({ theme }) => theme.colors.disabledColor};
    }
`

const SaveBtn = styled.button<ButtonProps>`
    background-color: ${({ theme }) => theme.colors.secondaryColor};
    border: none;
    border-radius: 1.25rem;
    bottom: 0.25rem;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    display: ${({ show }) => show ? 'block' : 'none'};
    min-width: 64px;
    padding: 0 1rem;
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
    &:disabled {
        opacity: 0.6;
        pointer-events: none;
    }
`

type Mode = 'add' | 'edit'

interface inputInterface extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string,
    mode?: Mode
}

const Input = (props: inputInterface) => {
    const clearValue = (str: string) => {
        return str.trim()
    }
    return (
        <>
            <InputField {...props} data-testid={`${props.mode}NewInput`} />
            <SaveBtn disabled={props.disabled} show={!!clearValue(props.value)} data-testid={`${props.mode}NewBtn`}>Save</SaveBtn>
        </>
    )
}

export default Input