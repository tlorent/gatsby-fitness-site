import React, { FC } from 'react';
import styled from 'styled-components';

const Recommendations: FC = () => (
    <Section>
        <Container />
    </Section>
);

const Section = styled.section`
    padding: 80px 0px;
    width: 100%;
`;

const Container = styled.div`
    padding: 0 15px;
`;

export default Recommendations;
