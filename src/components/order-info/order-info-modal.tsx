import React, { FC } from 'react';
import { Modal, OrderInfo } from '@components';
import { useNavigate } from 'react-router-dom';

export const OrderInfoModal: FC = () => {
  const navigate = useNavigate();

  return (
    <Modal title='' onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
};
