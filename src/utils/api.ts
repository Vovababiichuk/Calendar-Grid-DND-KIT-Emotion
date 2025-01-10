export const fetchHolidays = async (year: number, countryCode: string) => {
  try {
    const response = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch holidays');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return [];
  }
};