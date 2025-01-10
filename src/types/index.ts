export interface Task {
  id: string;
  title: string;
  date: Date;
  order: number;
  colors: string[];
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}