import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import About from '../components/About';
import Header from '../components/Header';
import Schedule from '../components/Schedule';
import SEO from '../components/SEO';
import Trainings from '../components/Trainings';
import theme from '../constants/theme';
import GlobalStyle from '../globalStyling';

const Home: FC = () => (
    <>
        <SEO />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Header />
                <About />
                <Trainings />
                <Schedule />
            </Wrapper>
        </ThemeProvider>
    </>
);

const Wrapper = styled.div`
    width: 100vw;
    height: 100%;
`;

export default Home;
