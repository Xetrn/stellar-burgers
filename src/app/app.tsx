import { Provider } from 'react-redux';
import { AppRouter } from './routers/app.router';
import { RouterProvider } from 'react-router-dom';
import store from '../services/store';
import { Suspense } from 'react';
import { Preloader } from '@ui';
import { AppHeader } from '@components';

const App = () => (
  <Provider store={store}>
    <RouterProvider router={AppRouter} />
  </Provider>
);

export default App;
