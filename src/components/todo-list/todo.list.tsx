import { useEffect, useState, useContext, useCallback } from 'react';
import TodoItem from "../todo-item/todo.item";
import TodoListToolbar from "./todo.list.toolbar";
import { TaskDto } from '../../store/models/task.dto';
import { SocketContext } from '../../App';
import { useGetTasksQuery } from '../../store/services/task.service';

const TodoList = () => {
    const socket = useContext(SocketContext);
    const { data } = useGetTasksQuery();
    const [tasks, setTasks] = useState<TaskDto[]>([]);

    const handleDelete = useCallback((removeableTask: TaskDto) => {
        const tempArray = tasks.filter(obj => obj.taskId !== removeableTask.taskId);
        setTasks(tempArray)
    }, [tasks])

    const handleUpdate = useCallback((updateableTask: TaskDto) => {
        const tempArray = tasks.map((item) => {
            if(item.taskId === updateableTask.taskId) {
                return {
                    taskId: updateableTask.taskId,
                    title: updateableTask.title,
                    description: updateableTask.description,
                    status: updateableTask.status,
                }
            }
            return item;
        });
        setTasks(tempArray)
    }, [tasks])

    useEffect(() => {
        if(socket) {
            socket.on('new-task', (e) => setTasks((prev) => [e, ...prev]));
            socket.on('task-removed', (e: TaskDto) => { handleDelete(e) })
            socket.on('task-updated', (e: TaskDto) => { handleUpdate(e) })
        }
        return () => {
            if(socket) {
                socket.off('new-task');
                socket.off('task-removed');
                socket.off('task-updated');
            }
        }
    }, [socket, tasks]);

    useEffect(() => {
        if(data) setTasks(data);
    }, [data])

    return (
        <div className='w-full flex flex-col gap-4'>
            <TodoListToolbar socket={socket} />
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tasks ? tasks.map((item, index) => (
                    <TodoItem key={index} data={item} socket={socket}  />
                )) : <>
                
                </>}
            </div>
        </div>
    );
}

export default TodoList;