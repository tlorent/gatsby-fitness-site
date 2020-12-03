import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import { InsightsQuery } from '../generated/graphql';
import Button from './Button';
import InsightsWrapper from './InsightsWrapper';

const query = graphql`
    query Insights {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/blog/" } }
            limit: 3
            sort: { fields: [frontmatter___date], order: DESC }
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

const Insights: FC = () => {
    const data = useStaticQuery<InsightsQuery>(query);

    return (
        <Container>
            <InsightsWrapper data={data} />
            <Link to="/blog" style={{ textDecoration: 'none' }}>
                <Button label="Read all insights" />
            </Link>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 80px;
`;

export default Insights;
