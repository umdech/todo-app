import React from 'react'
import styled from 'styled-components'

const InputField = styled.input`
    border: none;
    outline: none !important;
    padding: 0.845rem 0;
    width: 100%;
`

const SaveBtn = styled.button`
    background-color: ${({ theme }) => theme.colors.secondaryColor};
    border: none;
    border-radius: 1.25rem;
    bottom: 0.25rem;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    min-width: 64px;
    padding: 0 1rem;
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
`

interface inputInterface extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string
}

const Input = (props: inputInterface) => {
    const clearValue = (str: string) => {
        return str.trim()
    }
    return (
        <>
            <InputField {...props} />
            {clearValue(props.value) && <SaveBtn>Save</SaveBtn>}
        </>
    )
}

export default Input