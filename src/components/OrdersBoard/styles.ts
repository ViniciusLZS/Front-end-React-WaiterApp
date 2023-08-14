import styled from 'styled-components';

export const Board = styled.div`
  padding: 1.6rem;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 1.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  > header {
    padding: 0.8rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

export const OrdersContainer = styled.div`
  width: 100%;
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;

  button {
    width: 100%;
    height: 12.8rem;
    background: #fff;
    border: 1px solid rgba(204, 204, 204, 0.4);
    border-radius: 0.8rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;

    strong {
      font-weight: 500;
    }

    span {
      font-size: 1.4rem;
      color: #666;
    }

    & + button {
      margin-top: 2.4rem;
    }
  }
`;
