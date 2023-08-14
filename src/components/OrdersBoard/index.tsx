import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';

import * as S from './styles';

interface OrdersBoardProps {
  icon:string;
  title: string;

  orders: Order[];
}

export default function OrdersBoard({icon, title, orders}:OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <S.Board>
      <OrderModal
        order={selectedOrder}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>(1)</span>
      </header>

      {orders.length > 0 && (
        <S.OrdersContainer>
          {orders.map((order) => (
            <button type='button' key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>{order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </S.OrdersContainer>
      )}
    </S.Board>
  );
}
