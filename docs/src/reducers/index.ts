import type { Reducer, Action } from 'redux';
import { IEvent, IRange } from 'linear-react';

export const events: Reducer = (state: IEvent<any>[], action: Action<any>) => {
    return state || [];
}

export const ranges: Reducer = (state: IRange<any>[], action: Action<any>) => {
    return state || [];
}