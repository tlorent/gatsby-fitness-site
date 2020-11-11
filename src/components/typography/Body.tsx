import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

const Body: FC<HTMLAttributes<HTMLParagraphElement>> = ({
    children,
    ...props
}) => {
    return <Inner {...props}>{children}</Inner>;
};

const Inner = styled.p`
    font-size: clamp(13px, 2vw, 16px);
    line-height: 24px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.white};
`;

export default Body;
