import { FC } from 'react';
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure
} from "@nextui-org/react";
import { Socket } from 'socket.io-client';
import { DeleteIcon } from '../icons/DeleteIcon';

interface RemoveProps {
    id: number;
    socket: Socket;
}

const TodoRemoveModal: FC<RemoveProps> = (props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleDelete = async () => {
    props.socket.emit('remove-todo', {
        id: props.id
    })
    onClose();
  }

  return (
    <>
      <DeleteIcon onPress={onOpen} />     
      {isOpen ? <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Подтверждение удаления</ModalHeader>
                <ModalBody>
                  Вы действительно хотите удалить задачу?
                </ModalBody>
                <ModalFooter>
                  <div>
                      <Button color="danger" variant="light" onPress={onClose}>
                          Отмена
                      </Button>
                      <Button onClick={handleDelete} color="primary">
                          Удалить
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

export default TodoRemoveModal;