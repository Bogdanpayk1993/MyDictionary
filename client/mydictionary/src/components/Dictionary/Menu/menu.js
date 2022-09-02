import React from 'react';
import Nav from './Nav/nav';
import Notifications from './Notifications/notifications';
import Authentication from './Authentication/authentication';
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
                    !isNaN(userId) ?
                        <Notifications userId={userId} setPage={setPage} />
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
