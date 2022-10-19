import styled from 'styled-components'

const Box = styled.div`
    background-color: ${({ theme }) => theme.colors.primaryColor};
    border-radius: 1.25rem;
    margin: -1rem -1rem 2rem;
    padding: 1.5rem;
    @media ${({ theme }) => theme.breakpoints.md} {
        margin: 0 0 2rem;
    }
    h2 {
        color: ${({ theme }) => theme.colors.white};
        font-weight: 500;
        margin: 0;
        margin-bottom: 1rem;
    }
    p {
        color: ${({ theme }) => theme.colors.white};
        margin: 0;
        opacity: 0.7;
    }
`

const ProgressBar = styled.div`
    background-color: ${({ theme }) => theme.colors.dark};
    border-radius: 0.25rem;
    height: 0.5rem;
    margin-bottom: 0.75rem;
    overflow: hidden;
    position: relative;
    width: 100%;
    &:before {
        content: '';
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 0.25rem;
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        transition: width .3s linear;
        width: 40%;
    }
`

interface progressInterface {
    done: number,
    total: number
}

const Progress = (props: progressInterface) => {
    return (
        <>
            <Box>
                <h2>Progress</h2>
                <ProgressBar />
                <p>12 Completed</p>
            </Box>
        </>
    )
}

export default Progress