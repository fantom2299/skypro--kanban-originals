import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
`;

export const Input = styled.input`
  padding-left: 10px;
  width: 262px;
  height: 30px;
  border-radius: 8px;
  border: ${(props) =>
    props.$error ? "1px solid red" : "0.7px solid rgba(148,166,190,.4)"};
  
    
  &::placeholder {
  color: #94a6be;
  font-size: 14px;
  font-weight: 400;
  opacity: 0.7;ёё  
`;

export const SubmitButton = styled.button`
  margin: 20px 0 0 0;
  width: 262px;
  height: 34px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  border: 0;
  color: white;
  cursor: pointer;
`;

export const ErrorText = styled.div`
  width: 247px;
  color: red;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
`;

export const Footer = styled.div`
  width: 217px;
  margin: 20px 0 0 0;
`;

export const FooterText = styled.p`
  font-size: 12px;
  text-align: center;
  color: rgba(148, 166, 190, 0.4);
`;

export const StyledLink = styled(Link)`
  color: rgba(148, 166, 190, 0.4);

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
