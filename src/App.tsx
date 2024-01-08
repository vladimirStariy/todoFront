import './App.css';
import { createContext } from 'react';
import TodoList from './components/todo-list/todo.list';
import { Socket, io } from 'socket.io-client';

const socket = io('https://greattodo.onrender.com/');
const SocketContext = createContext<Socket>(socket);

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className='w-full flex flex-col items-center'>
        <div className='max-w-[1280px] w-full pl-4 pr-4'>
          <div className='pt-20 pb-20 w-full text-center text-5xl '>
            TO-DO LIST
          </div>
          <TodoList />
        </div>
      </div>
    </SocketContext.Provider>
  );
}
export default App;
export { SocketContext }
