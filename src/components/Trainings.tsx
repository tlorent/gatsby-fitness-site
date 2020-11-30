import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Body from './typography/Body';
import { h1CSS } from './typography/Heading';

const query = graphql`
    query Trainings {
        allFile(filter: { name: { eq: "training" } }) {
            edges {
                node {
                    childMarkdownRemark {
                        frontmatter {
                            title_individual
                            individual_explanation
                            individual_image
                            individual_benefits
                            title_group
                            group_explanation
                            group_image
                            group_benefits
                        }
                    }
                }
            }
        }
    }
`;

const Trainings: FC = () => {
    const data = useStaticQuery(query);

    const {
        title_individual,
        individual_explanation,
        individual_image,
        individual_benefits,
        title_group,
        group_explanation,
        group_image,
        group_benefits,
    } = data.allFile.edges[0].node.childMarkdownRemark.frontmatter;

    return (
        <Container>
            <TrainingBlock>
                <Image
                    src={individual_image}
                    alt={title_individual}
                    height={500}
                    width={700}
                />
                <Content>
                    <Title>{title_individual}</Title>
                    <Explanation size="tiny">
                        {individual_explanation}
                    </Explanation>
                    <Benefits>
                        {individual_benefits.map(
                            (benefit: string, i: number) => (
                                <li key={i}>{benefit}</li>
                            )
                        )}
                    </Benefits>
                    <Button
                        label="BOOK A SESSION NOW"
                        style={{ marginTop: '32px' }}
                    />
                </Content>
            </TrainingBlock>
            <TrainingBlock style={{ backgroundColor: '#f8f8f8' }}>
                <Image
                    src={group_image}
                    alt={title_group}
                    style={{ order: 2 }}
                    height={500}
                    width={700}
                />
                <Content>
                    <Title>{title_group}</Title>
                    <Explanation size="tiny">{group_explanation}</Explanation>
                    <Benefits>
                        {group_benefits.map((benefit: string, i: number) => (
                            <li key={i}>{benefit}</li>
                        ))}
                    </Benefits>
                    <Button
                        label="BOOK A SESSION NOW"
                        style={{ marginTop: '32px' }}
                    />
                </Content>
            </TrainingBlock>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    height: 100%;
    padding: 0 15px 48px;

    @media (min-width: ${({ theme }) => theme.mediaQueries.small}) {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        padding: 48px 5%;
        padding-top: 0;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        padding: 48px 5%;
        width: 50%;
    }
`;

const TrainingBlock = styled.div`
    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        display: flex;

        :first-of-type {
            ${Content} {
                text-align: initial;
                align-items: flex-start;
            }
        }

        :nth-of-type(2) {
            ${Content} {
                text-align: right;
                align-items: flex-end;
            }
        }
    }
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    margin-bottom: 48px;
    object-fit: cover;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        width: 50%;
        margin-bottom: 0;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.xl}) {
        max-height: 500px;
    }
`;

const Title = styled.h2`
    ${h1CSS};
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 24px;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        margin: 36px 0 24px;
    }
`;

const Explanation = styled(Body)`
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 24px;

    @media (min-width: ${({ theme }) => theme.mediaQueries.small}) {
        max-width: 50%;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        max-width: 80%;
    }
`;

const Benefits = styled.ul`
    list-style: none;

    > li {
        margin-bottom: 18px;
        letter-spacing: 2px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 12px;
        font-family: 'Roboto Condensed', sans-serif;
    }
`;

export default Trainings;
