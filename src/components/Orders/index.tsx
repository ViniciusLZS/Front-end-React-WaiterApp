import { Order } from '../../types/Order';
import OrdersBoard  from '../OrdersBoard';
import * as S from './styles';

const orders: Order[] = [
  {
    '_id': '64d682f8cbf1644c59d87cee',
    'table': '123',
    'status': 'WAITING',
    'products': [
      {
        'product': {
          'name': 'Pizza quatro queijos',
          'imagePath': '1691776186519-quatro-queijos.png',
          'price': 40,
        },
        'quantity': 3,
        '_id': '64d682f8cbf1644c59d87cef'
      },
      {
        'product': {
          'name': 'Coca cola',
          'imagePath': '1691778542411-coca-cola.png',
          'price': 7,
        },
        'quantity': 2,
        '_id': '64d682f8cbf1644c59d87cf0'
      }
    ],
  }
];

export default function Orders() {
  return (
    <S.Container>
      <OrdersBoard
        icon="🕒️"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👨‍🍳️"
        title="Em preparação"
        orders={[]}
      />
      <OrdersBoard
        icon="✅️"
        title="Pronto!"
        orders={[]}
      />
    </S.Container>
  );
}
