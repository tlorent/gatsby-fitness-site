import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

const Separator: FC<HTMLAttributes<HTMLHRElement>> = ({ ...props }) => (
    <Line {...props} />
);

const Line = styled.hr`
    display: block;
    border: none;
    border-top: 1px solid #ccc;
    margin: 24px 0;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        display: none;
    }
`;

export default Separator;
