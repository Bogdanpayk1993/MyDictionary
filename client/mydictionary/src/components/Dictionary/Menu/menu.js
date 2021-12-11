import React from 'react';
import Authentication from './Authentication/authentication';
import './menu.css';

function Menu(props) {
    return (
        <div className="Menu">
            <div>

            </div>
            <div>
            
            </div> 
            <div>
                <Authentication setUserId={props.setUserId} />
            </div>
        </div>
    )
} 

export default Menu;
