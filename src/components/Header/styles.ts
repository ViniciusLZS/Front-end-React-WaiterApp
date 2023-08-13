import styled from 'styled-components';

export const Container = styled.header`
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 19.8rem;
  max-width: 121.6rem;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    h1 {
      color: #fff;
      font-size: 3.2rem;
    }

    h2 {
      color: #fff;
      font-weight: 400;
      font-size: 1.6rem;
      opacity: 0.9;
      margin-top: 0.6rem;
    }
  }
`;
