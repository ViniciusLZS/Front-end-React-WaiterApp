import * as S from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrent } from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

export function OrderModal({visible, order, onClose}: OrderModalProps) {

  useEffect(() => {
    function handleKeyDrown(event: KeyboardEvent) {
      if(event.key === 'Escape') {
        onClose();
      }

    }

    document.addEventListener('keydown', handleKeyDrown);

    return () => {
      document.removeEventListener('keydown', handleKeyDrown);
    };
  }, [onClose]);

  if(!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, {product, quantity}) => {
    return total + (product.price * quantity);
  }, 0);

  return (
    <S.Overlay>
      <S.ModalBody>
        <header>
          <strong>{order.table}</strong>

          <button type='button' onClick={onClose}>
            <img src={closeIcon} alt="Icone para fechar" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕒️'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳️'}
              {order.status === 'DONE' && '✅️'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <S.OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({_id, product, quantity}) => (
              <div className='item' key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.imagePath}
                  width="56"
                  height="28"
                />

                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrent(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrent(total)}</strong>
          </div>
        </S.OrderDetails>

        <S.Actions>
          <button type='button' className='primary'>
            <span>👨‍🍳️</span>
            <strong>Iniciar produção</strong>
          </button>

          <button type='button' className='secondary'>
            <strong>Cancelar pedido</strong>
          </button>
        </S.Actions>
      </S.ModalBody>
    </S.Overlay>
  );
}
