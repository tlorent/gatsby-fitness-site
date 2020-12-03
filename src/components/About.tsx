import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import Separator from './Separator';
import Body from './typography/Body';
import { h1CSS, h5CSS } from './typography/Heading';

const query = graphql`
    query About {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/about.md/i" } }
        ) {
            edges {
                node {
                    html
                    frontmatter {
                        title
                        quote
                    }
                }
            }
        }
    }
`;

const About: FC = () => {
    const data = useStaticQuery(query);

    const {
        html,
        frontmatter: { title, quote },
    } = data.allMarkdownRemark.edges[0].node;

    return (
        <Container>
            <TitleContainer>
                <Title>{title}</Title>
                <Quote>&quot;{quote}&quot;</Quote>
            </TitleContainer>
            <Separator />
            <TextContainer>
                <Text size="tiny" dangerouslySetInnerHTML={{ __html: html }} />
            </TextContainer>
        </Container>
    );
};

const Container = styled.section`
    padding: 40px 15px;
    display: flex;
    height: 100%;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.main};

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        flex-direction: row;
        padding: 80px 15px;
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

    @media (min-width: ${({ theme }) => theme.mediaQueries.huge}) {
        flex: 0 0 12%;
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

const Quote = styled.h3`
    ${h5CSS}
    font-style: italic;
    opacity: 0.75;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 400;

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        max-width: 50%;
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

    @media (min-width: ${({ theme }) => theme.mediaQueries.huge}) {
        flex: 0 0 21.66%;
    }
`;

const Text = styled(Body)`
    color: ${({ theme }) => theme.colors.white2};
    font-weight: 300;
    margin-bottom: 24px;

    p {
        margin-bottom: 12px;
    }
`;

export default About;
