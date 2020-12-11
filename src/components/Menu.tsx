import { Link } from 'gatsby';
import React, { FC, useRef } from 'react';
import { useHideAndSeekMenu } from 'react-hideandseekmenu';
import styled from 'styled-components';

const Menu: FC = () => {
    const navRef = useRef<HTMLElement>(null);
    useHideAndSeekMenu({
        ref: navRef,
    });

    return (
        <Nav ref={navRef}>
            <Link to="/">
                <Icon className="fas fa-bolt" />
            </Link>
            <NavList>
                <NavItem>
                    <Link to="/">Home</Link>
                </NavItem>
                <NavItem>
                    <Link to="/blog">Blog</Link>
                </NavItem>
            </NavList>
        </Nav>
    );
};

const Nav = styled.nav`
    height: 70px;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 3;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.1);
    padding: 0 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: ${({ theme }) => theme.mediaQueries.xs}) {
        padding: 0 30px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        padding: 0 50px;
        height: 80px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.large}) {
        padding: 0 120px;
    }
`;

const Icon = styled.i`
    font-size: 35px;
    color: ${({ theme }) => theme.colors.main};
    transform: rotate(8deg);
    transition: transform 0.2s ease;

    :hover {
        transform: rotate(0deg) scale(1.15);
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        font-size: 48px;
    }
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
`;

const NavItem = styled.li`
    min-width: 50px;
    font-size: 16px;
    text-transform: uppercase;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 700;
    letter-spacing: 1px;

    :first-child {
        margin-right: 24px;
    }

    @media (min-width: ${({ theme }) => theme.mediaQueries.medium}) {
        font-size: 18px;
    }

    a {
        color: ${({ theme }) => theme.colors.black};
        text-decoration: none;
        transition: all 0.2s ease-in;
        padding-bottom: 4px;
        position: relative;

        &[aria-current='page'] {
            color: ${({ theme }) => theme.colors.main};
        }

        &:hover {
            color: ${({ theme }) => theme.colors.main};

            &:before {
                width: 100%;
            }
        }

        &:before {
            content: '';
            position: absolute;
            height: 3px;
            background-color: ${({ theme }) => theme.colors.main};
            bottom: 0;
            width: 0%;

            transition: width 0.3s ease-out;
        }
    }
`;

export default Menu;
