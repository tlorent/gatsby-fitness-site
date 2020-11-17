import { graphql } from 'gatsby';
import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import InsightsWrapper from '../components/InsightsWrapper';
import theme from '../constants/theme';
import { InsightsQuery } from '../generated/graphql';
import GlobalStyle from '../globalStyling';

interface Props {
    data: InsightsQuery;
}

const Blogs: FC<Props> = ({ data }) => (
    <>
        {/* <SEO /> */}
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <Wrapper>
                <InsightsWrapper data={data} />
            </Wrapper>
        </ThemeProvider>
    </>
);

const Wrapper = styled.div`
    width: 100vw;
    height: 100%;
`;

// TODO: fragment.
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

export default Blogs;
