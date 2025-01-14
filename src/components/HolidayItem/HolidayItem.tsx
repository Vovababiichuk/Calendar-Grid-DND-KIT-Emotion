import styled from '@emotion/styled';
import { Holiday } from '@/types/types';

const HolidayContainer = styled.div`
  display: inline-block;
  padding: 2px 4px;
  background: #f1f5f9;
  border-radius: 2px;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: #e2e8f0;
  }
`;

interface HolidayItemProps {
  holiday: Holiday;
}

const HolidayItem = ({ holiday }: HolidayItemProps) => {
  return <HolidayContainer title={holiday.name}>{holiday.name}</HolidayContainer>;
};

export default HolidayItem;
