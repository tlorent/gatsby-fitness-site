import { graphql } from 'gatsby';
import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Footer from '../components/Footer';
import InsightsWrapper from '../components/InsightsWrapper';
import SEO from '../components/SEO';
import theme from '../constants/theme';
import { InsightsQuery } from '../generated/graphql';
import GlobalStyle from '../globalStyling';

interface Props {
    data: InsightsQuery;
    location: Location;
}

const Blog: FC<Props> = ({ data, location }) => (
    <>
        <SEO title="Blog" url={location.href} />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <Wrapper>
                <InsightsWrapper data={data} />
                <Footer />
            </Wrapper>
        </ThemeProvider>
    </>
);

const Wrapper = styled.div`
    width: 100vw;
    height: 100%;
`;

export const query = graphql`
    query {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/blog/" } }
            sort: { fields: frontmatter___date, order: DESC }
        ) {
            edges {
                node {
                    frontmatter {
                        category
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;

export default Blog;
