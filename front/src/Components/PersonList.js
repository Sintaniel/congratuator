import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import store from '../app/store';

import {
    Route,
    Link
  } from "react-router-dom";

  const DivWrapper = styled.div`
    z-index: 0;
    position: relative;
    padding: 2vh;
    top: 2vh;
    left: 6vw;
`

const DivPersons = styled.div`
    display: flex;
    position: relative;
    width: 80vw;
    height: 100%;
    border: none;
    border-radius: 0px 50px;
    margin: 2vh 4vw;
    padding: 2vh 2vw;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: space-around;
    align-items: flex-start;
    color: white;
    font-family: 'ARCADECLASSIC';
    font-size: xx-large;
    background-color: #0000008f;

    &:hover {
        text-shadow: 0 0 8px;
        transform: translateX(20px);
        transition-duration: 200ms;
    }
`

const DivSinglePerson = styled.div`
    display: flex;
    width: 60vw;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-content: flex-start;
    justify-self: flex-start;
    align-self: flex-start;
    align-items: flex-start;
`

const Loading = styled.div`
    text-align: center;
    position: absolute;
    border-radius: 0px 50px;
    top: 40vh;
    left: 40vw;
    padding: 4vh 4vw;
    color: white;
    font-family: 'ARCADECLASSIC';
    font-size: xxx-large;
    background-color: #0000008f;
`;

const DivButtonWrapper = styled.div`
    flex-flow: row wrap;
    display: flex;
    border: none;
    justify-content: space-between;
    padding: 0px 3vw 0px 3vw;
    width: 15vw;
    color: black;
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

const Photo = styled.img`
    width: 14vw;
    height: 20vh;
    display: inline-block;
    position: relative;
    overflow: hidden;
    justify-self: flex-end;
    align-self: flex-end;
    border-radius: 50%;
`; 

  export default function PersonList(props){
    const [items, setItems] = useState([]);
    const [images, setImages] = useState([]);
    const params =  props.launch_param;

    const getPersonsList = async() => {
        await fetch("http://localhost:5000/api/Person")
        .then(res => res.json())
        .then(
            (data) => {
                setItems(data);
            }
        )
    }
    
    const getImage = async(id) => {
        await fetch(`http://localhost:5001/api/Image/${id}`)
        .then(responce => responce.blob())
        .then(image => {
            let outImage = URL.createObjectURL(image)
            return outImage;
        })
    }

    const getImages = async() => {
        await fetch(`http://localhost:5001/api/Image`)
        .then(res => res.json())
        .then(
            (data) => {
                setImages(data);
            }
        )
    }

    const handleRemoveItem = async(item) => {
        let newItems = items.filter((value)=>{return value.id != item.id});
        await fetch(`http://localhost:5000/api/Person/${item.id}`, { method: 'DELETE' })
        .then(()=>{setItems(newItems)});
       };

    useEffect(()=>{
        getPersonsList()
    }, [])

    useEffect(()=>{
        getImages()
    }, [])

    function parseDate(birthdate){
        let rDate = new String(`${moment().year()}${birthdate.substring(5,7)}${birthdate.substring(8,10)}`);
        return moment(rDate, "YYYYMMDD").calendar();
    }

    return (
        useLocation().pathname.includes("All") ?
        (<Route exact path={"/All"}>
            <DivWrapper>
                {(
                    (items && items[0] ? items
                        .sort((a, b) => {
                            if (parseDate(a.birthDate) < parseDate(b.birthDate)){
                                return -1;
                            }
                            if (parseDate(a.birthDate) > parseDate(b.birthDate)){
                                return 1;
                            }
                            return 0;
                        })
                        .map(item => {
                        return(
                            <DivPersons>
                                <DivSinglePerson>
                                    <div key={item.name}><span style={{color: 'lightgreen'}}>Name: </span>{item.name}</div>
                                    <div key={item.birthDate}><span style={{color: 'lightgreen'}}>BirthDate: </span>{(parseDate(item.birthDate))}</div>
                                    <div key={item.mail}><span style={{color: 'lightgreen'}}>email: </span>{item.email}</div>
                                    <DivButtonWrapper>
                                        <Button onClick={()=>handleRemoveItem(item)} page={item.id}>delete</Button>
                                        <Link to={String("").concat('', item.id)}>
                                            <Button page={item.id} onClick={()=>{store.dispatch({type: 'SET', value: item.id})}}>edit</Button>
                                        </Link>
                                    </DivButtonWrapper>
                                    
                                </DivSinglePerson>
                                <Photo src={item.photoLink}/>
                            </DivPersons>
                        )
                    }): <Loading>Loading...</Loading>)
                )}
            </DivWrapper>
        </Route>) : 
        (<Route exact path={"/"}>
            <DivWrapper>
                {(
                    items && items[0] ? items.map(item => {
                        return(
                            parseDate(item.birthDate).includes("Today") || parseDate(item.birthDate).includes("Tomorrow") ? 
                            <DivPersons>
                                <DivSinglePerson>
                                    <div key={item.name}><span style={{color: 'lightgreen'}}>Name: </span>{(item.name)}</div>
                                    <div key={item.birthDate}><span style={{color: 'lightgreen'}}>BirthDate: </span>{(parseDate(item.birthDate))}</div>
                                    <div key={item.mail}><span style={{color: 'lightgreen'}}>email: </span>{item.email}</div>
                                    <DivButtonWrapper>
                                        <Button onClick={()=>handleRemoveItem(item)} page={item.id}>delete</Button>
                                        <Link to={String("").concat('', item.id)}>
                                            <Button page={item.id} onClick={()=>{store.dispatch({type: 'SET', value: item.id})}}>edit</Button>
                                        </Link>
                                    </DivButtonWrapper>
                                    
                                </DivSinglePerson>
                                <Photo src={item.photoLink}/>
                            </DivPersons> :
                            null
                        )
                    }): <Loading>Loading...</Loading>
                )}
            </DivWrapper>
        </Route>
        )
    );
  }