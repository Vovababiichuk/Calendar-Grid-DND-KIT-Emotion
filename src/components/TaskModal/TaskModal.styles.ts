import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  padding: 24px;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #64748b;

  &:hover {
    color: #1e293b;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  outline: none;
  border: none;
  box-shadow: none;
  background-color: #ffad33;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;

  &::placeholder {
    color: #fff;
    opacity: 0.9;
  }
`;

export const ColorPicker = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const ColorOption = styled.button<{ color: string; isSelected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: ${({ color }) => color};
  border: 2px solid ${({ isSelected }) => (isSelected ? '#1e293b' : 'transparent')};
  cursor: pointer;

  &:hover {
    border-color: #94a3b8;
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #1d4ed8;
  }
`;
