import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Task } from '../../types';
import {
  ColorStrip,
  ColorStrips,
  DragHandle,
  EditButton,
  TaskContainer,
  TaskContent,
  TaskInput,
} from './styles/task';

interface TaskItemProps {
  task: Task;
  onEdit: (taskId: string, newTitle: string) => void;
  isDragging?: boolean;
}

const TaskItem = ({ task, onEdit, isDragging = false }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(task.title);
    }
  };

  const handleSubmit = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue && trimmedValue !== task.title) {
      onEdit(task.id, trimmedValue);
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    handleSubmit();
  };

  return (
    <TaskContainer ref={setNodeRef} style={style} {...attributes} isDragging={isDragging}>
      <DragHandle {...listeners} isDragging={isDragging}>
        <GripVertical size={14} />
      </DragHandle>
      <ColorStrips>
        {task.colors.map(color => (
          <ColorStrip key={color} color={color} />
        ))}
      </ColorStrips>
      {isEditing ? (
        <TaskInput
          ref={inputRef}
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onClick={e => e.stopPropagation()}
        />
      ) : (
        <>
          <TaskContent>{task.title}</TaskContent>
          <EditButton className="edit-button" onClick={handleEditClick}>
            <Pencil className="hover:scale-110 transition duration-200 ease-in-out" size={14} />
          </EditButton>
        </>
      )}
    </TaskContainer>
  );
};

export default TaskItem;
