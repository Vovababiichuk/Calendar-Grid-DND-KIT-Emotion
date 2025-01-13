import { useEffect, useState } from 'react';
import { fetchHolidays } from '../gateway/api';

export const useHolidays = (currentDate: Date) => {
  const [holidays, setHolidays] = useState([]);
  useEffect(() => {
    const loadHolidays = async () => {
      const year = currentDate.getFullYear();
      const data = await fetchHolidays(year, 'US');
      setHolidays(data);
    };
    loadHolidays();
  }, [currentDate]);

  return { holidays };
};
