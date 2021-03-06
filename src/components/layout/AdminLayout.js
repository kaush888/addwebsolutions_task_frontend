import React, { Component } from 'react'
import{ Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { Navbar, Nav, Button } from 'react-bootstrap';

import { userActions } from '../actions/user.actions'


export class AdminLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    logout = () => {
        this.setState({ isLoggedIn: false })
        this.props.logout();
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <div className="container">
                        <Link to="/dashboard" className='navbar-brand'> Students </Link>
                        
                        <Nav className="ml-auto">
                            <Nav.Link href="#" className="mr-3"> {(this.props.userData) ? (this.props.userData.vUserName) : ''} </Nav.Link>
                        </Nav>
                        <Button variant="outline-info" onClick={this.logout}> Logout </Button>
                    </div>
                </Navbar>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.authentication.userData,
        loggedIn: state.authentication.loggedIn
    }
}

const actionCreators = {
    logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(AdminLayout);

