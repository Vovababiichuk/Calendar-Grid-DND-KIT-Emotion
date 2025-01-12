import styled from '@emotion/styled';

export const Cell = styled.div<{ isCurrentMonth: boolean }>`
  background: ${({ isCurrentMonth }) => (isCurrentMonth ? '#fff' : '#f1f5f9')};
  min-height: 150px;
  height: 150px;
  padding: 8px;
  position: relative;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${({ isCurrentMonth }) => (isCurrentMonth ? '#f8fafc' : '#fff')};
  }
`;

export const DateLabel = styled.div<{ isCurrentMonth: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? '#64748b' : '#94a3b8')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Day = styled.span<{ isToday: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ isToday }) => (isToday ? 'white' : '#94a3b8')};
  background-color: ${({ isToday }) => (isToday ? '#ffa724' : 'transparent')};
  border-radius: 50%;
  padding: 4px 8px;
`;

export const TaskCount = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
`;

export const ContentContainer = styled.div`
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`;

export const HolidayList = styled.div`
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TaskList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 2px;
  }
`;
