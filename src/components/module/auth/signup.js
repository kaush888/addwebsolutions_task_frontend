import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { Card } from 'react-bootstrap';

import { userActions } from '../../actions/user.actions'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Select from 'react-select'
import countryList from 'react-select-country-list'

import Api from "../../helper/Api";
const api = new Api();

class signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': "Bearer " + this.props.loggedUserInfo.authenticationToken,
            },
            isLoggedIn: false,
            signupData: {
                vFirstName: '',
                vLastName: '',
                vFatherName: '',
                vEmail: '',
                vPassword: '',
                vMobileNo: null,
                genderType: false,
                vGender: "",
                dDOB: "", dateOfBirth: "", vCountry: ""
            }
        };

        this.validator = new SimpleReactValidator();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        console.log("🚀 ~ file: signup.js ~ line 46 ~ signup ~ handleChange ~ name", name)
        let value = event.target.value;

        let signupData = this.state.signupData;

        signupData[name] = value

        this.setState({ signupData }, () => {
            console.log("🚀 ~ file: signup.js ~ line 49 ~ signup ~ handleChange ~ this.state.signupData", this.state.signupData)
        });
    }


    onChangeNumber(field, event) {
        const re = /^[0-9\b]+$/;
        let signupData = this.state.signupData
        // if value is not blank, then test the regex

        if (event.target.value === '' || re.test(event.target.value)) {
            signupData[field] = event.target.value
            this.setState({ signupData })
        }
    }



    handleSubmit(event) {
        event.preventDefault();

        if (this.validator.allValid()) {
            console.log("🚀 ~ file: signup.js ~ line 90 ~ signup ~ handleSubmit ~ this.state.signupData", this.state.signupData.v)

            var params = {

                vFirstName: this.state.signupData.vFirstName,
                vLastName: this.state.signupData.vLastName,
                vFatherName: this.state.signupData.vFatherName,
                vEmail: this.state.signupData.vEmail,
                tAddress: this.state.signupData.tAddress,
                vMobileNo: this.state.signupData.vMobileNo.toString(),
                vGender: this.state.signupData.genderType === true ? 'female' : 'male',
                dDOB: this.state.signupData.dDOB,
                vCountry: this.state.signupData.vCountry.label,
                vPassword: this.state.signupData.vPassword,
            }


            console.log("🚀 ~ file: signup.js ~ line 74 ~ signup ~ handleSubmit ~ params", params)


            api.post("/student_api/auth/register", {
                headers: this.state.headers,
                data: params
            }).then(res => {
                if (res.status === 200) {
                    // this.props.login(res.data);
                    // this.setState({ isLoggedIn: true })
                    toast.success('Signup Successfully.')
                    this.props.history.push('/')
                } else {
                    toast.error(res.message);
                }
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    changedCheckBox = (e, field) => {
        let signupData = this.state.signupData
        if (field === "male") {

            signupData.vGender = "male"
            signupData['genderType'] = !e.target.checked
            this.setState({ signupData })

        } else {
            signupData.vGender = "female"
            signupData['genderType'] = e.target.checked
            this.setState({ signupData })
        }
    }

    dateChange = (date) => {

        let d = new Date(date);

        // dateofbirth = d
        // this.setState({ fields, dateofbirth })
        var month = d.getMonth() + 1

        var newDate = d.getFullYear() + "-" + month + "-" + d.getDate();

        let signupData = this.state.signupData

        signupData.dateOfBirth = d
        signupData.dDOB = newDate
        this.setState({ signupData })

    }

    changeHandler = value => {

        let signupData = this.state.signupData
        signupData.vCountry = value
        this.setState({ signupData })
    }


    render() {
        const { signupData } = this.state
        console.log("🚀 ~ file: signup.js ~ line 155 ~ signup ~ render ~ this.state", this.state)
        var countries = countryList().getData()

        return (
            <div>

                <Card style={{ width: '20rem' }} className=" mx-auto mt-5">
                    <Card.Title className="text-center mt-3">SignUp</Card.Title>
                    <Card.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Firstname" name="vFirstname" value={this.state.signupData.vFirstname} onChange={this.handleChange} />
                                {this.validator.message('firstname', this.state.signupData.vFirstname, 'required', { className: 'text-danger' })}
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name" name="vLastname" value={this.state.signupData.vLastname} onChange={this.handleChange} />
                                {this.validator.message('lastname', this.state.signupData.vLastname, 'required', { className: 'text-danger' })}
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Father Name" name="vFathername" value={this.state.signupData.vFathername} onChange={this.handleChange} />
                                {this.validator.message('fathername', this.state.signupData.vFathername, 'required', { className: 'text-danger' })}
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email" name="vEmail" value={this.state.signupData.vEmail.toLocaleLowerCase()} onChange={this.handleChange} />
                                {this.validator.message('email', this.state.signupData.vEmail, 'required|email', { className: 'text-danger' })}
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" name="vPassword" value={this.state.signupData.vPassword} onChange={this.handleChange} />
                                {this.validator.message('password', this.state.signupData.vPassword, 'required|min:6', { className: 'text-danger' })}
                            </div>
                            <div className="form-group">
                                <textarea type="text" className="form-control" placeholder="Address" name="tAddress" value={this.state.signupData.tAddress} onChange={this.handleChange} />
                                {this.validator.message('address', this.state.signupData.tAddress, 'required', { className: 'text-danger' })}
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Mobile No" name="vMobileNo"
                                    onChange={this.onChangeNumber.bind(this, 'vMobileNo')}
                                    value={signupData["vMobileNo"]} />
                                {this.validator.message('mobile no ', this.state.signupData.vMobileNo, 'required', { className: 'text-danger' })}
                            </div>

                            <div className="form-group">

                                <label htmlFor="recipient-name" className="col-form-label" >Gender</label>

                                <div class="form-check form-check-inline">
                                    <input type="radio" className="m-3"
                                        checked={!signupData['genderType']}
                                        onChange={(e) => this.changedCheckBox(e, 'male')}
                                    />
                                    <label class="form-check-label" for="inlineRadio1">Male</label>
                                </div>
                                <div class="form-check form-check-inline">

                                    <input type="radio" className="m-3"
                                        checked={signupData['genderType']}
                                        onChange={(e) => this.changedCheckBox(e, 'female')}
                                    />
                                    <label class="form-check-label" for="inlineRadio2">Female</label>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label" >Date Of Birth </label>
                                    <DatePicker selected={this.state.signupData.dateOfBirth} onChange={this.dateChange} className="form-control"
                                        placeholderText="Select D.O.B"
                                    />

                                    {this.validator.message('date of birth ', this.state.signupData.dDOB, 'required', { className: 'text-danger' })}
                                </div>


                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label" >Select Country </label>
                                    <Select options={countries} value={this.state.signupData.vCountry} onChange={this.changeHandler} />

                                    {this.validator.message('country ', this.state.signupData.vCountry, 'required', { className: 'text-danger' })}
                                </div>


                                {this.validator.message('mobile no ', this.state.signupData.vMobileNo, 'required', { className: 'text-danger' })}
                            </div>

                            <div className="mrg-top-20 text-center">
                                <input type="submit" className="btn btn-primary" value="SignUp" />
                            </div>
                        </form>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

const actionCreators = {
    login: userActions.login
};

export default connect(null, actionCreators)(signup);
