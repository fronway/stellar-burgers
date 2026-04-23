jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

import {
  addIngredient,
  burgerConstructorReducer,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('constructorSlice reducer', () => {
  const bun: TIngredient = {
    _id: 'bun-1',
    name: 'Булка',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 100,
    image: 'img',
    image_large: 'img-large',
    image_mobile: 'img-mobile'
  };

  const main: TIngredient = {
    _id: 'main-1',
    name: 'Начинка',
    type: 'main',
    proteins: 2,
    fat: 2,
    carbohydrates: 2,
    calories: 2,
    price: 200,
    image: 'img',
    image_large: 'img-large',
    image_mobile: 'img-mobile'
  };

  it('обрабатывает addIngredient (bun): кладёт булку в bun', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual({ ...bun, id: 'test-uuid' });
    expect(state.ingredients).toEqual([]);
  });

  it('обрабатывает addIngredient (не bun): добавляет в ingredients', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(main));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([{ ...main, id: 'test-uuid' }]);
  });

  it('обрабатывает removeIngredient: удаляет ингредиент по id', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { ...main, id: 'a' } as TConstructorIngredient,
        { ...main, id: 'b', _id: 'main-2' } as TConstructorIngredient
      ]
    };

    const state = burgerConstructorReducer(
      initialState,
      removeIngredient('a')
    );

    expect(state.ingredients).toEqual([
      { ...main, id: 'b', _id: 'main-2' }
    ]);
  });

  it('обрабатывает изменение порядка ингредиентов (moveIngredientUp)', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { ...main, id: 'a', _id: '1', name: '1' } as TConstructorIngredient,
        { ...main, id: 'b', _id: '2', name: '2' } as TConstructorIngredient,
        { ...main, id: 'c', _id: '3', name: '3' } as TConstructorIngredient
      ]
    };

    const state = burgerConstructorReducer(initialState, moveIngredientUp(2));

    expect(state.ingredients.map((i) => i.id)).toEqual(['a', 'c', 'b']);
  });

  it('обрабатывает изменение порядка ингредиентов (moveIngredientDown)', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { ...main, id: 'a', _id: '1', name: '1' } as TConstructorIngredient,
        { ...main, id: 'b', _id: '2', name: '2' } as TConstructorIngredient,
        { ...main, id: 'c', _id: '3', name: '3' } as TConstructorIngredient
      ]
    };

    const state = burgerConstructorReducer(initialState, moveIngredientDown(0));

    expect(state.ingredients.map((i) => i.id)).toEqual(['b', 'a', 'c']);
  });
});

