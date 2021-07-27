import React from 'react';
import styled from 'styled-components';

const BackgroundImage = styled.div`
    z-index: -99;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-size: contain;
    overflow-x: hidden;
    background: 
        repeating-linear-gradient(
            #00000000,
            #f793084f 1px,
            #00000000 1px,
            #00000000 40px
        ),
        repeating-linear-gradient(
            90deg,
            #00000000,
            #f793084f 1px,
            #00000000 1px,
            #00000000 40px
        ),
        linear-gradient(
            0deg,
            #f7930821 0%,
            #f73c0814 100%),
        linear-gradient(
            0deg,
            #0f0f0f 0%,
            #0f0f0f 100%);
`;

export default class BackgroundGreed extends React.Component {

    render () {
        return (
            <BackgroundImage>
                {this.props.children}
            </BackgroundImage>
        )
    }
}