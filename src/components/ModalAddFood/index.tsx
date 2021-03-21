// React Modules
import React, { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

// Components
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FormHandles } from '@unform/core';

// CSS
import { Form } from './styles';

// TS
import { InputFoodData } from '../../types';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (inputFood: InputFoodData) => Promise<void>;
};


// APP
export function ModalAddFood({ 
  isOpen, 
  setIsOpen, 
  handleAddFood 
}: ModalAddFoodProps) {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (inputFood: InputFoodData) => {
    handleAddFood(inputFood);
    setIsOpen();
  };


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

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