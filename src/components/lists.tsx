import styled from 'styled-components'
import List from './list'

const ListItems = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
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