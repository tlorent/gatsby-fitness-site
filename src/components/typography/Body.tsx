import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { UnreachableCaseError } from '../../entities/UnreachableCaseError';

type Size = 'regular' | 'tiny';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    size?: Size;
}

const Body: FC<Props> = ({ children, size = 'regular', ...props }) => {
    return (
        <Inner {...props} size={size}>
            {children}
        </Inner>
    );
};

const Inner = styled.p<Props>`
    font-size: ${({ size = 'regular' }) => {
        switch (size) {
            case 'regular':
                return 'clamp(13px, 2vw, 16px)';
            case 'tiny':
                return 'clamp(12px, 2vw, 13px)';
            default:
                throw new UnreachableCaseError(size);
        }
    }};

    line-height: 24px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.white};
`;

export default Body;
