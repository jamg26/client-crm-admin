import React from "react";
import {
    Portlet,
    PortletBody,
    PortletHeader,
    PortletHeaderToolbar
  } from "../../../partials/content/Portlet";
import { Form, Col, Row, Button  } from 'react-bootstrap';
import { updateUserAdmin } from '../../../services/manager.service';

class ManagerUpdateComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = { 
            firstName : '',
            lastName: '',
            email: '',
            phoneNumber: '',
        };
        this.updateUser = this.updateUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }


    componentDidMount() {
        let user = this.props.location.state.data;
        this.setState({
            email : user.email ? user.email : '',
            firstName: user.firstName ? user.firstName : '',
            lastName: user.lastName ? user.lastName : '',
            phoneNumber: user.phoneNumber ? user.phoneNumber : '',
            id: user.id ? user.id : ''
        })
    }


    updateUser(){
        updateUserAdmin(this.state)
            .then((results) => {
                this.props.history.push('/manager');
            })
            .catch((err) => {
                console.log(err)
            })
    }
  
    render() {
      return(
        <div className="row">
            <div className="col-xl-12">
                <div className="row row-full-height">
                <div className="col-xl-6">
                    <Portlet fluidHeight={true}>
                    <PortletHeader title="Update Master Admin"/>
                    <PortletBody>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={this.state.email} 
                                    onChange={this.handleChange}
                                    />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter Business Name"
                                    name="phoneNumber"
                                    value={this.state.phoneNumber} 
                                    onChange={this.handleChange}
                                    />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>First name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter First Name"
                                    name="firstName"
                                    value={this.state.firstName} 
                                    onChange={this.handleChange}
                                    />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name="lastName"
                                    value={this.state.lastName} 
                                    onChange={this.handleChange}
                                    />
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="button" onClick={this.updateUser}> Submit </Button>
                        </Form>

                    </PortletBody>
                    </Portlet>
                </div>
                </div>
            </div>
        </div>
      )
    }
  }
  
  export default ManagerUpdateComponent;