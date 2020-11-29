import { IEvent } from './event';
import { IRange } from './range';

export interface IStore {
    events: IEvent<any>[];
    ranges: IRange<any>[];
}