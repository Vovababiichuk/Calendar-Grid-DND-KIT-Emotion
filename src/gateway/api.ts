export const fetchHolidays = async (year: number, countryCode: string) => {
  try {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    if (!res.ok) {
      throw new Error('Failed to fetch holidays');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return [];
  }
};
