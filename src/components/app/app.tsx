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

const App = () => {
  const nav = useNavigate();
  return (
    <div className={styles.app}>
      <Routes>
        <Route path={'/'} Component={AppHeader}>
          <Route index Component={ConstructorPage} />
          <Route path={'feed'} Component={Feed} />
          <Route
            path={'/login'}
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/register'}
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/forgot-password'}
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/reset-password'}
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/profile'}
            element={
              <ProtectedRoute onlyUnAuth>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route
              path={'orders'}
              element={
                <ProtectedRoute onlyUnAuth>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            >
              <Route
                path={':number'}
                element={
                  <ProtectedRoute onlyUnAuth>
                    <Modal
                      title={'popup-order'}
                      onClose={() => {
                        nav(-1);
                      }}
                    >
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route
            path={'ingredients/:string'}
            element={
              <Modal
                title={'Ингредиент'}
                onClose={() => {
                  nav(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path={'*'} Component={NotFound404} />
          <Route
            path={'feed/:number'}
            element={
              <Modal
                title={'Заказ'}
                onClose={() => {
                  nav(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
