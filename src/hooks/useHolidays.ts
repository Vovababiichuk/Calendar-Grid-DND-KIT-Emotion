import { useEffect, useState } from 'react';
import { fetchHolidays } from '../gateway/api';
import { Holiday } from '../types/types';

export const useHolidays = (year: number) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const loadHolidays = async () => {
      const data = await fetchHolidays(year, 'US');
      setHolidays(data);
    };
    loadHolidays();
  }, [year]);

  return holidays;
};
