import styled from '@emotion/styled';

export const TaskContainer = styled.div<{ isDragging?: boolean }>`
  background: white;
  border-radius: 3px;
  box-shadow: ${props =>
    props.isDragging ? '0 5px 15px rgba(0, 0, 0, 0.15)' : '0 1px 0 rgba(9, 30, 66, 0.25)'};
  margin-bottom: 4px;
  position: relative;
  cursor: grab;
  display: flex;
  align-items: stretch;
  transform: ${props => (props.isDragging ? 'rotate(-2deg)' : 'none')};

  &:hover {
    background: #f8f9fa;
    .edit-button {
      opacity: 1;
    }
  }
`;

export const ColorStrips = styled.div`
  display: flex;
  gap: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  border-radius: 3px 3px 0 0;
  overflow: hidden;
`;

export const ColorStrip = styled.div<{ color: string }>`
  flex: 1;
  background: ${props => props.color};
`;

export const TaskContent = styled.div`
  padding: 6px 8px 6px 0;
  font-size: 0.8125rem;
  color: #172b4d;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  word-break: break-word;
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2px;
  color: #ff9800;
  cursor: grab;
  opacity: 0;
  transition: opacity 0.2s;
  margin-top: 2px;

  ${TaskContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #fffae3ff;
  }
`;

export const TaskInput = styled.input`
  flex-grow: 1;
  border: none;
  background: white;
  padding: 6px 8px;
  font-size: 0.8125rem;
  color: #172b4d;
  margin: 0;
  border-radius: 3px;

  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: -2px;
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 5px;
  right: 2px;
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  color: #ff9800;
  background-color: #fffae3ff;
  border-radius: 4px;
`;
