export interface FoodData {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
};

export type InputFoodData = Pick<FoodData, 
  'image' 
  | 'name' 
  | 'price' 
  | 'description'
>;


