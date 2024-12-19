import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '@src/services/store';
import { registerUser } from '@src/services/slices/user';

export const Register: FC = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const error = useSelector((state) => state.userReducer.error);
    const dispatch = useDispatch();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(registerUser({ email, name: userName, password }));
    };

    return (
        <RegisterUI
            errorText={error}
            email={email}
            userName={userName}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            setUserName={setUserName}
            handleSubmit={handleSubmit}
        />
    );
};
