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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../../utils/protectedRoute';

const App = () => (
  <div className={styles.app}>
    <Routes>
      <Route path={'/'} Component={AppHeader}>
        <Route index Component={ConstructorPage} />
        <Route path={'feed'} Component={Feed}>
          <Route
            path={':number'}
            element={
              <Modal title={'feed'} onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
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
                  <Modal title={'popup-order'} onClose={() => {}}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route
          path={'ingredients-slice/:id'}
          element={
            <Modal title={'ingredient-popup'} onClose={() => {}}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path={'*'} Component={NotFound404} />
      </Route>
    </Routes>
  </div>
);

export default App;
