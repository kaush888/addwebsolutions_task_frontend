import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { Card } from 'react-bootstrap';

import { userActions } from'../../actions/user.actions'

import Api from "../../helper/Api";
const api = new Api();

class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': "Bearer " + this.props.loggedUserInfo.authenticationToken,
            },
            isLoggedIn: false,
            loginData: {
                vEmail: '',
                vPassword: ''
            }
        };

        this.validator = new SimpleReactValidator();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        let loginData = this.state.loginData;
        loginData[name] = value

        this.setState({ loginData });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validator.allValid()) {
            
            api.post("/student_api/auth/login", {
                headers: this.state.headers,
                data: this.state.loginData
            }).then(res => {
                if (res.status === 200) {
                     this.props.login(res.data);
                    this.setState({ isLoggedIn : true })
                    toast.success('Login Successfully.')
                } else {
                    toast.error(res.message);        
                }
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div>

                <Card style={{ width: '20rem' }} className=" mx-auto mt-5">
                <Card.Title className="text-center mt-3">Login</Card.Title>
                <Card.Body>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" name="vEmail" value={this.state.loginData.vEmail.toLocaleLowerCase()} onChange={this.handleChange} />
                            {this.validator.message('email', this.state.loginData.vEmail, 'required|email', { className: 'text-danger' })}
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" name="vPassword" value={this.state.loginData.vPassword} onChange={this.handleChange} />
                            {this.validator.message('password', this.state.loginData.vPassword, 'required|min:6', { className: 'text-danger' })}
                        </div>
                        <div className="mrg-top-20 text-center">
                            <input type="submit" className="btn btn-primary" value="Login" />
                        </div>

                        
                    </form>

                    <h5 className="mt-4 text-center" ><Link to='/signup'>Create Account</Link></h5>
                </Card.Body>
                </Card>

            </div>
        )
    }
}

const actionCreators = {
    login: userActions.login
};

export default connect(null, actionCreators)(login);
