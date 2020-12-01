import { IDisplayData } from './displayData';

export interface IRange<T> extends IDisplayData<T> {
    start: Date;
    end: Date;
}