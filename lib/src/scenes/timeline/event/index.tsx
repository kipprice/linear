import React, { ReactElement } from 'react';
import { IEvent } from '../../../models';
import styled from '@emotion/styled';
import { styles } from '../../../helpers/styles';
import { IPoint } from '../../../models/point';

export type TimelineEventProps<T> = {
    event: IEvent<T>;
    children?: ReactElement;
    position?: IPoint;
    lineWidth?: number;
};

export const TimelineEvent = <T extends any>({ event, position, children }: TimelineEventProps<T>) => {

    const { title, description, color } = event;

    return(
        <StyledEvent color={color || 'yellow'} position={position || {}}>
            {title && <div>{title}</div>}
            {description && <div>{description}</div>}
            {children}
        </StyledEvent>
    );
};

const StyledEvent = styled.div<{ color: string, position: IPoint }>`
    background-color: ${p => p.color};
    position: absolute;
    width: ${styles.eventSize.md}rem;
    height: ${styles.eventSize.md}rem;
    border-radius: 50%;
    top: ${p => p.position.y}%;
    left: ${p => p.position.x}%;
    transform-origin: 50% 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
