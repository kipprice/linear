import { IStore } from '../models/store';

export const selectRanges = (s: IStore) => s.ranges;

export const selectEvents = (s: IStore) => s.events;