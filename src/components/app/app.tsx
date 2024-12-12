import { Routes, Route, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { ProtectedRoute } from '../protected-route';
import { AppRoute } from '../../const';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path={AppRoute.ConstructorPage} element={<ConstructorPage />} />
        <Route path={AppRoute.Feed} element={<Feed />} />
        <Route
          path={AppRoute.Login}
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.Register}
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.ForgotPassword}
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.ResetPassword}
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.Profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.ProfileOrders}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path={AppRoute.NotFound404} element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path={`${AppRoute.Feed}/:number`}
            element={
              <Modal title='Детали заказа' onClose={backgroundLocation}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={`${AppRoute.IngredientsDetails}/:id`}
            element={
              <Modal title='Детали ингредиента' onClose={backgroundLocation}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={`${AppRoute.ProfileOrders}/:id`}
            element={
              <Modal title='Детали заказа' onClose={backgroundLocation}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
