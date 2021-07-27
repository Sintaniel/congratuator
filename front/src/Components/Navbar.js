import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {
    Link
  } from "react-router-dom";

const NavbarWrapper = styled.div`
    z-index: 10;
    position: fixed;
    display: flex;
    width: 7vw;
    height: 100vh;
    flex-flow: column wrap;
    justify-content: flex-start;
    border: none;
    background-color: #46453fbb;
    box-shadow: 20px 0px #36306e8a;
    color: white;
`;

const Button = styled.button`
    border: none;
    border-radius: 5px;
    margin: 20px 0px 24px 0px;
    background-color: gray;
    box-shadow: 0px 6px #123454;
    color: white;
    align-self: center;
    width: 6vw;
    height: 6vh;
    font-family: 'ARCADE';
    font-size: x-large;
    transition: 0.2s all ease;
    
    @media (max-width: 1700px) {
        font-size: large;
    }

    @media (max-width: 1400px) {
        font-size: medium;
    }

    &:hover {
        color: lightgreen;
        text-shadow: 0 0 10px;
    }

    &:focus {
        outline: none;
    }

    &:active {
        outline: none;
        margin: 24px 0px 20px 0px;
        box-shadow: 0px 2px #123454;
    }
`;

export default function Navbar(){
    
    return(
        <NavbarWrapper id='navbar'>
            <Link to="/">
                <Button>Coming</Button>
            </Link>
            <Link to="/All">
                <Button>All</Button>
            </Link>
            <Link to="/New">
                <Button>New</Button>
            </Link>
            <Link to ="/">
                <Button style={{backgroundColor: "darkgrey"}}>Back</Button>
            </Link>
        </NavbarWrapper>
    )
}