import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { MarkdownRemarkFrontmatterFaq, Maybe } from '../generated/graphql';
import Body from './typography/Body';

interface Props {
    faq: Maybe<Pick<MarkdownRemarkFrontmatterFaq, 'question' | 'answer'>>;
}

const Accordion: FC<Props> = ({ faq }) => {
    const [active, setActive] = useState(false);
    const [maxHeight, setMaxHeight] = useState<number | undefined>(0);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const toggleAccordion = () => {
        setActive(!active);
        setMaxHeight(
            contentRef.current?.scrollHeight &&
                contentRef.current.scrollHeight + 40
        );
    };

    return (
        <Container>
            <ToggleButton onClick={toggleAccordion}>
                <Title size="tiny">{faq?.question}</Title>
            </ToggleButton>
            <Content ref={contentRef} active={active} maxHeight={maxHeight}>
                <Text>{faq?.answer}</Text>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled(Body)`
    color: ${({ theme }) => theme.colors.black};
    font-weight: 700;
`;

const ToggleButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 14px 0;
    outline: 0;

    transition: background-color 0.3s ease;

    :hover {
        background-color: ${({ theme }) => theme.colors.main};

        ${Title} {
            color: ${({ theme }) => theme.colors.white};
        }
    }
`;

const Content = styled.div<{ active: boolean; maxHeight?: number }>`
    max-height: ${({ active, maxHeight }) =>
        active ? `${maxHeight}px` : '0px'};
    overflow: hidden;
    text-align: center;

    transition: all 0.3s ease;
`;

const Text = styled(Body)`
    margin: 20px 40px;
    color: ${({ theme }) => theme.colors.black};
`;

export default Accordion;
