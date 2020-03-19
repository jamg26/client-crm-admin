import React from "react";
import {
    Portlet,
    PortletBody,
    PortletHeader,
    PortletHeaderToolbar
  } from "../../../partials/content/Portlet";
import { Form, Col, Row, Button  } from 'react-bootstrap';
import { saveBusiness } from '../../../services/business.service';

class BusinessCreateComponents extends React.Component{

    constructor(props) {
        super(props);
        this.state = { 
            email : '',
            firstname: '',
            lastname: '',
            businessName: '',
            timeZone: ''
        };
        this.saveBusiness = this.saveBusiness.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }


    saveBusiness(){
        saveBusiness(this.state)
            .then((results) => {
                this.props.history.push('/business');
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
                    <PortletHeader title="Create Business"/>
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

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Business Name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter Business Name"
                                    name="businessName"
                                    value={this.state.businessName} 
                                    onChange={this.handleChange}
                                    />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Time Zone</Form.Label>
                                <Form.Control 
                                    as="select"
                                    value={this.state.timeZone} 
                                    name="timeZone"
                                    onChange={this.handleChange}
                                >
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="button" onClick={this.saveBusiness}> Submit </Button>
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
  
  export default BusinessCreateComponents;