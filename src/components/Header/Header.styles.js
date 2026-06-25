import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
`;

export const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

export const Logo = styled.div`
  img {
    height: 32px;
    display: block;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
`;

export const NewTaskButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;
