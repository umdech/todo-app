import styled from 'styled-components'

type ProgressProps = {
    completed: number,
    total: number
}

type ProgressType = {
    width: number
}

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

const ProgressBar = styled.div<ProgressType>`
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
        transition: width .15s ease-in-out;
        width: ${({ width }) => width}%;
    }
`

const Progress = ({ total, completed }: ProgressProps) => {
    const getWidth: number = ((completed * 100) / total) || 0
    return (
        <>
            <Box>
                <h2>Progress</h2>
                <ProgressBar width={getWidth} />
                <p data-testid="completed">{completed} Completed</p>
            </Box>
        </>
    )
}

export default Progress