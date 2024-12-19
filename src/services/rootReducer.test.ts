import { rootReducer } from './store'; // путь к вашему store
import { ConstructorSlice } from '../pages/constructor-page/constructor-slice/constructor.slice';
import { IngredientsSlice } from '../components/burger-ingredients/ingredients-slice/ingredients.slice';
import { FeedSlice } from '../pages/feed/feed-slice/feed.slice';
import { OrderModalSlice } from '../components/order-info/order-modal-slice/order-modal.slice';
import { OrderCardSlice } from '../components/order-card/order-card-slice/order-card.slice';
import { UserSlice } from './user-slice/user.slice';

describe('rootReducer', () => {
  it('Инициализация всех редьюсеров с корректными начальными состояниями', () => {
    expect(
      rootReducer[ConstructorSlice.name](undefined, { type: '@@INIT' })
    ).toEqual(ConstructorSlice.getInitialState());
    expect(
      rootReducer[IngredientsSlice.name](undefined, { type: '@@INIT' })
    ).toEqual(IngredientsSlice.getInitialState());
    expect(rootReducer[FeedSlice.name](undefined, { type: '@@INIT' })).toEqual(
      FeedSlice.getInitialState()
    );
    expect(
      rootReducer[OrderModalSlice.name](undefined, { type: '@@INIT' })
    ).toEqual(OrderModalSlice.getInitialState());
    expect(
      rootReducer[OrderCardSlice.name](undefined, { type: '@@INIT' })
    ).toEqual(OrderCardSlice.getInitialState());
    expect(rootReducer[UserSlice.name](undefined, { type: '@@INIT' })).toEqual(
      UserSlice.getInitialState()
    );
  });
});
