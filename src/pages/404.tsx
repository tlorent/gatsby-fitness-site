import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Body from '../components/typography/Body';
import { h1CSS } from '../components/typography/Heading';
import theme from '../constants/theme';
import GlobalStyle from '../globalStyling';

const FourOhFour: FC<{ location: Location }> = ({ location }) => (
    <>
        <SEO title="404" url={location.href} />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <Wrapper>
                <PageTitle>This page does not exist.</PageTitle>
                <Body style={{ color: '#000' }}>
                    Please go back to the <Link to="/">homepage.</Link>
                </Body>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Wrapper>
        </ThemeProvider>
    </>
);

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 120px 0;
    position: relative;
    flex-direction: column;
`;

const PageTitle = styled.h1`
    ${h1CSS};
    margin-bottom: 30px;
`;

const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100vw;
`;

export default FourOhFour;
