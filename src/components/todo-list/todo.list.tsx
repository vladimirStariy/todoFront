import { useEffect, useState, useContext } from 'react';
import TodoItem from "../todo-item/todo.item";
import TodoListToolbar from "./todo.list.toolbar";
import { TaskDto } from '../../store/models/task.dto';
import { SocketContext } from '../../App';
import { useGetTasksQuery } from '../../store/services/task.service';

const TodoList = () => {
    const socket = useContext(SocketContext);
    const { data, refetch } = useGetTasksQuery();
    const [tasks, setTasks] = useState<TaskDto[]>([]);

    useEffect(() => {
        if(socket) {
            socket.on('new-task', (e) => setTasks((prev) => [e, ...prev]));
            socket.on('task-removed', (e: TaskDto) => { refetch() })
            socket.on('task-updated', (e: TaskDto) => { refetch() })
        }
        return () => {
            if(socket) {
                socket.off('new-task');
                socket.off('task-removed');
                socket.off('task-updated');
            }
        }
    }, [socket, tasks, refetch]);

    useEffect(() => {
        if(data) setTasks(data);
    }, [data])

    return (
        <div className='w-full flex flex-col gap-4'>
            <TodoListToolbar socket={socket} />
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tasks ? tasks.map((item) => (
                    <TodoItem data={item} socket={socket}  />
                )) : <>
                
                </>}
            </div>
        </div>
    );
}

export default TodoList;