import React, { useState } from 'react';
import MyWords from './MyWords/mywords';
import Menu from './Menu/menu';

function Dictionary() {
    const [userId, setUserId] = useState(NaN)
    const [page, setPage] = useState("Words")

    return (
        <>
            <Menu setUserId={setUserId} setPage={setPage} />
            {
                !isNaN(userId) ?
                    (
                        page == "Words" ?
                        <MyWords userId={userId} />
                        :
                        (null)
                    ) :
                    (
                        null
                    )
            }
        </>
    )
}

export default Dictionary;