import { graphql } from 'gatsby';
import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Separator from '../components/Separator';
import Body from '../components/typography/Body';
import { h1CSS } from '../components/typography/Heading';
import theme from '../constants/theme';
import { MarkdownRemarkFrontmatter } from '../generated/graphql';
import GlobalStyle from '../globalStyling';

interface Props {
    data: {
        markdownRemark: {
            frontmatter: Pick<
                MarkdownRemarkFrontmatter,
                | 'category'
                | 'title'
                | 'date'
                | 'text'
                | 'author'
                | 'author_image'
            >;
        };
    };
    location: Location;
}

const BlogPost: FC<Props> = ({ data, location }) => {
    const {
        title,
        text,
        category,
        date,
        author,
        author_image,
    } = data.markdownRemark.frontmatter;

    return (
        <>
            <SEO
                title={title ?? 'Blog post'}
                url={location.href}
                isBlogPost
                description={title}
            />
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Section>
                    <Container>
                        <BlogTitle>{title}</BlogTitle>
                        <BlogInfo>
                            <Info size="tiny">
                                {date} in {category}
                            </Info>
                            <Author>
                                <AuthorImage url={author_image ?? '/'} />
                                <AuthorInfo>
                                    <AuthorName size="tiny">
                                        {author}
                                    </AuthorName>
                                    <AuthorJob size="tiny">
                                        Personal Trainer
                                    </AuthorJob>
                                </AuthorInfo>
                            </Author>
                        </BlogInfo>
                        <StyledSeparator />
                        <BlogText>{text}</BlogText>
                    </Container>
                </Section>
                <Footer />
            </ThemeProvider>
        </>
    );
};

const Section = styled.section`
    padding: 80px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        width: 750px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        width: 970px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.xl}) {
        width: 1170px;
    }
`;

const BlogTitle = styled.h1`
    ${h1CSS};
    text-align: center;
    text-transform: uppercase;
    font-style: italic;
    line-height: 60px;
`;

const BlogInfo = styled.div`
    color: ${({ theme }) => theme.colors.greyDark};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BlogText = styled(Body)`
    color: ${({ theme }) => theme.colors.black};
    max-width: 60%;
    margin-top: 20px;
`;

const Info = styled(Body)`
    color: ${({ theme }) => theme.colors.greyDark};
`;

const Author = styled.div`
    margin-top: 12px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.greyDark};
`;

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const AuthorName = styled(Body)`
    color: ${({ theme }) => theme.colors.greyDark};
    font-weight: 700;
    text-transform: uppercase;
`;

const AuthorImage = styled.div<{ url: string }>`
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.greyDark};
    height: 40px;
    width: 40px;
    margin-right: 8px;
    background-image: ${({ url }) => `url(${url})`};
    background-position: 80% center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const AuthorJob = styled(Body)`
    color: ${({ theme }) => theme.colors.greyDark};
    margin-top: -3px;
    font-style: italic;
`;

const StyledSeparator = styled(Separator)`
    border-top: 2px solid ${({ theme }) => theme.colors.main};
    display: block;
    width: 250px;
    margin-top: 40px;
`;

export const query = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                category
                title
                date(formatString: "DD MMMM, YYYY")
                text
                author
                author_image
            }
            fields {
                slug
            }
        }
    }
`;

export default BlogPost;
