import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil } from 'lucide-react';
import { Task } from '../../types';
import { ColorStrip, ColorStrips, EditButton, TaskContainer, TaskContent } from './styles/task';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
}

const TaskItem = ({ task, onEdit }: TaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskContainer ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ColorStrips>
        {task.colors.map(color => (
          <ColorStrip key={color} color={color} />
        ))}
      </ColorStrips>
      <TaskContent>{task.title}</TaskContent>
      <EditButton className="edit-button" onClick={onEdit}>
        <Pencil size={14} />
      </EditButton>
    </TaskContainer>
  );
};

export default TaskItem;
