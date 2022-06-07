import React from 'react';
import Authentication from './Authentication/authentication';
import Nav from './Nav/nav';
import UserChoice from './UserChoice';
import './menu.css';



function Menu(props) {

    return (
        <div className="Menu">
            <div>

            </div>
            <div>
                {
                    !isNaN(props.userId) ? 
                        <Nav setPage={props.setPage} />
                        : null
                }
            </div> 
            <div>
                {
                    //<Authentication userId={props.userId} setUserId={props.setUserId} setUserName={props.setUserName} />
                    <UserChoice setUserId={props.setUserId} setUserName={props.setUserName} />
                }
            </div>
        </div>
    )
} 

export default Menu;
