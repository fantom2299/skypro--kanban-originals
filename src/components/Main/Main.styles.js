import styled from 'styled-components';

export const MainWrapper = styled.main`
  flex: 1;
  padding: 40px 0;
`;

export const Content = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 8px;

  @media (max-width: 700px) {
    gap: 10px;
  }
`;
