import React, { ReactElement } from 'react';
import { IEvent } from '../../../models';
import styled from '@emotion/styled';
import { styles } from '../../../helpers/styles';
import { IPoint } from '../../../models/point';
import { Row } from '../../../components/Flex';
import { getLightOrDark } from '../../../helpers/luminance';

export type TimelineEventProps<T> = {
    event: IEvent<T>;
    children?: ReactElement;
    position?: IPoint;
    lineWidth?: number;
};

export const TimelineEvent = <T extends any>({ event, position, lineWidth, children }: TimelineEventProps<T>) => {

    const { title, description, color } = event;
    const lightOrDark = getLightOrDark(color || '#FFFF00');

    return(
        <StyledEvent color={color || '#FFFF00'} position={position || {}} lineWidth={lineWidth || 1} lightOrDark={lightOrDark}>
            <Row horizontal='center' vertical='center'>
                {title && <div>{title}</div>}
                {description && <div>{description}</div>}
                {children}
            </Row>
        </StyledEvent>
    );
};

const StyledEvent = styled.div<{ color: string, position: IPoint, lineWidth: number, lightOrDark: 'light' | 'dark' }>`
    background-color: ${p => p.color};
    border: 1px solid black;
    position: absolute;
    width: ${styles.eventSize.md}rem;
    height: ${styles.eventSize.md}rem;
    border-radius: 50%;
    top: calc(${p => p.position.y}% - ${p => p.lineWidth}px);
    left: calc(${p => p.position.x}% - ${p => p.lineWidth}px);
    transform-origin: 50% 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: 50% 50%;
    transition: all ease-in-out 0.1s;
    cursor: pointer;
    color: ${p => p.lightOrDark === 'light' ? 'black' : 'white'};

    :hover {
        transform: scale(1.2);
    }
`;
