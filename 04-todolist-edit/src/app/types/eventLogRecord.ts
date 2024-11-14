import { EventType } from './eventType';

export type EventLogRecord = {
  timestamp: number;
  type: EventType;
};
