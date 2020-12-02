import React, { FC } from 'react';
import styled from 'styled-components';
import Body from './typography/Body';
import { h1CSS } from './typography/Heading';

const Footer: FC = () => (
    <Section>
        <Container>
            <Title>LET&apos;S SMASH YOUR GOALS TOGETHER</Title>
            <IconContainer>
                <BoltIcon className="fas fa-bolt" />
            </IconContainer>
            <Contact>
                <Text>
                    Questions, bookings or feedback? Contact me by any of the
                    channels below. I&apos;ll respond ASAP!
                </Text>
                <ContactInfo>P: 0417 374 992</ContactInfo>
                <ContactInfo>E: train@bendobson.net</ContactInfo>
            </Contact>
        </Container>
    </Section>
);

const Section = styled.footer`
    padding: 48px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.main};

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        padding: 96px 0;
    }
`;

const Container = styled.div`
    padding: 0 15px;
    display: flex;
    flex-direction: column;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        width: 750px;
        flex-direction: row;
        justify-content: center;

        > * {
            flex-basis: 50%;
        }
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        width: 970px;

        > * {
            flex-basis: 33%;
        }
    }
`;

const Title = styled.h2`
    ${h1CSS};
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 24px;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        line-height: 58px;
        margin-right: 15px;
    }
`;

const IconContainer = styled.div`
    display: none;

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const BoltIcon = styled.i`
    display: none;

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        font-size: 120px;
        display: inline-block;
        color: ${({ theme }) => theme.colors.white};
    }
`;

const Contact = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Text = styled(Body)`
    margin-bottom: 20px;
`;

const ContactInfo = styled(Body)`
    margin-bottom: 8px;
`;

export default Footer;
