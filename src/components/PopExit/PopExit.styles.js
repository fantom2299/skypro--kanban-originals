import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1000;
`;

export const PopExitBox = styled.div`
  width: 360px;
  padding: 32px;
  text-align: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.modal};
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const BaseButton = styled.button`
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
`;

export const ConfirmButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const CancelButton = styled(BaseButton)`
  background: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;
