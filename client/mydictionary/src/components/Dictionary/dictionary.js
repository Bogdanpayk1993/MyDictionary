import React, { useState } from 'react';
import Menu from './Menu/menu';
import MyWords from './MyWords/mywords';
import People from './People/people';
import Words from './Words';
import Subscriptions from './subscriptions/subscriptions';
import Subscribers from './subscribers/subscribers';
import './dictionary.css';

function Dictionary() {
    const [userId, setUserId] = useState(NaN)
    const [page, setPage] = useState("Words")

    return (
        <>
            <Menu userId={userId} setUserId={setUserId} setPage={setPage} />
            {
                !isNaN(userId) ?
                    (
                        <div className='Dictionary'>
                            <div>
                                    <Subscriptions />
                                    <Subscribers />
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
                                            <People userId={userId} setPage={setPage} />
                                        ) : (null)
                                }
                                {
                                    !isNaN(page) ?
                                        (
                                            <Words userId={userId} page={page} />
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