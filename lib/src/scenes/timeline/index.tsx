import React, { ReactElement } from 'react';
import { IEvent } from '../../models/event';
import { IRange } from '../../models/range';

export type TimelineProps<T> = {
    events?: IEvent<T>[];
    ranges?: IRange<T>[];
    processData?: (data: T) => ReactElement;
};

export const Timeline: React.FC<TimelineProps<any>> = ({  }) => {
    return(
        <>This is a timeline</>
    );
};
