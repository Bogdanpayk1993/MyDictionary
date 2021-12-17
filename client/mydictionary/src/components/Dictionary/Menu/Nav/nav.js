import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './nav.css';

function Nav(props) {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="Nav">
            {
                isAuthenticated ?
                    (
                        <>
                            <span onClick={() => props.setPage("Words")}> Words </span>
                            <span onClick={() => props.setPage("People")}> People </span>
                        </>
                    ) :
                    (null)
            }
        </div>
    )
}

export default Nav;
