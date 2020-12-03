import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import Slider from './Slider';

const query = graphql`
    query Recommendations {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/recommendations.md/i" } }
        ) {
            edges {
                node {
                    frontmatter {
                        recommendations {
                            quote
                            clientName
                            clientYearsActive
                            clientImage
                        }
                    }
                }
            }
        }
    }
`;

const Recommendations: FC = () => {
    const data = useStaticQuery(query);
    const {
        recommendations,
    } = data.allMarkdownRemark.edges[0].node.frontmatter;

    return (
        <Section>
            <Slider recommendations={recommendations} />
        </Section>
    );
};

const Section = styled.section`
    width: 100%;
`;

export default Recommendations;
