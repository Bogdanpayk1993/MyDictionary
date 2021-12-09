import React, {useState} from 'react';
import Body from './Body/body';
import Menu from './Menu/menu';

function Dictionary() {
    const [userId, setUserId] = useState(NaN)

    return (
        <>
            <Menu setUserId={setUserId} /> 
            {
                !isNaN(userId) ? 
                (
                    <Body userId={userId} />
                ) :
                (
                    null
                )
            }
        </>
    )
}

export default Dictionary;