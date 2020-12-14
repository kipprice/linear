import { css, SerializedStyles } from '@emotion/core';

export const fullWidthMixin = css`
    width: 100%;
`

export const fullHeightMixin = css`
    height: 100%;
`;

export type WithMixins = {
    mixins?: SerializedStyles;
}

export const combineMixins = (...mixins: SerializedStyles[]) => {
    let out: SerializedStyles = css``;

    for (let m of mixins) {
        out = css`
            ${out}; 
            ${m};
        `
    }

    return out;
}