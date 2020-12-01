import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { IRange } from '../../../models';

export type TimelineRangeProps<T> = {
    range: IRange<T>;
    children?: ReactElement;
};

export const TimelineRange = <T extends any>({ range, children }: TimelineRangeProps<T>) => {
    const { title, description, color } = range;

    return(
        <>
            {title && <>{title}</>}
            {description && <>{description}</>}
            <StyledRange color={color || 'blue'} />
            {children}
        </>
    );
};

const StyledRange = styled.div<{ color: string}>`
    background-color: ${p => p.color}
`;