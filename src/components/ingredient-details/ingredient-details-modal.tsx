import React, { FC } from 'react';
import { IngredientDetails, Modal } from '@components';
import { useNavigate } from 'react-router-dom';

export const IngredientDetailsModal: FC = () => {
  const navigate = useNavigate();

  return (
    <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
      <IngredientDetails />
    </Modal>
  );
};
