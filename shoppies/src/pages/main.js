import React from 'react';
import logo from '../Film-icon.png';
import { Button } from '@shopify/polaris';
import "@shopify/polaris/dist/styles.css";
import '../App.css';

/*
    function: handleSearch
    purpose: takes user input and searches the OMDB database
             for the user's desired search
*/
const handleEnter = () => {
    console.log('Clicked!');
}

/*
    function: Main
    purpose: renders content for the main app page
*/
const Main = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1
        style={{margin: 20}}>
          Hey you pressed Enter!
        </h1>
        <Button
        size='large'
        primary
        onClick={handleEnter}>
            Enter</Button>
      </header>
    </div>
  );
}

export default Main;
