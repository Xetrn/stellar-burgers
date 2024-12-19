import { expect, test } from '@jest/globals';
import {
  feedsSlice,
  getAllFeeds,
  initialState,
  TFeedsState
} from '../slices/feeds';
import { TFeedsResponse } from '../../utils/burger-api';

const mockFeedResponse: TFeedsResponse = {
  success: true,
  orders: [
    {
      _id: '66ed7358119d45001b507ef4',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-12-19T16:53:31.680Z',
      updatedAt: '2024-12-19T16:53:31.680Z',
      number: 53445,
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
    },
    {
      _id: '66ed6ad7119d45001b507edb',
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2024-12-19T16:53:31.680Z',
      updatedAt: '2024-12-19T16:53:31.680Z',
      number: 53442,
      ingredients: ['643d69a5c3f7b9001cfa093c']
    },
    {
      _id: '66ed479f119d45001b507e7f',
      status: 'done',
      name: 'Краторный метеоритный бургер',
      createdAt: '2024-12-19T16:53:31.680Z',
      updatedAt: '2024-12-19T16:53:31.680Z',
      number: 53432,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0940']
    }
  ],
  total: 7,
  totalToday: 3
};

describe('Check feed api', () => {
  test('getFeeds.pending', () => {
    const action = {
      type: getAllFeeds.pending.type
    };
    const testState = feedsSlice.reducer(initialState, action);
    const expectedState = { ...initialState, isLoadingGetFeeds: true };
    expect(testState).toEqual(expectedState);
  });

  test('getFeeds.fulfilled', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: mockFeedResponse
    };
    const testState = feedsSlice.reducer(initialState, action);
    const expectedState: TFeedsState = {
      orders: mockFeedResponse.orders,
      total: mockFeedResponse.total,
      totalToday: mockFeedResponse.totalToday,
      isLoadingGetFeeds: false,
      error: undefined
    };
    expect(testState).toEqual(expectedState);
  });

  test('getFeeds.rejected', () => {
    const action = {
      type: getAllFeeds.rejected.type,
      error: { message: 'Ошибка загрузки ленты' }
    };
    const testState = feedsSlice.reducer(initialState, action);
    const expectedState: TFeedsState = {
      ...initialState,
      isLoadingGetFeeds: false,
      error: 'Ошибка загрузки ленты'
    };
    expect(testState).toEqual(expectedState);
  });
});
