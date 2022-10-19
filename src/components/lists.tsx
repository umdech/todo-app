import styled from 'styled-components'
import List from './list'

const ListItems = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    li.list-item {
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 2rem;
        margin-bottom: 1rem;
        min-height: 46px;
        padding: 0 4.5rem 0 1.25rem;
        position: relative;
    }
`

const Lists = () => {
    return (
        <ListItems>
            <List />
            <List />
            <List />
        </ListItems>
    )
}

export default Lists