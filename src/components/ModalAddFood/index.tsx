import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { ReactNode, RefObject, useRef } from 'react';

interface IFoodAdd {
  name: string;
  description: string;
  price: string;
  available: boolean ;
  image: string ;
}

interface ModalAddProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: IFoodAdd) => Promise<void>;
}

export function ModalAddFood({isOpen, setIsOpen, handleAddFood}: ModalAddProps){
  const formRef = useRef(null);

  const handleSubmit = async (data: IFoodAdd) => {
    const foodData = {...data}
    handleAddFood(foodData);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={(formRef) => {handleSubmit(formRef)}}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link da imagem aqui" />

        <Input name="name" placeholder="Título. Ex: Moda Italiana" />
        
        <Input name="price" placeholder="Preço. Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}