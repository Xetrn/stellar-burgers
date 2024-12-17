import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { ProtectedRoute } from '../../utils/protectedRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { resetData } from '../order-card/order-card-slice/order-card-slice';
import { resetModal } from '../order-info/order-info-slice/order-modal-slice';
import { getUser } from '../../services/user-slice/actions';
import {
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectLoginUserRequest,
  selectUser
} from '../../services/user-slice/user.slice';
import {
  selectAllIngredients,
  selectLoading
} from '../burger-ingredients/ingredients-slice/ingredients.slice';
import { getIngredients } from '../burger-ingredients/ingredients-slice/getIngredients';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const userRequest = useSelector(selectIsAuthenticated);

  const state = location.state as { background?: Location };
  const backgroundLocation = state?.background;

  const ingredients = useSelector(selectAllIngredients);
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

  useEffect(() => {
    if (!user.email || !userRequest) dispatch(getUser());
  }, [user, dispatch]);

  return (
    <div className={styles.app}>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route
            path='login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='profile'
            element={
              <ProtectedRoute onlyUnAuth>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='profile/orders'
            element={
              <ProtectedRoute onlyUnAuth>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='ingredients/:string'
            element={
              <Modal title='Ингредиент' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='profile/orders/:number'
            element={
              <Modal
                title='Заказ'
                onClose={() => {
                  dispatch(resetModal());
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='feed/:number'
            element={
              <Modal
                title='Заказ'
                onClose={() => {
                  dispatch(resetModal());
                  navigate(-1);
                }}
              >
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
