import styled from 'styled-components'

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
    return (
        <div className="app">
            <div className="container">
                <Box>
                    <Progress done={1} total={12} />
                    <Tasks />
                </Box>
            </div>
        </div>
    );
}

export default App;
