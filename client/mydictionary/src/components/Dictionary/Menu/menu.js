import React from 'react';
import Authentication from './Authentication/authentication';
import Nav from './Nav/nav';
import UserChoice from './UserChoice';
import './menu.css';

function Menu(props) {

    const userId = props.userId
    const setUserId = props.setUserId
    const setUserName = props.setUserName
    const setPage = props.setPage

    return (
        <div className="Menu">
            <div>

            </div>
            <div>
                {
                    !isNaN(userId) ? 
                        <Nav setPage={setPage} />
                        : null
                }
            </div> 
            <div>
                {
                    //<Authentication setUserId={setUserId} setUserName={setUserName} />
                    <UserChoice setUserId={setUserId} setUserName={setUserName} />
                }
            </div>
        </div>
    )
} 

export default Menu;
