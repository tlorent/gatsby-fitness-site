import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import Body from './typography/Body';
import { h1CSS, h5CSS } from './typography/Heading';

const query = graphql`
    query Header {
        allFile(filter: { name: { eq: "header" } }) {
            edges {
                node {
                    childMarkdownRemark {
                        frontmatter {
                            subtitle
                            tagline
                            title
                        }
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
    } = data.allFile.edges[0].node.childMarkdownRemark.frontmatter;

    return (
        <Container>
            <Content>
                <MainTitle>{title}</MainTitle>
                <SubTitle>{subtitle}</SubTitle>
                <Tagline>&quot;{tagline}&quot;</Tagline>
            </Content>
        </Container>
    );
};

const Container = styled.header`
    padding: 180px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-image: url('https://images.unsplash.com/photo-1600181957705-92f267a2740e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80');
    background-color: #292929;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
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

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        padding: 240px 0;
    }
`;

const MainTitle = styled.h1`
    ${h1CSS};
    color: ${({ theme }) => theme.colors.white};
`;

const SubTitle = styled.h5`
    ${h5CSS};
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 32px;
    margin-top: 8px;
`;

const Content = styled.section`
    padding: 0 15px;
    z-index: 3;

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
    width: 60%;

    @media (min-width: ${({ theme }) => theme.mediaQueries.small}) {
        width: 50%;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        width: 30%;
    }
`;

export default Header;
