import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import theme from '../constants/theme';
import GlobalStyle from '../globalStyling';

const Home: FC = () => {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Wrapper>
                    <Header />
                </Wrapper>
            </ThemeProvider>
        </>
    );
};

const Wrapper = styled.div`
    width: 100vw;
    height: 100%;
`;

export default Home;
