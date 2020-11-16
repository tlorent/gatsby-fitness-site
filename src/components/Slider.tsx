import React, { FC, HTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import { h4CSS } from './typography/Heading';

interface Recommendation {
    quote: string;
    clientName: string;
    clientYearsActive: number;
    clientImage: string;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
    recommendations: Recommendation[];
}

const Slider: FC<Props> = ({ recommendations, ...props }) => {
    const [current, setCurrent] = useState(recommendations[0]);
    const [active, setActive] = useState(0);

    const handleSetClick = (index: number) => {
        setCurrent(recommendations[index]);
        setActive(index);
    };

    return (
        <Container imageURL={current.clientImage} {...props}>
            <Quote>{current.quote}</Quote>
            <ClientInfo>
                {current.clientName} &ndash; client of{' '}
                {current.clientYearsActive}{' '}
                {current.clientYearsActive === 1 ? 'year' : 'years'}
            </ClientInfo>
            <CirclesWrapper>
                {recommendations.map((_, index) => (
                    <Circle
                        key={index}
                        data-quote={index}
                        onClick={() => handleSetClick(index)}
                        onKeyPress={() => handleSetClick(index)}
                        role="button"
                        tabIndex={0}
                        active={active}
                    />
                ))}
            </CirclesWrapper>
        </Container>
    );
};

const Container = styled.div<{ imageURL: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 50px;
    text-align: center;
    background-image: ${({ imageURL }) =>
        `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${imageURL})`};
    background-position: center 30%;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 300px;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        min-height: 400px;
    }
`;

const ClientInfo = styled.h6`
    color: ${({ theme }) => theme.colors.white};
    letter-spacing: 2px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: 'Roboto Condensed', sans-serif;
`;

const Quote = styled.h4`
    ${h4CSS};
    margin-bottom: 8px;
    text-transform: uppercase;
    font-style: italic;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    line-height: 32px;
`;

const CirclesWrapper = styled.div`
    margin-top: 8px;
    display: flex;
`;

const Circle = styled.span<{ active: number }>`
    height: 20px;
    width: 20px;
    margin: 0 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: 0;

    ${({ active }) =>
        css`
            &[data-quote='${active}']::before {
                background-color: ${({ theme }) => theme.colors.greyDark};
            }
        `}

    :hover::before {
        background-color: ${({ theme }) => theme.colors.greyDark};
    }

    :before {
        content: '';
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.greyLight};
        transition: background-color 0.3s ease;
    }
`;

export default Slider;
