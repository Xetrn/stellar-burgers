import { FC, useEffect } from 'react';

import { AppHeaderUI } from '@ui';
import { useDispatch, useSelector } from '@src/services/store';
import { getUser } from '@src/services/slices/user';

export const AppHeader: FC = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.userReducer.user?.name);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    return <AppHeaderUI userName={userName} />;
};
