import { IEvent, IRange } from '../models';
import {
    max,
    min,
    differenceInCalendarYears,
    differenceInCalendarMonths,
    differenceInCalendarWeeks,
    differenceInCalendarDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    addYears,
    addMonths,
    addWeeks,
    addDays,
    addHours,
    addMinutes,
    addSeconds,
    differenceInMilliseconds,
} from 'date-fns';
import { roundToPlace } from '../helpers/maths';
import { TIME_PADDING } from './constants';

export const getEventDateRange = (events: IEvent<any>[]) => {
    if (!events || events.length < 1) { return null; }

    const dates = events.map((e) => e.instant);

    return {
        start: min(dates),
        end: max(dates)
    };
};

export const getRangeDateRange = (ranges: IRange<any>[]) => {
    if (!ranges || ranges.length < 1) { return null; }

    const startDates = ranges.map((r) => r.start);
    const endDates = ranges.map((r) => r.end);

    return {
        start: min(startDates),
        end: max(endDates)
    };
};

export const getDateRange = (events: IEvent<any>[], ranges: IRange<any>[]) => {
    const eventRange = getEventDateRange(events);
    const rangeRange = getRangeDateRange(ranges);

    if (!eventRange && !rangeRange) { return null; }
    if (!eventRange) { return rangeRange; }
    if (!rangeRange) { return eventRange; }

    return {
        start: min([eventRange.start, rangeRange.start]),
        end: max([eventRange.end, rangeRange.end]),
    };
};

export const getPaddedDateRange = (
    events: IEvent<any>[],
    ranges: IRange<any>[]
) => {
    const range = getDateRange(events, ranges);
    if (!range) { return range; }
    
    const diffsToAdd = new Map<Function, Function>()
    diffsToAdd.set(differenceInCalendarYears, addYears);
    diffsToAdd.set(differenceInCalendarMonths, addMonths);
    diffsToAdd.set(differenceInCalendarWeeks, addWeeks);
    diffsToAdd.set(differenceInCalendarDays, addDays);
    diffsToAdd.set(differenceInHours, addHours);
    diffsToAdd.set(differenceInMinutes, addMinutes);
    diffsToAdd.set(differenceInSeconds, addSeconds);

    for (let [diffFn, addFn] of diffsToAdd) {
        const d = diffFn(range.end, range.start)

        if (d > 1) {
            range.start = addFn(range.start, -1 * TIME_PADDING);
            range.end = addFn(range.end, TIME_PADDING);
            break;
        }
    }

    return range;
};

export const getRelativePositionToRange = (date: Date, range: Pick<IRange<any>, 'start' | 'end'>): number => {
    if (!date || !range) { return -1; }

    const msInRange = differenceInMilliseconds(range.end, range.start);
    const msFromStartToDate = differenceInMilliseconds(date, range.start);

    const percentage = msFromStartToDate / msInRange;

    return roundToPlace(percentage, 100);
}
