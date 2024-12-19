import { ProfileUI } from '@ui-pages';
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from '@src/services/store';
import { updateUser } from '@src/services/slices/user';

export const Profile: FC = () => {
    const user = useSelector((state) => state.userReducer.user!);
    const error = useSelector((state) => state.userReducer.error);
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({
        name: user?.name,
        email: user?.email,
        password: ''
    });

    useEffect(() => {
        setFormValue((prevState) => ({
            ...prevState,
            name: user?.name || '',
            email: user?.email || ''
        }));
    }, [user]);

    const isFormChanged = formValue.name !== user?.name || formValue.email !== user?.email || !!formValue.password;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        dispatch(updateUser(formValue));
        setFormValue((prevState) => ({ ...prevState, password: '' }));
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setFormValue({
            name: user?.name,
            email: user?.email,
            password: ''
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <ProfileUI
            formValue={formValue}
            isFormChanged={isFormChanged}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            updateUserError={error}
        />
    );
};
