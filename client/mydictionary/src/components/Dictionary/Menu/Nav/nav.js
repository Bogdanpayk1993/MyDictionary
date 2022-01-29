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
                            <p onClick={() => props.setPage("MyWords")}> My words </p>
                            <p onClick={() => props.setPage("People")}> People </p>
                        </>
                    ) :
                    (null)
            }
        </div>
    )
}

export default Nav;
