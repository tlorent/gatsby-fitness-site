import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import About from '../components/About';
import Header from '../components/Header';
import Insights from '../components/Insights';
import Recommendations from '../components/Recommendations';
import Schedule from '../components/Schedule';
import SEO from '../components/SEO';
import Trainings from '../components/Trainings';
import theme from '../constants/theme';
import GlobalStyle from '../globalStyling';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home: FC<{ location: Location }> = ({ location }) => (
    <>
        <SEO url={location.href} title="/" />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Header />
                <About />
                <Trainings />
                <Schedule />
                <Recommendations />
                <Insights />
                <FAQ />
                <Footer />
            </Wrapper>
        </ThemeProvider>
    </>
);

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
`;

export default Home;
