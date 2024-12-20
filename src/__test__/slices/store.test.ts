import store, { RootState } from '../../services/store';
//плохо настроенные алиасы мучают меня весь проект, в любых тестах и файлах, откуда импортируем алиасов быть не должно
import {
  ConstructorReducer,
  FeedReducer,
  IngredientReducer,
  UserReducer
} from '../../services/slices';

describe('store initialization', () => {
  it('should initialize with the correct reducers', () => {
    const state: RootState = store.getState();

    // Проверяем, что все редьюсеры существуют
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('ConstructorReducer'); // Верно, если исправите название

    // Проверяем начальные состояния
    expect(state.ingredients).toEqual(
      IngredientReducer(undefined, { type: 'unknown' })
    );
    expect(state.feed).toEqual(FeedReducer(undefined, { type: 'unknown' }));
    expect(state.user).toEqual(UserReducer(undefined, { type: 'unknown' }));
    expect(state.ConstructorReducer).toEqual(
      ConstructorReducer(undefined, { type: 'unknown' })
    );
  });

  it('should allow dispatching actions', () => {
    const initialState = store.getState();

    store.dispatch({
      type: 'ingredients/setIngredients',
      payload: [
        {
          _id: '1',
          name: 'Ingredient 1',
          type: 'main',
          proteins: 10,
          fat: 5,
          carbohydrates: 15,
          calories: 50,
          price: 10,
          image: 'ingredient1.jpg',
          image_mobile: 'ingredient1-mobile.jpg',
          image_large: 'ingredient1-large.jpg'
        }
      ]
    });

    const updatedState = store.getState();

    expect(updatedState.ingredients).not.toEqual(initialState.ingredients);
  });
});
