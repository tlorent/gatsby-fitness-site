import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Maybe } from '../generated/graphql';
import Button from './Button';
import Body from './typography/Body';
import { h4CSS } from './typography/Heading';

interface Insight {
    category?: Maybe<string>;
    date?: Maybe<Date>;
    title?: Maybe<string>;
}

interface Props {
    insight?: Maybe<Insight>;
    url?: Maybe<string>;
}

const InsightCard: FC<Props> = ({ insight, url }) => {
    return insight ? (
        <Card>
            <div>
                <Caption size="tiny">
                    {insight?.date} in {insight?.category}
                </Caption>
                <Title>{insight?.title}</Title>
            </div>
            <Link to={url ?? '/blogs'} style={{ textDecoration: 'none' }}>
                <ReadButton label="Read Insight" />
            </Link>
        </Card>
    ) : null;
};

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 40px 32px;
    min-height: 380px;
    margin-right: 20px;
    margin-bottom: 20px;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        margin-bottom: 0;
        flex: 0 0 33%;
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
    text-transform: uppercase;
`;

const ReadButton = styled(Button)`
    height: 40px;
    max-width: 170px;
    min-width: initial;
    display: flex;
`;

export default InsightCard;
