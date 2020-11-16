import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import Slider from './Slider';

const query = graphql`
    query Recommendations {
        allFile(filter: { name: { eq: "recommendations" } }) {
            edges {
                node {
                    name
                    childMarkdownRemark {
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
    }
`;

const Recommendations: FC = () => {
    const data = useStaticQuery(query);
    const {
        recommendations,
    } = data.allFile.edges[0].node.childMarkdownRemark.frontmatter;

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
