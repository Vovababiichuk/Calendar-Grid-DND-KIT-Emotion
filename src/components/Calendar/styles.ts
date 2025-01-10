import styled from '@emotion/styled';

export const CalendarContainer = styled.div`
  background: #f1f2f4;
  min-height: 100vh;
`;

export const Header = styled.div`
  background: #ff9800;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin-bottom: 0;
`;

export const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MonthTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ViewButton = styled.button<{ active: boolean }>`
  background: ${props => (props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent')};
  border: none;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const TodayButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const Grid = styled.div<{ isWeekView: boolean }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f1f2f4;
  border: 1px solid #e4e6e8;
  margin: 0 20px;
`;

export const WeekdayHeader = styled.div`
  padding: 10px;
  text-align: center;
  font-weight: 500;
  color: #666;
  border-bottom: 1px solid #e4e6e8;
  border-right: 1px solid #e4e6e8;
  background: #f8f9fa;
  font-size: 0.875rem;

  &:last-child {
    border-right: none;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 200px;
  margin-right: 12px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 6px 12px 6px 32px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.875rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
  }
`;
