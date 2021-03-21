// React Modules
import React, { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

// Components
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FormHandles, SubmitHandler } from '@unform/core';

// CSS
import { Form } from './styles';

// TS
import { FoodData, InputFoodData } from '../../types';

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodData;
  handleUpdateFood: (inputFood: InputFoodData) => Promise<void>;
};


// APP
export function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood
}: ModalEditFoodProps) {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler = async (inputFood: InputFoodData) => {
    handleUpdateFood(inputFood);
    setIsOpen();
  }


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
