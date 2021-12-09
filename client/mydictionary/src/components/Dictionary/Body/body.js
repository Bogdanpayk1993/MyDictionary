import React from 'react';
import AddWord from './AddWord/addword';
import './body.css';

function Body(userId) {
    return (
        <div className="Body">
            <div>

            </div>
            <div>
                <AddWord userId={userId} />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Body;