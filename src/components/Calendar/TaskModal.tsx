import styled from '@emotion/styled';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Task } from '../../types';

interface TaskModalProps {
  date: Date;
  task?: Task;
  onClose: () => void;
  onCreateTask: (title: string, colors: string[]) => void;
  onUpdateTask?: (taskId: string, title: string, colors: string[]) => void;
}

const Overlay = styled.div`
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

const Modal = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  padding: 24px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #64748b;

  &:hover {
    color: #1e293b;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
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

const ColorPicker = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const ColorOption = styled.button<{ color: string; isSelected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: ${props => props.color};
  border: 2px solid ${props => (props.isSelected ? '#1e293b' : 'transparent')};
  cursor: pointer;

  &:hover {
    border-color: #94a3b8;
  }
`;

const Button = styled.button`
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

const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#F44336', '#FF9800', '#607D8B'];

const TaskModal: React.FC<TaskModalProps> = ({
  date,
  task,
  onClose,
  onCreateTask,
  onUpdateTask,
}) => {
  const [title, setTitle] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

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
        onCreateTask(title.trim(), selectedColors);
      }
      onClose();
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
