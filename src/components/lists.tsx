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

const EmptyMessage = styled.p`
    margin: 1rem 0;
    text-align: center;
`

const Lists: React.FC<TodoProps> = ({ todos }) => {

    return (
        <>
            {(todos.length > 0) ? (
                <ListItems>
                    {todos.map((todo: ITodo) => (
                        <List
                            {...todo}
                            key={todo.id} />
                    ))}
                </ListItems>
            ) : (<EmptyMessage>No tasks found.</EmptyMessage>)}
        </>
    )
}

export default Lists