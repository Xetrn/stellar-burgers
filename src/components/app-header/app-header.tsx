import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../../src/services/store';

export const AppHeader: FC = () => {
    const userName = useSelector(state => state.userReducer.user?.name);
    return <AppHeaderUI userName={userName} />;
}
