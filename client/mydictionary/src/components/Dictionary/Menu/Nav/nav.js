import React from 'react';
import './nav.css';

function Nav(props) {
    return(
        <div className="Nav">
            <span onClick={() => props.setPage("Words")}> Words </span>
            <span onClick={() => props.setPage("People")}> People </span>
        </div>
    )
}

export default Nav;
