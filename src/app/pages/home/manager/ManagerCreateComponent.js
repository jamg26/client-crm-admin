import React from "react";
import {
    Portlet,
    PortletBody,
    PortletHeader,
    PortletHeaderToolbar
  } from "../../../partials/content/Portlet";
import { Form, Col, Row, Button  } from 'react-bootstrap';
import { saveUserAdmin } from '../../../services/manager.service';

class ManagerCreateComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = { 
            email : '',
            phone: '',
            firstname: '',
            lastname: '',
        };
        this.saveUserAdmin = this.saveUserAdmin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }


    saveUserAdmin(){
        saveUserAdmin(this.state)
            .then((results) => {
                console.log(results)
                //this.props.history.push('/business');
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
                    <PortletHeader title="Add Master Admin"/>
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
                                    name="firstname"
                                    value={this.state.firstname} 
                                    onChange={this.handleChange}
                                    />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name="lastname"
                                    value={this.state.lastname} 
                                    onChange={this.handleChange}
                                    />
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="button" onClick={this.saveUserAdmin}> Submit </Button>
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
  
  export default ManagerCreateComponent;