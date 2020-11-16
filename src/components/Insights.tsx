import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Body from './typography/Body';
import { h1CSS, h4CSS } from './typography/Heading';

const Insights: FC = () => (
    <Section>
        <Container>
            <SectionTitle>Insights</SectionTitle>
            <InsightCards>
                <Card>
                    <div>
                        <Caption size="tiny">August 3, 2015 in Fitness</Caption>
                        <Title>
                            MAINTAINING ACTIVITY WITHIN THE FAT-BURNING ZONE
                        </Title>
                    </div>
                    <ReadButton label="Read Insight &gt;" />
                </Card>
            </InsightCards>
        </Container>
    </Section>
);

const Section = styled.section`
    padding: 80px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    padding: 0 15px;
    width: 1170px;

    /* 992px: 970px, 768px: 750px */
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
`;

const Card = styled.div`
    display: flex;
    flex: 0 0 33%;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 40px 32px;
    min-height: 380px;

    :not(:last-child) {
        margin-right: 20px;
    }
`;

const Caption = styled(Body)`
    color: ${({ theme }) => theme.colors.greyDark};
`;

const Title = styled.h4`
    ${h4CSS};
    font-style: italic;
    line-height: 32px;
    margin-top: 16px;
`;

const ReadButton = styled(Button)`
    height: 40px;
    max-width: 154px;
    min-width: initial;
`;

export default Insights;
