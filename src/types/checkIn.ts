export interface CheckIn {
  id: string;
  created: string;
  modified: string;
  duration: number;
  start_time: string;
  record_date: string;
  tag: string;
  activities: string;
}

export interface CheckInForm {
  duration: number;
  start_time: string;
  record_date: string;
  tag: string;
  activities: string;
}

export interface TextLogItem {
  tag: string;
  duration: number;
  activities: string[];
}

export type TextLog = Record<string, TextLogItem[]>;
