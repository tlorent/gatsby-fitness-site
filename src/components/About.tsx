import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import Body from './typography/Body';
import { h1CSS, h5CSS } from './typography/Heading';

const query = graphql`
    query AboutQuery {
        allFile(filter: { name: { eq: "about" } }) {
            edges {
                node {
                    childMarkdownRemark {
                        frontmatter {
                            title
                            quote
                            about_text_paragraph_one
                            about_text_paragraph_two
                            about_text_paragraph_three
                        }
                    }
                }
            }
        }
    }
`;

const About: FC = () => {
    const data = useStaticQuery(query);

    const {
        title,
        quote,
        about_text_paragraph_one,
        about_text_paragraph_two,
        about_text_paragraph_three,
    } = data.allFile.edges[0].node.childMarkdownRemark.frontmatter;

    return (
        <Container>
            <TitleContainer>
                <Title>{title}</Title>
                <Quote as="h5">&quot;{quote}&quot;</Quote>
            </TitleContainer>
            <Line />
            <TextContainer>
                <Text size="tiny">{about_text_paragraph_one}</Text>
                {about_text_paragraph_two && (
                    <Text size="tiny">{about_text_paragraph_two}</Text>
                )}
                {about_text_paragraph_three && (
                    <Text size="tiny">{about_text_paragraph_three}</Text>
                )}
            </TextContainer>
        </Container>
    );
};

const Container = styled.section`
    padding: 80px 15px;
    display: flex;
    height: 100%;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.main};

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        flex-direction: row;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        justify-content: center;
    }
`;

const TitleContainer = styled.div`
    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        flex: 1;
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        text-align: right;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        flex: 0 0 33%;
        align-items: flex-end;
    }
`;

const Title = styled.h2`
    ${h1CSS};
    margin-bottom: 24px;
    color: ${({ theme }) => theme.colors.white};

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        line-height: 64px;
    }
`;

const Quote = styled.h5`
    ${h5CSS}
    font-style: italic;
    opacity: 0.75;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 400;

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        max-width: 50%;
    }
`;

const Line = styled.hr`
    display: block;
    border: none;
    border-top: 1px solid #ccc;
    margin: 24px 0;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        display: none;
    }
`;

const TextContainer = styled.div`
    flex: 0 0 58.33%;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        padding: 0 15px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        flex: 0 0 41.66%;
    }
`;

const Text = styled(Body)`
    color: ${({ theme }) => theme.colors.white2};
    font-weight: 300;
    margin-bottom: 24px;
`;

export default About;
