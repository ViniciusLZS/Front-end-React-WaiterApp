import { Order } from '../../types/Order';

import * as S from './styles';

interface OrdersBoardProps {
  icon:string;
  title: string;

  orders: Order[];
}

export default function OrdersBoard({icon, title, orders}:OrdersBoardProps) {

  function handleOpenModal() {
    console.log('TEste');
  }

  return (
    <S.Board>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>(1)</span>
      </header>

      {orders.length > 0 && (
        <S.OrdersContainer>
          {orders.map((order) => (
            <button type='button' key={order._id} onClick={handleOpenModal}>
              <strong>{order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </S.OrdersContainer>
      )}
    </S.Board>
  );
}
