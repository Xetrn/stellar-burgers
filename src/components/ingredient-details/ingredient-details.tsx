import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '@src/components/ui/preloader';
import { IngredientDetailsUI } from '@src/components/ui/ingredient-details';
import { useDispatch, useSelector } from '@src/services/store';
import { getIngredients } from '@src/services/slices/ingredients';

export const IngredientDetails: FC = () => {
    const { id } = useParams();

    const ingredients = useSelector((state) => state.ingredientsReducer.ingredients);
    const ingredientData = ingredients.find((i) => i._id === id);

    const dispatch = useDispatch();

    useEffect(() => {
        if (ingredients.length) return;
        dispatch(getIngredients());
    }, []);

    if (!ingredientData) {
        return <Preloader />;
    }

    return <IngredientDetailsUI ingredientData={ingredientData} />;
};
