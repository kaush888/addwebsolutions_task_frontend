import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Loader from './container/Loader'
import Main from './container/Main'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/custom.css';

import { BASENAME } from './config/constants';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentWillMount() {
        // this.setState({ loading: false })
        setTimeout(() => this.setState({ loading : false }), 1500); // simulates an async action, and hides the spinner
    }

    // notify = () => toast("Wow so easy !");

    render() {
        const { loading } = this.state;
        let renderlayout = '';

        if (loading) {
            renderlayout = (
                <Loader />
            );
        } else {
            renderlayout = (
                <Main />
            );
        }


        return (
            <div>
              
                <BrowserRouter basename={BASENAME}>
                    {renderlayout}
                    <ToastContainer
                        autoClose={2000}
                        position="top-right"
                        className="toast-container"
                        toastClassName="dark-toast" />
                </BrowserRouter>
            </div>
        )
    }
}

export default App