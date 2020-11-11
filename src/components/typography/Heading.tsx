import React, { FC, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface Props extends HTMLAttributes<HTMLHeadingElement> {
    as: keyof Pick<
        JSX.IntrinsicElements,
        'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    >;
}

const Heading: FC<Props> = ({ children, as, ...props }) => (
    <Inner as={as} {...props}>
        {children}
    </Inner>
);

const h1CSS = css`
    font-size: clamp(32px, 5vw, 56px);
    line-height: 40px;
    text-transform: uppercase;
    font-weight: 600;
    font-style: italic;
`;

const h5CSS = css`
    font-style: normal;
    font-size: 16px;
    line-height: 25px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 300;
`;

const getCSS = (as: string) => {
    switch (as) {
        case 'h1':
            return h1CSS;
        case 'h5':
            return h5CSS;
        default:
            return h1CSS;
    }
};

const Inner = styled.h2<Props>`
    ${({ as }) => getCSS(as)}
    margin: 0;
    padding: 0;
    font-family: 'Roboto Condensed', sans-serif;

    /* override when necessary */
    color: ${({ theme }) => theme.colors.white};
`;

export default Heading;
