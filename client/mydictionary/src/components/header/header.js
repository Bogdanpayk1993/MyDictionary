import React, { Component } from 'react';
import Work_With_Database from '../work_with_database';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getReply = () => {
        var reply = Work_With_Database({require: 'SELECT * FROM users'})
        reply.then((value) => {
            var json = JSON.parse(value)
            this.setState(json)
        })
    }

    render() { 
        return ( 
            <>
                {
                    Object.keys(this.state).length != 0 ?
                    (
                        Object.keys(this.state).map((el) => <p key={el}> {`${this.state[el]['id']} - ${this.state[el]['Name']} - ${this.state[el]['Surname']} - ${this.state[el]['Email']}`} </p>)
                    ):(
                        null
                    )
                }
                <button onClick={this.getReply}> Надіслати </button>
            </>
         );
    }
}
 
export default Header;
