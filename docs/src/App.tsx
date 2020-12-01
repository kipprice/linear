import React from 'react';
import { Timeline, Gantt } from 'linear-react';
import { useSelector } from 'react-redux';
import { selectEvents, selectRanges } from './selectors';

export const App: React.FC = () => {
    const events = useSelector(selectEvents);
    const ranges = useSelector(selectRanges);

    return <>
        <Timeline events={events} ranges={ranges} direction='vertical' />
        <Gantt events={events} ranges={ranges} />
    </>;
}