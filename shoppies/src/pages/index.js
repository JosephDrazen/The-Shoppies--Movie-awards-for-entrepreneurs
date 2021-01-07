import React from 'react';
import logo from '../Film-icon.png';
import { Button } from '@shopify/polaris';
import history from './../history';
import "@shopify/polaris/dist/styles.css";
import '../App.css';

/*
    function: handleEnter
    purpose: takes user to the main app page 
*/
const handleEnter = () => {
    history.push('/home');
}

/*
    function: Index
    purpose: renders content for the landing page
*/
const Index = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1
        style={{margin: 20}}>
          Welcome to the Shoppies!
        </h1>
        <p style={{
        fontSize: '14px',
        marginTop: 10}}>
            A simple movie database app made with React and Shopify Polaris.
        </p>
        <br />
        <Button
        size='large'
        primary
        onClick={handleEnter}>
            Enter
        </Button>

      </header>
    </div>
  );
}

export default Index;
