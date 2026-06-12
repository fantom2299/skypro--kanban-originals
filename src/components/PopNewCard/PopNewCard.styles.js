import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(30, 42, 59, 0.45);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.15s;
`;

export const PopContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 680px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 28px;
  animation: slideUp 0.2s;
`;

export const TopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1e2a3b;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #94a6be;
  padding: 4px;
`;

export const Wrap = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #94a6be;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #d0dbe8;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4a6cf7;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #d0dbe8;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 90px;

  &:focus {
    outline: none;
    border-color: #4a6cf7;
  }
`;

export const CategoriesBlock = styled.div`
  margin-bottom: 20px;
`;

export const CategoriesTitle = styled.p`
  // ← ЭТОТ КОМПОНЕНТ ДОЛЖЕН БЫТЬ
  font-size: 12px;
  font-weight: 700;
  color: #94a6be;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
`;

export const CategoriesThemes = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const CategoryTheme = styled.div`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.15s;

  ${({ $variant, $active }) => {
    let bgColor, textColor;
    switch ($variant) {
      case "_orange":
        bgColor = "#fff4f2";
        textColor = "#f0603a";
        break;
      case "_green":
        bgColor = "#f0fbf8";
        textColor = "#05a081";
        break;
      case "_purple":
        bgColor = "#f3f0ff";
        textColor = "#7b61ff";
        break;
      default:
        bgColor = "#fff4f2";
        textColor = "#f0603a";
    }

    return `
      background: ${bgColor};
      color: ${textColor};
      ${$active ? `border-color: ${textColor};` : ""}
    `;
  }}
`;

export const CreateButton = styled.button`
  width: 100%;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #3a5ce6;
  }
`;
