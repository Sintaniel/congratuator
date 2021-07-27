import React, { Component, createRef, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';

const Input = styled.input`
    border: none;
    background-color: darkgray;
    text-shadow: 0 0 10px;
    color: lightgreen;
    width: 25vw;
    margin: 15px 0px;
    padding: 5px 5px 5px 5px;
    font-family: 'ARCADE';
    font-size: xx-large;
    transition: 0.5s all ease-out;

    &:hover {
        background-color: gray;
    }

    &:focus {
        color: lightgreen;
        outline: none;
        background-color: gray;
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 5px;
    margin: 20px 0px 24px 0px;
    background-color: gray;
    box-shadow: 0px 6px #123454;
    color: white;
    align-self: flex-end;
    justify-self: flex-end;
    width: 10vw;
    height: 16vh;
    font-family: 'ARCADE';
    font-size: xxx-large;
    transition: 0.2s all ease;

    @media (max-width: 1440px) {
        font-size: xx-large;
    }

    @media (max-width: 1200px) {
        font-size: x-large;
        align-self: center;
        width: 14vw;
    }

    @media (max-width: 900px) {
        align-self: center;
        width: 18vw;
        font-size: large;
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
        justify-self: flex-end;
        margin: 24px 0px 20px 0px;
        box-shadow: 0px 2px #123454;
    }
`;

const Div = styled.div`
    z-index: 100;
    display: flex;
    width: 40vw;
    height: 40vh;
    border: none;
    border-radius: 10px;
    flex-flow: column wrap;
    justify-content: center;
    align-content: space-around;
    background-color: #46453f;
    box-shadow: 20px 20px #36306e8a;
`;

const InputWrapper = styled.div`
    display: flex;
    align-content: space-around;
    position: absolute;
    background-color: hsla(0, 100%, 0%, 0);
    z-index: 1;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const UploadLabel = styled.label`
    border: none;
    border-radius: 5px;
    margin: 20px 0px 24px 0px;
    background-color: gray;
    box-shadow: 0px 6px #123454;
    color: white;
    align-self: flex-end;
    justify-self: flex-end;
    width: 18vw;
    height: 4vh;
    font-family: 'ARCADE';
    font-size: x-large;
    transition: 0.2s all ease;

    @media (max-width: 1440px) {
        font-size: large;
    }

    @media (max-width: 1200px) {
        font-size: medium;
        align-self: center;
        width: 14vw;
    }

    @media (max-width: 900px) {
        align-self: center;
        width: 18vw;
        font-size: small;
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
        justify-self: flex-end;
        margin: 24px 0px 20px 0px;
        box-shadow: 0px 2px #123454;
    }
`;

const IndicatorLight = styled.div`
    margin: 20px auto;
    width: 12px;
    height: 12px;
    background-color: #690;
    border-radius: 50%;
    box-shadow: #000 0 0px 6px 1px, inset #737 0 -1px 9px, #525 0px 0px 10px;
`;

const FileInput = styled.input`display: none;`;

export default function PostBox (props){
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => postData(data, e);
    const onError = (errors, e) => console.log(errors, e);
    const [items, setItems] = useState([]);

    const [selectedFile, setSelectedFile] = useState();

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  const postData = async(data, e) => {
    const formData = new FormData();
    formData.append('File', selectedFile);

        await fetch(`http://localhost:5001/api/Image`, {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            response.json().then(json => {
                fetch("http://localhost:5000/api/Person",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    birthDate: data.birthdate,
                    email: data.email,
                    photoLink: `http://localhost:5001/api/Image/${json.id}`
                    })
                }).then(resp => {
                    if(resp.ok){
                        setItems("#000 0 0px 6px 1px, inset #2E9 0 -1px 9px, #2D4 0px 0px 10px");
                        
                    } else {
                        setItems("#000 0 0px 6px 1px, inset #d0d624 0 -1px 9px, #d8db86 0px 0px 10px");
                    }
                });       
            })
        })
    }

    return (
            <InputWrapper>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <Div className="flex-login-box">
                        <Input className="name" type="text" placeholder="name" {...register("name")}/>
                        <Input className="birthdate" type="date" placeholder="birthdate" {...register("birthdate")}/>
                        <Input className="email" type="email" placeholder="email" {...register("email")}/>
                        <UploadLabel for="file-upload"><FileInput className="file" id="file-upload" type="file" onChange={changeHandler}/>Upload photo</UploadLabel>
                        <Button className="login-button" type="submit">submit</Button>
                        <IndicatorLight style={{boxShadow: items}}/>
                    </Div>
                </form>
            </InputWrapper>
    );
}