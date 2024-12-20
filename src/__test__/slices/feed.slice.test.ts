const mockFeed = {
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-12-19T12:00:00Z',
      updatedAt: '2024-12-19T14:00:00Z',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    },
    {
      _id: '2',
      status: 'pending',
      name: 'Order 2',
      createdAt: '2024-12-19T13:00:00Z',
      updatedAt: '2024-12-19T15:00:00Z',
      number: 2,
      ingredients: ['ingredient3', 'ingredient4']
    }
  ],
  total: 100,
  totalToday: 10
};

import {
  FeedReducer,
  setFeed,
  setFeedLoading
} from '../../services/slices/feed.slice';

describe('Feed Slice Test', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false
  };

  it('Вернуть initialState', () => {
    expect(FeedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('тестирование setFeed', () => {
    const newState = FeedReducer(
      initialState,
      setFeed({
        orders: mockFeed.orders,
        total: mockFeed.total,
        totalToday: mockFeed.totalToday
      })
    );
    expect(newState).toEqual({
      orders: mockFeed.orders,
      total: mockFeed.total,
      totalToday: mockFeed.totalToday,
      isLoading: false
    });
  });

  it('тестирование setFeedLoading', () => {
    const newState = FeedReducer(initialState, setFeedLoading(true));
    expect(newState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true
    });
  });
});
