// src/components/Main/Card.styles.js
import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

export const CardWrapper = styled.div`
  background: var(--card-bg, #ffffff);
  border-radius: var(--radius, 12px);
  padding: 14px;
  border: 1px solid var(--border, #d0dbe8);
  box-shadow: var(--shadow-card, 0 1px 6px rgba(30, 42, 59, 0.07));
  transition:
    box-shadow 0.15s,
    transform 0.15s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 20px rgba(74, 108, 247, 0.13);
    transform: translateY(-1px);
  }
`;

export const CardGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CardTheme = styled.div`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;

  ${({ $variant }) => {
    switch ($variant) {
      case "_orange":
        return `
          background: #fff4f2;
          color: #f0603a;
        `;
      case "_green":
        return `
          background: #f0fbf8;
          color: #05a081;
        `;
      case "_purple":
        return `
          background: #f3f0ff;
          color: #7b61ff;
        `;
      default:
        return `
          background: #fff4f2;
          color: #f0603a;
        `;
    }
  }}
`;

export const CardId = styled.div`
  font-size: 10px;
  color: #94a6be;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: 8px;
`;

export const CardButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
  cursor: pointer;

  div {
    width: 4px;
    height: 4px;
    background: #94a6be;
    border-radius: 50%;
  }
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary, #1e2a3b);
  margin-bottom: 8px;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted, #94a6be);
  font-size: 12px;
`;
