import React, { useState } from 'react';
import Menu from './Menu/menu';
import MyWords from './MyWords/mywords';
import People from './People/people';
import './dictionary.css';

function Dictionary() {
    const [userId, setUserId] = useState(NaN)
    const [page, setPage] = useState("Words")

    return (
        <>
            <Menu setUserId={setUserId} setPage={setPage} />
            {
                !isNaN(userId) ?
                    (
                        <div className='Dictionary'>
                            <div>

                            </div>
                            <div>
                                {
                                    page == "Words" ?
                                        (
                                            <MyWords userId={userId} />
                                        ) : (null)
                                }
                                {
                                    page == "People" ?
                                        (
                                            <People userId={userId} />
                                        ) : (null)
                                }
                            </div>
                            <div>

                            </div>
                        </div>
                    ) : (null)
            }
        </>
    )
}

export default Dictionary;