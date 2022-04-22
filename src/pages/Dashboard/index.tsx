import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';
import { number } from 'yup';

interface IFood {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export default function Dashboard(){
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);

  const [modalOpen, setModalOpen] = useState();
  const [editModalOpen, setEditModalOpen] = useState();

  
  useEffect(() => {
    async function getApiFoods(){
      const response = await api.get('/foods');
      setFoods(response.data)
    }

    getApiFoods()
  } , []);

  const handleAddFood = async (food: IFood) => {
    const foodsUpdated = [...foods];

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foodsUpdated, response.data]);

    } catch (err) {
      console.log(err);
    }
  }

  // const handleUpdateFood = async (food: IFood) => {
  //   const { foods, editingFood } = this.state;
  //   const updatedFoods = [...foods]
  //   const editingFood =


  //   try {
  //     const foodUpdated = await api.put(
  //       `/foods/${editingFood.id}`,
  //       { ...editingFood, ...food },
  //     );

  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );

  //     this.setState({ foods: foodsUpdated });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleDeleteFood = async (id: number) => {
    const foodsUpdated = [...foods];

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foodsUpdated.filter((food: IFood) => food.id !== id);

    setFoods(foodsFiltered);
  }

  // const toggleModal = () => {
  //   const { modalOpen } = this.state;

  //   this.setState({ modalOpen: !modalOpen });
  // }

  // const toggleEditModal = () => {
  //   const { editModalOpen } = this.state;

  //   this.setState({ editModalOpen: !editModalOpen });
  // }

  const handleEditFood = (food: IFood) => {
    setEditingFood({...food});
  }

  return(
    <>
      <Header /*openModal={this.toggleModal}*/ />
      {/* <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={this.toggleModal}
        handleAddFood={this.handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={this.toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={this.handleUpdateFood}
      /> */}

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
  )
}