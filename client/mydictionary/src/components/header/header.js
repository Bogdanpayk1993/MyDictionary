import React, { Component } from 'react';
import Work_With_Database from '../work_with_database';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { reply:"X" }
    }

    getReply = () => {
        var reply = Work_With_Database({name: 'Bogdan', surname: 'Krochak'})
        reply.then((value) => {
            this.setState({reply: value})
        })
    }

    render() { 
        return ( 
            <>
                <p> {this.state.reply} </p>
                <button onClick={this.getReply}> Надіслати </button>
            </>
         );
    }
}
 
export default Header;
