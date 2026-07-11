import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(30, 42, 59, 0.45);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.15s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const PopExitBox = styled.div`
  background: var(--card-bg, #ffffff);
  border-radius: var(--radius, 10px);
  padding: 32px;
  width: 360px;
  text-align: center;
  box-shadow: 0 8px 40px rgba(30, 42, 59, 0.18);
  animation: slideUp 0.2s;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1e2a3b;
  margin-bottom: 8px;
`;

export const Message = styled.p`
  font-size: 14px;
  color: var(--text-secondary, #5a6a7e);
  margin-bottom: 24px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const CancelButton = styled.button`
  background: none;
  color: var(--text-primary, #1e2a3b);
  border: 1px solid var(--border, #d0dbe8);
  border-radius: var(--radius-sm, 4px);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: var(--accent-hover, #3a5ce6);
    color: #fff;
  }
`;

export const ConfirmButton = styled.button`
  background: none;
  color: var(--text-primary, #1e2a3b);
  border: 1px solid var(--border, #d0dbe8);
  border-radius: var(--radius-sm, 4px);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background:  #565eef;
    color: #fff;
  }
`;
