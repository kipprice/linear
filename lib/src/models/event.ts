import { IDisplayData } from './displayData';

export interface IEvent<T> extends IDisplayData<T> {
    instant: Date;
}