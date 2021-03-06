import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { userActions } from '../../actions/user.actions'

import Api from "../../helper/Api";
const api = new Api();

export class dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: {
                'Content-Type': 'application/json',
                'token': this.props.token,
            },
            student_list: [],
        };

    }

    componentDidMount() {
        this.getStudentList()
    }

    getStudentList = () => {
        api.get("/student_api/auth/list", {
            headers: this.state.headers,
            data: { search: this.state.search }
        }).then(res => {
        console.log("🚀 ~ file: dashboard.js ~ line 40 ~ dashboard ~ res", res)

            if (res.status === 200) {
                this.setState({ student_list: ((res.data) ? (res.data) : {}) }, () => {
                    console.log("🚀 ~ file: dashboard.js ~ line 38 ~ dashboard ~ this.setState ~ this.state", this.state.student_list)
                })

            } else if (res.status === 401) {
                toast.error(res.message);
                this.props.logout();
            } else {
                toast.error(res.message);
            }
        })
    }

    handleChangeStatus = (postData) => {
        api.post("/admin_api/blog/change_post_status", {
            headers: this.state.headers,
            data: {
                iStudentID: postData.iStudentID,
            }
        }).then(res => {
            if (res.status === 200) {
                this.getStudentList()
                toast.success(res.message);
            } else if (res.status === 401) {
                toast.error(res.message);
                this.props.logout();
            } else {
                toast.error(res.message);
            }
        })
    }

    deleteStudent = (iStudentID) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                api.post("/student_api/auth/delete", {
                    headers: this.state.headers,
                    data: { iStudentID: iStudentID }
                }).then(res => {
                    if (res.status === 200) {
                        this.getStudentList()
                        toast.success(res.message);
                    } else if (res.status === 401) {
                        toast.error(res.message);
                        this.props.logout();
                    } else {
                        toast.error(res.message);
                    }
                })
            } else {
                // swal("Your data is safe!");
            }
        });
    }

    render() {
        const data = this.state.student_list
        const columns = [
            {
                Header: 'First Name',
                accessor: 'vFirstName',
                sortable: true,
                className: 'my-auto text-center',
            },
            {
                Header: 'Last Name',
                accessor: 'vLastName',
                sortable: true,
                className: 'my-auto text-center',
            },
            {
                Header: 'Email',
                accessor: 'vEmail',
                sortable: true,
                className: 'my-auto text-center',
            },
           
            {
                Header: 'Action',
                accessor: 'iStudentID',
                sortable: true,
                className: 'text-center',
                Cell: (row) => {
                    return (<div>
                        <Link to={`/view/${row.original.iStudentID}`} className="btn btn-info my-2 mx-2" >
                            View
                        </Link>
                        <Link to={`/edit/${row.original.iStudentID}`} className="btn btn-primary my-2 mx-2" >
                            Edit
                        </Link>
                        <button className="btn btn-danger my-2 mx-2" onClick={() => this.deleteStudent(row.original.iStudentID)}  >
                            Delete
                        </button>
                    </div>)
                }
            },
        ];

        return (
            <div className="container">

                <div className="mt-4 mb-3">
                    <h3 className=" float-left"> Students List </h3>
                    {/* <Link to='/add' class="btn btn-dark float-right"> Add Post </Link> */}
                </div>
                <div className="clearfix"></div>

                <ReactTable
                    minRows={(this.state.student_list.length < 10) ? this.state.student_list.length : 0}
                    searching={true}
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight mt-3"
                    globalFilter={true}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.authentication.userData,
        loggedIn: state.authentication.loggedIn,
        token: state.authentication.token,
    }
}

const actionCreators = {
    logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(dashboard);