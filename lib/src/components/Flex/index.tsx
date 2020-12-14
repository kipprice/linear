import styled from '@emotion/styled';
import { combineMixins, WithMixins } from '../Mixins';

type FlexType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';

type FlexProps = WithMixins & {
    vertical: FlexType;
    horizontal: FlexType;
}

export const Row = styled.div<FlexProps>`
    display: flex;
    flex-direction: row;
    justify-content: ${p => p.horizontal || 'center'};
    align-items: ${p => p.vertical || 'center'};

    ${p => p.mixins};
`;

export const Column = styled.div<FlexProps>`
    display: flex;
    flex-direction: column;
    justify-content: ${p => p.vertical || 'center'};
    align-items: ${p => p.horizontal || 'center'};

    ${p => p.mixins};
`;