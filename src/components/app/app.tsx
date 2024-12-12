import '../../index.css';
import styles from './app.module.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

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
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectRoute } from '@src/components/protect-route/protect-route';

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const backgroundLocation = location.state?.background;

    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes>
                <Route path='/' element={<ConstructorPage />} />
                <Route path='/feed' element={<Feed />} />
                <Route
                    path='/login'
                    element={
                        <ProtectRoute>
                            <Login />
                        </ProtectRoute>
                    }
                />
                <Route
                    path='/register'
                    element={
                        <ProtectRoute>
                            <Register />
                        </ProtectRoute>
                    }
                />
                <Route
                    path='/forgot-password'
                    element={
                        <ProtectRoute>
                            <ForgotPassword />
                        </ProtectRoute>
                    }
                />
                <Route
                    path='/reset-password'
                    element={
                        <ProtectRoute>
                            <ResetPassword />
                        </ProtectRoute>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <ProtectRoute redirect>
                            <Profile />
                        </ProtectRoute>
                    }
                />
                <Route
                    path='/profile/orders'
                    element={
                        <ProtectRoute redirect>
                            <ProfileOrders />
                        </ProtectRoute>
                    }
                />
                <Route path='*' element={<NotFound404 />} />
                {backgroundLocation && (
                    <>
                        <Route
                            path='/feed/:number'
                            element={
                                <Modal title='Детали заказа' onClose={() => navigate(backgroundLocation)}>
                                    <OrderInfo />
                                </Modal>
                            }
                        />
                        <Route
                            path='/ingredients/:id'
                            element={
                                <Modal title='Детали ингредиента' onClose={() => navigate(backgroundLocation)}>
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                        <Route
                            path='/profile/orders/:number'
                            element={
                                <Modal title='Детали заказа' onClose={() => navigate(backgroundLocation)}>
                                    <ProtectRoute redirect>
                                        <OrderInfo />
                                    </ProtectRoute>
                                </Modal>
                            }
                        />
                    </>
                )}
            </Routes>
        </div>
    );
};

export default App;
