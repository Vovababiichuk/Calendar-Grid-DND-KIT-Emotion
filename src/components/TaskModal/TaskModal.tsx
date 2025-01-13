import confetti from 'canvas-confetti';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Task } from '../../types/types';
import {
  Button,
  CloseButton,
  ColorOption,
  ColorPicker,
  ErrorMessage,
  Form,
  Header,
  Input,
  Modal,
  Overlay,
  Title,
} from './TaskModal.styles';

interface TaskModalProps {
  date: Date;
  task?: Task;
  onClose: () => void;
  onCreateTask: (title: string, colors: string[]) => void;
  onUpdateTask?: (taskId: string, title: string, colors: string[]) => void;
}

const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#FF9800', '#607D8B'];

const TaskModal = ({ date, task, onClose, onCreateTask, onUpdateTask }: TaskModalProps) => {
  const [title, setTitle] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setSelectedColors(task.colors);
    } else {
      setSelectedColors([colors[0]]);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (task && onUpdateTask) {
        onUpdateTask(task.id, title.trim(), selectedColors);
      } else {
        toast.success('Task created successfully! 🎉', {
          position: 'top-center',
        });
        confetti({ particleCount: 200, spread: 120, origin: { y: 1 } });
        onCreateTask(title.trim(), selectedColors);
      }
      onClose();
    } else {
      toast.error('Field cannot be empty! 🛑', {
        position: 'top-center',
      });
      setError('Task title is required!');
    }
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      }
      return [...prev, color];
    });
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Header>
          <Title>
            {task ? 'Edit Task' : 'Create Task'} for {format(date, 'MMMM d, yyyy')}
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              placeholder="Task title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ColorPicker>
              {colors.map(color => (
                <ColorOption
                  key={color}
                  color={color}
                  isSelected={selectedColors.includes(color)}
                  onClick={() => toggleColor(color)}
                  type="button"
                />
              ))}
            </ColorPicker>
          </div>
          <Button type="submit">{task ? 'Update Task' : 'Create Task'}</Button>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default TaskModal;
