import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
import { PrivateRoute } from '../private-route/privateRoute';
import { URLS } from './app.urls';
import styles from './app.module.css';
import { AppHeader } from '../app-header';
import { OrderInfo } from '../order-info';
import { Modal } from '../modal';
import { IngredientDetails } from '../ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredients-slice';
import { AppDispatch, RootState } from '../../services/store';

const App = () => {
  const isAuth = useSelector((state: RootState) => state.UserReducer.isAuth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Order Details'
              onClose={() => {
                navigate('/feed');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Ingredient Details'
              onClose={() => {
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/forgot-password'
          element={
            <PrivateRoute isAuth={isAuth} link={URLS.LOGIN}>
              <ForgotPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PrivateRoute isAuth={isAuth} link={URLS.LOGIN}>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute isAuth={isAuth} link={URLS.LOGIN}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <PrivateRoute isAuth={isAuth} link={URLS.LOGIN}>
              <ProfileOrders />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='Order Details'
              onClose={() => {
                navigate('/profile/orders/');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
