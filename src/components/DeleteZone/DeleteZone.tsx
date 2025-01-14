import { useDroppable } from '@dnd-kit/core';
import styled from '@emotion/styled';
import { Trash2 } from 'lucide-react';
import { DELETE_ZONE_ID } from '../../utils/constants';

const DeleteZone = styled.div<{ isVisible: boolean; isOver: boolean }>`
  position: fixed;
  height: 50px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => (props.isOver ? '#ef4444' : '#fee2e2')};
  color: ${props => (props.isOver ? 'white' : '#ef4444')};
  padding: 12px 24px 12px 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
  transition: all 0.2s ease-in-out;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

const DeleteText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

function DeleteDropZone({ isVisible }: { isVisible: boolean }) {
  const { setNodeRef, isOver } = useDroppable({
    id: DELETE_ZONE_ID,
  });

  return (
    <DeleteZone ref={setNodeRef} isVisible={isVisible} isOver={isOver}>
      <Trash2 className="absolute top-4 left-2 z-10" size={18} />
      <DeleteText>Drop here to delete task</DeleteText>
    </DeleteZone>
  );
}

export default DeleteDropZone;
