import { useState } from 'react';
import { toast } from 'react-toastify';
import * as S from './styles';

import { api } from '../../utils/api';

import { Order } from '../../types/Order';

import { OrderModal } from '../OrderModal';


interface OrdersBoardProps {
  icon:string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export default function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}:OrdersBoardProps) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    try {
      setIsLoading(true);

      const status = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

      await api.patch(`/orders/${selectedOrder?._id}`, { status });

      toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`);
      onChangeOrderStatus(selectedOrder!._id, status);
      setIsLoading(false);
      setIsModalVisible(false);
    } catch {
      toast.success(`Não foi possivel alterar o status do pedido da mesa ${selectedOrder?.table}!`);
    }
  }

  async function handleCancelOrder() {
    try {
      setIsLoading(true);

      await api.delete(`/orders/${selectedOrder?._id}`);

      toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
      onCancelOrder(selectedOrder!._id);
      setIsLoading(false);
      setIsModalVisible(false);
    } catch {
      toast.success(`Não foi possivel cancelar o pedido da mesa ${selectedOrder?.table}!`);
    }
  }

  return (
    <S.Board>
      <OrderModal
        order={selectedOrder}
        visible={isModalVisible}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <S.OrdersContainer>
          {orders.map((order) => (
            <button type='button' key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </S.OrdersContainer>
      )}
    </S.Board>
  );
}
