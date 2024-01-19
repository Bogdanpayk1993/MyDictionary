import React from 'react';
import './nav.css';

function Nav(props) {

    const setPage = props.setPage

    return (
        <div className="Nav">
            <p onClick={() => setPage("Feed")}> Feed </p>
            <p onClick={() => setPage("MyWords")}> My words </p>
            <p onClick={() => setPage("MyTests")}> My tests </p>
            <p onClick={() => setPage("TestsFromFriends")}> Tests from friends </p> 
            <p onClick={() => setPage("People")}> People </p>
        </div>
    )
}

export default Nav;
