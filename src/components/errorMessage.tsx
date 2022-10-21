import styled from 'styled-components'

type MessageProps = {
    message: string
}

const Error = styled.div`
    background-color: rgba(224, 124, 124, 0.7);
    border: 1px solid ${({ theme }) => theme.colors.red};
    border-radius: 1.25rem;
    bottom: 1rem;
    color: ${({ theme }) => theme.colors.white};
    padding: 1rem;
    position: fixed;
    right: 1rem;
`

const ErrorMessage = (props: MessageProps) => {
    return <Error>{props.message}</Error>
}

export default ErrorMessage