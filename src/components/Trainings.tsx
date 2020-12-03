import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Body from './typography/Body';
import { h1CSS } from './typography/Heading';
import Img, { FluidObject } from 'gatsby-image';

const query = graphql`
    query Trainings {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/training.md/i" } }
        ) {
            edges {
                node {
                    frontmatter {
                        titleIndividual
                        individualExplanation
                        individualBenefits
                        individualImage {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        titleGroup
                        groupExplanation
                        groupImage {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        groupBenefits
                    }
                }
            }
        }
    }
`;

const Trainings: FC = () => {
    const data = useStaticQuery(query);

    const {
        titleIndividual,
        individualExplanation,
        individualBenefits,
        individualImage,
        titleGroup,
        groupExplanation,
        groupBenefits,
        groupImage,
    } = data.allMarkdownRemark.edges[0].node.frontmatter;

    return (
        <Container>
            <TrainingBlock>
                <Image
                    alt={titleIndividual}
                    fluid={individualImage.childImageSharp.fluid}
                />
                <Content>
                    <Title>{titleIndividual}</Title>
                    <Explanation size="tiny">
                        {individualExplanation}
                    </Explanation>
                    <Benefits>
                        {individualBenefits.map(
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
                    alt={titleGroup}
                    style={{ order: 2 }}
                    fluid={groupImage.childImageSharp.fluid}
                />
                <Content>
                    <Title>{titleGroup}</Title>
                    <Explanation size="tiny">{groupExplanation}</Explanation>
                    <Benefits>
                        {groupBenefits.map((benefit: string, i: number) => (
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
        width: 50%;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        padding: 48px 5%;
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

const Image = styled(Img)<{ fluid: FluidObject | FluidObject[] }>`
    width: 100%;
    margin-bottom: 48px;
    max-height: 250px;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        width: 50%;
        margin-bottom: 0;
        max-height: none;
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
