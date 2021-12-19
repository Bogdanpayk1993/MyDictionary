import React from 'react';
import './peoplelist.css';

function PeopleList(props) {
    const setPage = props.setPage

    return (
        <div className='PeopleList'>
            {
                Object.keys(props['peopleList']).length != 0 ?
                    (
                        Object.keys(props['peopleList']).map(el => (
                            <div key={el} onClick={() => setPage(props['peopleList'][el]['id'])}>
                                <div> {props['peopleList'][el]['name']} </div> <div> <button> Follow </button> </div> 
                            </div>
                        ))
                    ) : 
                    (
                        <p> The man was not found </p> 
                    )
            }
        </div>
    )
}

export default PeopleList;