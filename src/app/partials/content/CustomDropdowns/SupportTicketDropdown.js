/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

class SupportTicketDropdown extends React.Component{

  constructor(props){
    super(props);
    this.handleCloseEvent = this.handleCloseEvent.bind(this);
  }

  handleCloseEvent(){
    this.props.handleClose(true)
  }

  render(){
    return (
      <Dropdown className="kt-portlet__head-toolbar" drop="down" alignRight>
        <Dropdown.Toggle
          variant="transparent"
          className="btn btn-label-success btn-sm btn-bold dropdown-toggle"
          id="dropdown-toggle-top"
        >
          Action
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right">
          <ul className="kt-nav">
            <li className="kt-nav__item">
              <a href="#" className="kt-nav__link" onClick={this.handleCloseEvent}>
                <i className="kt-nav__link-icon flaticon-close" />
                <span className="kt-nav__link-text">Close</span>
              </a>
            </li>
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default SupportTicketDropdown;
