import React, { Component } from 'react'
import { Switch, Redirect, withRouter } from 'react-router-dom'
import { Route } from 'react-router'
import LazyLoader from '@loadable/component'
import { connect } from 'react-redux';

// import {BASENAME} from '../config/constants'

// Layouts
import GuestLayout from '../layout/GuestLayout';
import AdminLayout from '../layout/AdminLayout';
import Loader from './Loader'

// Pages
const Login = LazyLoader(() => import('../module/auth/login'), { fallback: <Loader/> })
const Signup = LazyLoader(() => import('../module/auth/signup'), { fallback: <Loader/> })

const Dashboard = LazyLoader(() => import('../module/student/dashboard'), { fallback: <Loader/> })

class Main extends Component {

    componentDidMount () {
    }

    render() {

        const GuestRoute = ({ component: Component, ...rest }) => {
            return (
                <GuestLayout>
                    <Route {...rest} render={props => (
                        // <Component {...props} />
                        this.props.loggedIn ? <Redirect to='/dashboard' /> : <Component {...props} /> 
                    )} />
                </GuestLayout>
            )
        }

        const AdminRoute = ({ component: Component, ...rest }) => {
            return (
                <AdminLayout>
                    <Route {...rest} render={props => (
                        // <Component {...props} />
                        this.props.loggedIn ? <Component {...props} /> : <Redirect to='/' />
                    )} />
                </AdminLayout>
            )
        }


        return (
            <div>
                <Switch>
                    <GuestRoute exact={true} path='/' component={Login} />

                    <GuestRoute exact={true} path='/signup' component={Signup} />

                    <AdminRoute exact={true} path='/dashboard' component={Dashboard} />
                    

                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { loggedIn: state.authentication.loggedIn }
}

export default connect(mapStateToProps, null)(Main);


