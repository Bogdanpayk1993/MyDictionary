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
            this.setState({...this.setState, ...json})
        })
    }

    render() { 
        console.log(this.state[0])
        return ( 
            <>
                <p> {} </p>
                <button onClick={this.getReply}> Надіслати </button>
            </>
         );
    }
}
 
export default Header;
