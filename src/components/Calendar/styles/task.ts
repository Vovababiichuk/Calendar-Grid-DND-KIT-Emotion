import styled from '@emotion/styled';

export const TaskContainer = styled.div`
  background: white;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  margin-bottom: 4px;
  position: relative;
  cursor: grab;

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
  height: 3px;
  border-radius: 3px 3px 0 0;
  overflow: hidden;
`;

export const ColorStrip = styled.div<{ color: string }>`
  flex: 1;
  background: ${props => props.color};
`;

export const TaskContent = styled.div`
  padding: 6px 8px;
  font-size: 0.8125rem;
  color: #172b4d;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  word-break: break-word;
`;

export const EditButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  color: #64748b;

  &:hover {
    color: #1e293b;
  }
`;
