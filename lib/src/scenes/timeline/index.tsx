import styled from '@emotion/styled';
import React, { ComponentType, useCallback, useMemo } from 'react';
import { Column, Row } from '../../components/Flex';
import { combineMixins, fullHeightMixin, fullWidthMixin } from '../../components/Mixins';
import { getRelativePositionToRange, getPaddedDateRange } from '../../helpers/dateHelpers';
import { IEvent, IRange, IPoint } from '../../models';
import { TimelineEvent } from './event';
import { TimelineRange } from './range';

export type TimelineProps<T> = {
    events?: IEvent<T>[];
    ranges?: IRange<T>[];
    eventChild?: ComponentType<{ data: T }>;
    rangeChild?: ComponentType<{ data: T }>;
    direction?: 'vertical' | 'horizontal';
};

export const Timeline: React.FC = <T extends any>({ 
    events, 
    ranges, 
    eventChild: EventChild, 
    rangeChild: RangeChild,
    direction = 'horizontal'
}: TimelineProps<T>) => {

    const dateRange = getPaddedDateRange(events || [], ranges || []);

    const formatRelativePositionToPoint = useCallback((date: Date): IPoint => {
        const percentage = getRelativePositionToRange(date, dateRange);
        let top = direction === 'vertical' ? percentage * 100 : 0;
        let left = direction === 'horizontal' ? percentage * 100 : 0;
        return { x: left, y: top, z: 0 };
    }, [dateRange]);

    const Parent = direction === 'horizontal' ? Row : Column

    return(
        <Parent horizontal='center' vertical='center' mixins={combineMixins(fullHeightMixin, fullWidthMixin)}>
            <Line direction={direction}>
            { ranges && ranges?.map((r) => (
                <TimelineRange<T> range={r}>
                    { RangeChild && <RangeChild data={r.data} /> }
                </TimelineRange> 
            ))}

            { events && events?.map((ev) => (
                <TimelineEvent<T> key={ev.instant.toString()} event={ev} position={formatRelativePositionToPoint(ev.instant)} lineWidth={10}>
                    { EventChild && <EventChild  data={ev.data} /> }
                </TimelineEvent> 
            ))}
            </Line>
        </Parent>
    );
};

const Line = styled.div<Pick<TimelineProps<any>, 'direction'>>`
    height: ${p => p.direction === 'vertical' ? '100vh' : '10px'};
    width: ${p => p.direction === 'horizontal' ? '100vw': '10px'};
    background-color: #333;
    position: relative;
`;