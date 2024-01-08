import { FC, useEffect } from 'react';
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddIcon } from '../icons/AddIcon';
import { TaskDto } from '../../store/models/task.dto';
import { taskValidationSchema } from './task.validation.schema';
import { Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Socket } from 'socket.io-client';
import { EditIcon } from '../icons/EditIcon';

interface EditorProps {
    data?: TaskDto; 
    mode: string;
    socket: Socket
}

const TodoEditor: FC<EditorProps> = (props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<TaskDto>({resolver: yupResolver(taskValidationSchema)})

  const onSubmit: SubmitHandler<TaskDto> = async (data) => {
    if(props.mode === "insert") {
        props.socket.emit('add-todo', {
            taskId: 0,  
            title: data.title,
            description: data.description,
            status: data.status
        })
        onClose();
    } else {
      props.socket.emit('edit-todo', {
          taskId: props.data?.taskId,
          title: data.title,
          description: data.description,
          status: data.status
      })
      onClose();
    }
  }

  useEffect(() => {
    if(props.mode === 'insert') setValue('taskId', 0)
    if(props.mode === "edit" && props.data) {
        setValue('taskId', props.data.taskId)
        setValue('description', props.data.description)
        setValue('status', props.data.status)
        setValue('title', props.data.title)
    }
  }, [props, setValue, watch])

  return (
    <>
      {props.mode === "insert" ? <>
        <Button 
            onPress={onOpen}
            variant='bordered'
            startContent={<AddIcon />}
        >
            Добавить
        </Button>
      </> : <>
        <EditIcon onPress={onOpen} />
      </>}
      {isOpen ? <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{props.mode === "insert" ? "Добавить задачу" : "Редактировать задачу"}</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                      <Input 
                        {...register("title")} 
                        color={errors.title ? 'danger' : 'default'}
                        type="text" 
                        label="Заголовок" 
                        value={props.mode === 'edit' ? watch('title') : undefined} 
                      />
                      <Textarea 
                        {...register('description')} 
                        color={errors.description ? 'danger' : 'default'}
                        type='text' 
                        label="Описание задачи" 
                        value={props.mode === 'edit' ? watch('description') : undefined} 
                      />
                      <Select 
                          {...register('status')}
                          color={errors.status ? 'danger' : 'default'}
                          {...props.mode === 'edit' ? { selectedKeys: [`${watch('status')}`]} : undefined}
                          {...props.mode === 'edit' ? { value: watch('status')} : undefined}
                          label="Статус"
                          placeholder="Выберите статус"
                          className="w-full"
                      >
                          <SelectItem key='В процессе' value="В процессе">
                              В процессе
                          </SelectItem>
                          <SelectItem key='Ожидает выполнения' value="Ожидает выполнения">
                              Ожидает выполнения
                          </SelectItem>
                          <SelectItem key='Выполнено' value="Выполнено">
                              Выполнено
                          </SelectItem>
                      </Select>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <div>
                      <Button color="danger" variant="light" onPress={onClose}>
                          Отмена
                      </Button>
                      <Button onClick={handleSubmit(onSubmit)} color="primary">
                          {props.mode === "insert" ? "Добавить" : "Изменить"}
                      </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </> : <></>}
    </>
  );
}

export default TodoEditor;