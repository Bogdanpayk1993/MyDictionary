import React from 'react';
import Authentication from './Authentication/authentication';
import './menu.css';

function Menu(setUserId) {
    return (
        <div className="Menu">
            <div>

            </div>
            <div>
            
            </div> 
            <div>
                <Authentication setUserId={setUserId} />
            </div>
        </div>
    )
} 

export default Menu;
