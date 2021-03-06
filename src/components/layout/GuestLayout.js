import React, { Component } from 'react'

// import {BASENAME} from '../config/constants'


class GuestLayout extends Component {

    componentDidMount () {
    }

    render() {
        return (
            <div className="">
                {this.props.children}
            </div>
        )
    }
}

export default GuestLayout
