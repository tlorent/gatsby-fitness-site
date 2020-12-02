import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import Body from './typography/Body';
import { h1CSS, h5CSS } from './typography/Heading';
import Img, { FluidObject } from 'gatsby-image';

const query = graphql`
    query Header {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/header.md/i" } }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        subtitle
                        headerImage {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        tagline
                    }
                }
            }
        }
    }
`;

const Header: FC = () => {
    const data = useStaticQuery(query);

    const {
        subtitle,
        tagline,
        title,
        headerImage,
    } = data.allMarkdownRemark.edges[0].node.frontmatter;

    return (
        <Container>
            <ImageContainer>
                <Image alt={title} fluid={headerImage.childImageSharp.fluid} />
            </ImageContainer>
            <Content>
                <MainTitle>{title}</MainTitle>
                <SubTitle>{subtitle}</SubTitle>
                <Tagline>&quot;{tagline}&quot;</Tagline>
            </Content>
        </Container>
    );
};

const Container = styled.header`
    width: 100%;
    height: 100%;
    position: relative;
`;

const Image = styled(Img)<{ fluid: FluidObject | FluidObject[] }>`
    height: 100vh;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        height: 80vh;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        height: 90vh;
    }
`;

const ImageContainer = styled.div`
    width: 100vw;

    position: relative;

    :before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #292929;
        opacity: 0.3;
        z-index: 2;
    }
`;

const MainTitle = styled.h1`
    ${h1CSS};
    color: ${({ theme }) => theme.colors.white};
`;

const SubTitle = styled.h2`
    ${h5CSS};
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 32px;
    margin-top: 8px;
`;

const Content = styled.section`
    padding: 0 15px;
    z-index: 3;
    position: absolute;
    top: 30%;
    left: 10%;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        padding: 0 85px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        padding: 0 115px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.xl}) {
        padding: 0 155px;
    }
`;

const Tagline = styled(Body)`
    @media (min-width: ${({ theme }) => theme.mediaQueries.xs}) {
        width: 50%;
    }
`;

export default Header;
