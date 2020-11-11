import React, { FC } from 'react';
import styled from 'styled-components';
import Body from './typography/Body';
import Heading from './typography/Heading';

const Header: FC = () => (
    <Container>
        <Content>
            <Heading as="h1">ben dobson</Heading>
            <Heading as="h5" style={{ marginBottom: '32px', marginTop: '8px' }}>
                Personal Training &amp; Dietary Advice
            </Heading>
            <Tagline>
                &quot;Everyone deserves good health and happiness. My goal is to
                help people achieve both.&quot;
            </Tagline>
        </Content>
    </Container>
);

const Container = styled.header`
    padding: 180px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-image: url('https://images.unsplash.com/photo-1600181957705-92f267a2740e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80');
    background-color: #292929;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;

    :before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #292929;
        opacity: 0.3;
        z-index: 2;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        padding: 240px 0;
    }
`;

const Content = styled.section`
    padding: 0 15px;
    z-index: 3;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        padding: 0 85px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        padding: 0 115px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.xl}) {
        padding: 0 155px;
    }
`;

const Tagline = styled(Body)`
    width: 60%;

    @media (min-width: ${({ theme }) => theme.mediaQueries.small}) {
        width: 50%;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        width: 30%;
    }
`;

export default Header;
