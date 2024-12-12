import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '@src/services/store';
import { loginUser } from '@src/services/slices/user';

export const Login: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const error = useSelector((state) => state.userReducer.error);
    const dispatch = useDispatch();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <LoginUI
            errorText={error}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    );
};
