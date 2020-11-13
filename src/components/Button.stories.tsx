import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { Props as ButtonProps } from './Button';
import { ThemeProvider } from 'styled-components';
import theme from '../constants/theme';

export default {
    title: 'Components/Button',
    component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
    <ThemeProvider theme={theme}>
        <Button {...args} />
    </ThemeProvider>
);

export const Main = Template.bind({});

Main.args = {
    variant: 'primary',
    label: 'Button',
};
