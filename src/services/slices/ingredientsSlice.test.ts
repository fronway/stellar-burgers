import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice reducer', () => {
  const items: TIngredient[] = [
    {
      _id: '1',
      name: 'Ингредиент',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 10,
      image: 'img',
      image_large: 'img-large',
      image_mobile: 'img-mobile'
    }
  ];

  it('fetchIngredients.pending: isLoading=true, error=null', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('request-id', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.fulfilled: кладёт items и isLoading=false', () => {
    const state = ingredientsReducer(
      { items: [], isLoading: true, error: 'err' },
      fetchIngredients.fulfilled(items, 'request-id', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(items);
  });

  it('fetchIngredients.rejected: кладёт error и isLoading=false', () => {
    const state = ingredientsReducer(
      { items: [], isLoading: true, error: null },
      fetchIngredients.rejected(new Error('boom'), 'request-id', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('boom');
  });
});

