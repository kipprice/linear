import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { events, ranges } from '../reducers';
import { add } from 'date-fns';
import { IEvent, IRange } from 'linear-react';

export interface IStore {
    events: IEvent<any>[];
    ranges: IRange<any>[];
}

const rootReducer = combineReducers({
    events,
    ranges
})

const RED = "#FF0000";
const YELLOW = "#FFDD00";
const GREEN = "#AAFF33";
const BLUE = "#0077FF";

const DEFAULT_EVENTS = [
  { title: "A", color: RED, instant: new Date() },
  { title: "B", color: YELLOW, instant: add(new Date(), { years: 1}) },
  { title: "C", color: BLUE, instant: add(new Date(), { years: 3 }) },
  { title: "D", color: YELLOW, instant: add(new Date(), { years: 4 })}
]

const DEFAULT_RANGES = [];

export const store = createStore<IStore, any, any, any>(
  rootReducer,
  { events: DEFAULT_EVENTS, ranges: [] },
  applyMiddleware(thunk)
);