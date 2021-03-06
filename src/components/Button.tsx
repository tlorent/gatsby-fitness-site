import React, { FC, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { UnreachableCaseError } from '../entities/UnreachableCaseError';

type ButtonVariant = 'primary' | 'secondary';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: ButtonVariant;
}

const Button: FC<Props> = ({ label, variant, ...props }) => (
    <StyledButton variant={variant} {...props}>
        <span data-text={label}>{label}</span>
    </StyledButton>
);

const primaryCSS = css`
    background: transparent;
    color: ${({ theme }) => theme.colors.main};

    :hover {
        color: ${({ theme }) => theme.colors.white};
        background-color: ${({ theme }) => theme.colors.main};
    }
`;

const secondaryCSS = css`
    background-color: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.white};
`;

const getCSS = (variant: ButtonVariant) => {
    switch (variant) {
        case 'primary':
            return primaryCSS;
        case 'secondary':
            return secondaryCSS;
        default:
            throw new UnreachableCaseError(variant);
    }
};

const StyledButton = styled.button<Pick<Props, 'variant'>>`
    ${({ variant = 'primary' }) => getCSS(variant)};

    border: 2px solid ${({ theme }) => theme.colors.main};
    padding: 0 26px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    min-width: 200px;
    cursor: pointer;
    height: 50px;
    font-family: 'Roboto Condensed', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.3s ease;

    span {
        position: relative;
        transition: transform 0.3s ease;
    }

    :hover > span {
        transform: translateY(300%);
    }

    span:before {
        content: attr(data-text);
        position: absolute;
        top: -300%;
    }
`;

export default Button;
