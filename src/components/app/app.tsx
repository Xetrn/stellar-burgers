import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import { useEffect } from 'react';
import { getFeeds, getIngredients, loginOnEnterApp } from '../../../src/services/thunks';
import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from 'src/services/store';

const App = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeeds());
    dispatch(loginOnEnterApp());
  }, [])

  return (<div className={styles.app}>
    <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />}/>
        <Route path='/ingredients/:id' element={<IngredientDetails/>}/>
        <Route path='/feed' element={<Feed />}/>
        <Route path='/feed/:number' element={<OrderInfo/>}/>
        <Route path='/profile/orders' element={<ProtectedRoute redirectToLogin><ProfileOrders /></ProtectedRoute>}/>
        <Route path='/profile/orders/:number' element={<ProtectedRoute redirectToLogin><OrderInfo/></ProtectedRoute>}/>
        <Route path='/login' element={<ProtectedRoute><Login /></ProtectedRoute>}/>
        <Route path='/register' element={<ProtectedRoute><Register /></ProtectedRoute>}/> 
        <Route path='/forgot-password' element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>}/>
        <Route path='/reset-password' element={<ProtectedRoute><ResetPassword /></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute redirectToLogin><Profile /></ProtectedRoute>}/>
        <Route path='*' element={<NotFound404/>}/>
      </Routes>

      {backgroundLocation &&
      <Routes>
        <Route path='/feed/:number' element={<Modal title='Детали заказа' onClose={() => navigate(backgroundLocation)}><OrderInfo/></Modal>}/>
        <Route path='/ingredients/:id' element={<Modal title='Детали ингредиента' onClose={() => navigate(backgroundLocation)}><IngredientDetails/></Modal>}/>
        <Route path='/profile/orders/:number' element={<Modal title='Детали заказа' onClose={() => navigate(backgroundLocation)}><OrderInfo/></Modal>}/>
      </Routes>}
  </div>)
};

export default App;
