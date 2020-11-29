import React, { ReactElement } from 'react';
import { IEvent, IRange } from '../../models';

export type GanttProps<T> = {
    events: IEvent<T>[];
    ranges: IRange<T>[];
    processData: (data: T) => ReactElement;
};

export const Gantt: React.FC<GanttProps<any>> = ({  }) => {
    return(
        <>This is Gantt</>
    );
};
