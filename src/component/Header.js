import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { token } from "../graphql/Query";

const Wrapper = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Navbar = styled.section`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarTitle = styled.p`
  font-size: 26px;
  color: #ffffff;
  font-weight: 500;
`;

const NavbarUL = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.open &&
    css`
      position: fixed;
      background: #1d1d2b;
      top: 0;
      left: 0;
      text-align: center;
      width: 100%;
      height: 100%;
      display: block !important;
      z-index: 4;
      padding: 0;
      margin: 0;
    `}

  @media (max-width: 1023px) {
    display: none;
  }
`;

const NavbarLI = styled.li`
  color: #ffffff;
  margin: 100px 20px;
  opacity: 0.7;

  ${(props) =>
    props.primary === true &&
    css`
      opacity: 1;
    `}
`;

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false);

  let location = useLocation();

  return (
    <Wrapper>
      <Navbar>
        <Link to="/">
          <NavbarTitle>AniSchedule</NavbarTitle>
        </Link>
        <NavbarUL open={isOpen}>
          <Link to="/Winter2021">
            <NavbarLI primary={location.pathname === "/Winter2021"}>
              Winter 2021
            </NavbarLI>
          </Link>
          <Link to="/Spring2021">
            <NavbarLI primary={location.pathname === "/Spring2021"}>Spring 2021</NavbarLI>
          </Link>
          <Link to="/">
            <NavbarLI primary={location.pathname === "/"}>
              Summer 2021
            </NavbarLI>
          </Link>
          <Link to="/Fall2021">
            <NavbarLI primary={location.pathname === "/Fall2021"}>
              Fall 2021
            </NavbarLI>
          </Link>
          {token ? (
            ""
          ) : (
            <NavbarLI>
              <a href="https://anilist.co/api/v2/oauth/authorize?client_id=5302&response_type=token">
                Login with AniList
              </a>
            </NavbarLI>
          )}
        </NavbarUL>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-menu-2"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setIsOpen(!isOpen)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </Navbar>
    </Wrapper>
  );
};

export default Header;
