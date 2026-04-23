import { rootReducer } from './rootReducer';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { burgerConstructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { authReducer } from './slices/authSlice';
import { feedReducer } from './slices/feedSlice';
import { profileOrdersReducer } from './slices/profileOrdersSlice';
import { orderInfoReducer } from './slices/orderInfoSlice';

describe('rootReducer', () => {
  it('правильно инициализируется', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      burgerConstructor: burgerConstructorReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      order: orderReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      auth: authReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      feed: feedReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      profileOrders: profileOrdersReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      orderInfo: orderInfoReducer(undefined, { type: 'UNKNOWN_ACTION' })
    });
  });
});

