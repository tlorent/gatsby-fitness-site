import { format } from 'date-fns';
import { graphql, useStaticQuery } from 'gatsby';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import Separator from './Separator';
import Body from './typography/Body';
import { h1CSS, h4CSS } from './typography/Heading';

const query = graphql`
    query Schedule {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/schedule.md/i" } }
        ) {
            edges {
                node {
                    frontmatter {
                        days {
                            day
                            classes {
                                startTime
                                endTime
                                classTitle
                                location
                            }
                        }
                    }
                }
            }
        }
    }
`;

interface Class {
    startTime: Date;
    endTime: Date;
    classTitle: string;
    location: string;
}

interface Day {
    day: string;
    classes: Class[];
}

const renderSchedule = (days: Day[], currentDay: string) => {
    return days.map((day) =>
        day.classes.map(
            ({ classTitle, location, startTime, endTime }, index) =>
                currentDay === day.day && (
                    <React.Fragment key={index}>
                        <Class>
                            <Info>
                                <Time>
                                    {format(new Date(startTime), 'hh:mm a')} -{' '}
                                    {format(new Date(endTime), 'hh:mm a')}
                                </Time>
                                <ClassTitle>{classTitle}</ClassTitle>
                                <Location size="tiny">{location}</Location>
                                <Body size="tiny">
                                    <Directions href="/">
                                        Get directions
                                    </Directions>
                                </Body>
                            </Info>
                            <div>
                                <Join label="join this class" />
                            </div>
                        </Class>
                        {index !== day.classes.length - 1 && <ClassSeparator />}
                    </React.Fragment>
                )
        )
    );
};

const Schedule: FC = () => {
    const [activeDay, setActiveDay] = useState('monday');
    const data = useStaticQuery(query);
    const { days } = data.allMarkdownRemark.edges[0].node.frontmatter;

    return (
        <Section>
            <Container>
                <SectionTitle>weekly schedule</SectionTitle>
                <ScheduleContainer>
                    <Tabs>
                        {days.map((day: Day, index: number) => (
                            <DayTab
                                key={index}
                                onClick={() => setActiveDay(day.day)}
                                isActive={activeDay === day.day}
                            >
                                {day.day}
                            </DayTab>
                        ))}
                    </Tabs>
                    {renderSchedule(days, activeDay)}
                </ScheduleContainer>
            </Container>
        </Section>
    );
};

const Section = styled.section`
    padding: 80px 0px;
    width: 100%;
`;

const Container = styled.div`
    padding: 0 15px;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        display: flex;
        flex-direction: column;
        align-items: center;
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

const ScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        width: 750px;
    }
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    flex-direction: column;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        flex-direction: row;
        align-self: center;
        width: 500px;
        margin-bottom: 48px;
    }
`;

const DayTab = styled.button<{ isActive: boolean }>`
    padding: 23px;
    cursor: pointer;
    text-align: center;
    min-width: 150px;
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.greyHover};
    border: none;
    text-transform: uppercase;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 12px;
    letter-spacing: 2px;
    font-weight: 700;
    display: inline-block;
    margin-bottom: 16px;
    outline: 0;
    transition: all 0.3s ease;

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        min-width: 200px;
        max-width: none;
    }

    ${({ isActive }) =>
        isActive &&
        css`
            background: ${({ theme }) => theme.colors.main};
            color: ${({ theme }) => theme.colors.white};
        `}
`;

const Class = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @media (min-width: ${({ theme }) => theme.mediaQueries.xs}) {
        flex-direction: row;
        align-items: flex-end;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.small}) {
        align-items: center;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
`;

const Time = styled.h3`
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    margin-bottom: 8px;
    font-family: 'Roboto Condensed', sans-serif;
    color: ${({ theme }) => theme.colors.black};
    font-size: 12px;
    line-height: 24px;
`;

const Location = styled(Body)`
    color: ${({ theme }) => theme.colors.black};
`;

const Directions = styled.a`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.main};
    font-weight: 500;
    cursor: pointer;
    transition: filter 0.3s ease;

    :hover {
        filter: brightness(150%);
    }
`;

const ClassTitle = styled.h4`
    ${h4CSS}
    margin-bottom: 24px;
    font-weight: 300;
`;

const Join = styled(Button)`
    align-self: flex-start;
    margin-top: 24px;
`;

const ClassSeparator = styled(Separator)`
    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        display: block;
    }
`;

export default Schedule;
