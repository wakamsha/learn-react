import { HistoryStore } from './HistoryStore';
import { ListStore } from './ListStore';

const historyStore = new HistoryStore();
const listStore = new ListStore();

export const Stores = {
  historyStore,
  listStore,
} as const;
