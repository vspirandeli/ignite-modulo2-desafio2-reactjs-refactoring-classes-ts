// React Modules
import React, { useEffect, useState } from 'react';

// Components
import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

// CSS
import { FoodsContainer } from './styles';

// Non React Modules
import api from '../../services/api';

// TS
import { FoodData, InputFoodData } from '../../types';


// APP
export function Dashboard() {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  const handleEditFood = (food: FoodData) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  const handleAddFood = async (inputFood: InputFoodData) => {
    try {
      const insertedFood: FoodData = await api.post('/foods', {
        ...inputFood,
        available: true
      });

      setFoods([ ...foods, insertedFood ]);

    } catch (err) {
      console.log(err);
    };
  };

  const handleUpdateFood = async (inputFood: InputFoodData) => {
    try {
      const updatedFood: FoodData = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...inputFood }
      ).then(response => response.data)

      const updatedFoods: FoodData[] = foods.map((f: FoodData) => {
        return f.id !== updatedFood.id ? f : updatedFood;
      });
      
      setFoods(updatedFoods);
    } catch (err) {
      console.log(err);
    };
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const filteredFoods: FoodData[] = foods.filter(food => food.id !== id);

    setFoods(filteredFoods);
  };

  const getFoodMenu = async () => {
    const allFoods: FoodData[] = await api.get('./foods')
      .then(response => response.data);

    setFoods(allFoods);
  };


  useEffect(() => {
    getFoodMenu();

  }, [])


  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={isModalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isEditModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}