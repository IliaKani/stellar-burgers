import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredientsWithSelector } from '../../services/slices/IngredientsSlice';
import styles from '../app/app.module.css';

export const IngredientDetails: FC = () => {
  /** DONE: взять переменную из стора */

  const ingredients = useSelector(getIngredientsWithSelector);

  const { id } = useParams();

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <div className={styles.detailPageWrap}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
