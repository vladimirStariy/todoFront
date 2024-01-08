import { FC } from 'react';
import TodoEditor from "../todo-editor/todo.editor";
import { Socket } from 'socket.io-client';

interface TodoListToolbarProps {
    socket: Socket;
}

const TodoListToolbar: FC<TodoListToolbarProps> = (props) => {
    return (
        <div className='w-full flex justify-center items-center p-4'>
            <TodoEditor socket={props.socket} mode="insert" />
        </div>
    );
}

export default TodoListToolbar;