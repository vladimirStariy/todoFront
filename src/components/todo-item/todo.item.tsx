import { FC } from 'react';
import {
    Card, 
    CardHeader, 
    CardBody, 
    Divider, 
} from "@nextui-org/react";
import TodoEditor from "../todo-editor/todo.editor";
import { Socket } from 'socket.io-client';
import { TaskDto } from '../../store/models/task.dto';
import TodoRemoveModal from '../todo-remove-modal/todo.delete.modal';

interface TodoItemProps {
    data: TaskDto;
    socket: Socket;
}

const TodoItem: FC<TodoItemProps> = (props) => {
    return (
        <Card className="w-full">
            <CardHeader className="flex justify-between">
                <div className="flex flex-col">
                    <p className="text-md font-black">{props.data.title}</p>
                    <p className="text-xs text-slate-500">{props.data.status}</p>
                </div>
                <div className='flex flex-row gap-2'>
                    <TodoEditor mode='edit' data={props.data} socket={props.socket} />
                    <TodoRemoveModal socket={props.socket} id={props.data.taskId} />
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>{props.data.description}</p>
            </CardBody>
        </Card>
    );
}

export default TodoItem;