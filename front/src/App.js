import './App.css';
import React, { Component, createRef } from 'react';
import store from './app/store';

import {
  BrowserRouter as Browser,
  Switch,
  Route
} from "react-router-dom";

import {
  PersonList,
  Background,
  Navbar,
  PostBox,
  PutBox
} from "./import-path"

export default function App() {
  let contextRef = createRef();

  const routes = [
    {
      path: "/",
      exact: true,
      main: () => <PersonList launch_param="/"/>
    },
    {
      path: "/All",
      exact: true,
      main: () => <PersonList launch_param="/All"/>
    },
    {
      path: "/New",
      exact: true,
      main: () => <PostBox launch_param="/New"/>
    },
    {
      path: "/",
      main: () => <PutBox launch_number={String("/").concat("", store.getState())}/>
    }
  ];

  return (
      <div className="App">
        <header className="App-header"></header>
        <Background>
          <Browser>
          <Navbar/>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={route.main}
                />
              ))}
            </Switch>
          </Browser>
        </Background>
      </div>
  );
}
