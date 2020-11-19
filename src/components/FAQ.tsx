import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import { FaqQuery } from '../generated/graphql';
import Accordion from './Accordion';
import { h1CSS } from './typography/Heading';

const query = graphql`
    query FAQ {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { glob: "/**/faq.md" } }
        ) {
            edges {
                node {
                    frontmatter {
                        faq {
                            question
                            answer
                        }
                    }
                }
            }
        }
    }
`;

const FAQ: FC = () => {
    const data = useStaticQuery<FaqQuery>(query);

    return (
        <Section>
            <Container>
                <SectionTitle>FAQ</SectionTitle>
                {data.allMarkdownRemark.edges.map((edge) =>
                    edge.node.frontmatter?.faq?.map((faq, index) => (
                        <Accordion key={index} faq={faq} />
                    ))
                )}
            </Container>
        </Section>
    );
};

const Section = styled.section`
    padding: 80px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
    padding: 0 15px;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        width: 750px;
    }
`;

const SectionTitle = styled.h2`
    ${h1CSS};
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 40px;
    text-align: center;

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        margin-bottom: 80px;
    }
`;

export default FAQ;
