import React from 'react';
import './peoplelist.css';

function PeopleList(props) {
    return (
        <div className='PeopleList'>
            {
                Object.keys(props['peopleList']).length != 0 ?
                    (
                        Object.keys(props['peopleList']).map(el => (
                            <div key={el}>
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