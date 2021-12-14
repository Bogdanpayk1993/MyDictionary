import React from 'react';
import Authentication from './Authentication/authentication';
import './menu.css';
import Nav from './Nav/nav';

function Menu(props) {
    return (
        <div className="Menu">
            <div>

            </div>
            <div>
                <Nav setPage={props.setPage} />
            </div> 
            <div>
                <Authentication setUserId={props.setUserId} />
            </div>
        </div>
    )
} 

export default Menu;
