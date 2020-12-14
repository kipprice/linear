import React from 'react';
import { Timeline, Gantt } from 'linear-react';
import { useSelector } from 'react-redux';
import { selectEvents, selectRanges } from './selectors';
import styled from '@emotion/styled';

export const App: React.FC = () => {
    const events = useSelector(selectEvents);
    const ranges = useSelector(selectRanges);

    const direction = 'vertical';


    return (
        <Flex direction={direction}>
            <Timeline events={events} ranges={ranges} direction={direction} />
            <Gantt events={events} ranges={ranges} />
        </Flex>
    );
}

const Flex = styled.div<{ direction: 'horizontal' | 'vertical'}>`
    display: flex;
    flex-direction: ${p => p.direction === 'horizontal' ? 'column' : 'row'};
    width: 100%;
    height: 100%;

    > div {
        height: ${p => p.direction === 'horizontal' ? '50%' : 'auto'};
        width: ${p => p.direction === 'horizontal' ? 'auto' : '50%'};
    }

`;