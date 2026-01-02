import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';

interface IngredientDetailsProps {
  isModal?: boolean;
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({ isModal }) => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();
  const ingredients = useSelector(ingredientsSelector);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI ingredientData={ingredientData} isModal={isModal} />
  );
};
