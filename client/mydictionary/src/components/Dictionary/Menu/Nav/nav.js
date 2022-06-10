import React from 'react';
import './nav.css';

function Nav(props) {

    return (
        <div className="Nav">
            <p onClick={() => props.setPage("Feed")}> Feed </p>
            <p onClick={() => props.setPage("MyWords")}> My words </p>
            <p onClick={() => props.setPage("People")}> People </p>
        </div>
    )
}

export default Nav;
