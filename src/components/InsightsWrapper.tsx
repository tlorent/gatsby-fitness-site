import React, { FC } from 'react';
import styled from 'styled-components';
import { InsightsQuery } from '../generated/graphql';
import InsightCard from './InsightCard';
import { h1CSS } from './typography/Heading';

interface Props {
    data: InsightsQuery;
}

const InsightsWrapper: FC<Props> = ({ data }) => {
    return (
        <Section>
            <Container>
                <SectionTitle>Insights</SectionTitle>
                <InsightCards>
                    {data.allMarkdownRemark.edges.map((edge, index) => (
                        <InsightCard
                            key={index}
                            url={edge.node.fields?.slug}
                            insight={edge?.node?.frontmatter}
                        />
                    ))}
                </InsightCards>
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
`;

const Container = styled.div`
    padding: 0 15px;

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

const SectionTitle = styled.h2`
    ${h1CSS};
    opacity: 0.25;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 40px;
    text-align: center;

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        margin-bottom: 80px;
    }
`;

const InsightCards = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        flex-direction: row;
    }
`;

export default InsightsWrapper;
