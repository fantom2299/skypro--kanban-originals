import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  // background: ${({ theme }) => theme.colors.white};
  // border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  transition: background 0.3s ease, border-color 0.3s ease;
`;

export const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Logo = styled.div`
  img {
    width: 84px;
    height: 17px;
    display: block;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
  gap: 8px;
`;

export const NewTaskButton = styled.button`
  width: 178px;
  height: 30px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
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
  color: ${({ theme }) => theme.colors.textprimary};
  cursor: pointer;
  padding: 8px 0 8px 20px;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: background 0.15s;

  // &:hover {
  //   color: ${({ theme }) => theme.colors.background};
  // }
`;