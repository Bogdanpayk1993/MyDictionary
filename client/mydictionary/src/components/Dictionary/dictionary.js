import React, {useState} from 'react';
import Menu from './Menu/menu';

function Dictionary() {
    const [userId, setUserId] = useState(NaN)

    return (
        <>
            <Menu setUserId={setUserId} /> 
            {
                
            }
        </>
    )
}

export default Dictionary;