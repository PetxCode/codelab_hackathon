import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AiFillHome, AiFillPieChart } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "./../Main/AuthProvider";
import { app } from "./../../base";

export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Container>
      <Wrapper>
        <LogoHolder>
          <Logo>.CodeLAb</Logo>
        </LogoHolder>

        <Navigation>
          <Nav to="/">
            <Icon>
              <AiFillHome />
            </Icon>
            <span>Home</span>
          </Nav>
          <Nav to="/create">
            <Icon>
              <IoMdCreate />
            </Icon>
            <span>Create</span>
          </Nav>
          <Nav to="/">
            <Icon>
              <AiFillPieChart />
            </Icon>
            <span>Stats</span>
          </Nav>
        </Navigation>

        <Space />

        {currentUser ? (
          <Avatar>
            <Nav1
              onClick={() => {
                app.auth().signOut();
              }}
            >
              <Icon>
                <BsPersonCircle />
              </Icon>
              <span>Sign Out</span>
            </Nav1>
          </Avatar>
        ) : (
          <Avatar>
            <Nav to="/register">
              <Icon>
                <BsPersonCircle />
              </Icon>
              <span>Sign In</span>
            </Nav>
          </Avatar>
        )}
      </Wrapper>
    </Container>
  );
};

const Avatar = styled.div``;
const Space = styled.div`
  flex: 1;
`;
const Logo = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  font-weight: 900;
  font-size: 30px;
  cursor: pointer;
`;
const LogoHolder = styled.div`
  margin-right: 30px;
`;
const Navigation = styled.div`
  display: flex;
  margin: 0 5px;
`;

const Nav1 = styled.div`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  border-radius: 3px;
  transition: all 350ms;

  span {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }

  :hover {
    background-color: rgba(255, 266, 255, 0.6);
    cursor: pointer;
    color: #004080;
  }
`;

const Nav = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  border-radius: 3px;
  transition: all 350ms;

  span {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }

  :hover {
    background-color: rgba(255, 266, 255, 0.6);
    cursor: pointer;
    color: #004080;
  }
`;
const Icon = styled.div`
  margin: 0 10px;
  margin-top: 2px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  width: 90%;
  align-items: center;
  margin-left: 30px;
  flex-direction: row;
`;
const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: #004080;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  position: fixed;
`;
