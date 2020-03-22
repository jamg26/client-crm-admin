import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SupportTicketDropdown from "../../../../partials/content/CustomDropdowns/SupportTicketDropdown";
import { withStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { DropzoneArea } from 'material-ui-dropzone'
import { getTicketById } from '../../../../services/support.service';
import PersonIcon from '@material-ui/icons/Person';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'

import { connect } from 'react-redux';

import { awsServices } from '../../../../services/aws.service';
import { saveAttachment } from '../../../../services/support.service'


const classes = theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        textAlign: 'center'
      }
})


class TicketViewUpdateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            isUploaded : false
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    componentDidMount(){
       let id = this.props.match.params;
       getTicketById(id.id)
        .then((results) => {
            console.log(results)
            this.setState({
                ticket : results.data
            });
        })
        .catch((err) => {
            console.log(err)
        })

    }

    onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
          isUploaded : true
        });
    }

    async onUpload() {
        awsServices(this.state.selectedFile)
            .then(response => this.saveAttachment(response))
            .catch(err => console.log(err))
    }

    saveAttachment(data){
        let file = {
            supportTicketId : this.state.ticket.id,
            filePath: data.location,
            fileName: '',
            userId: this.props.user.id
        }
        saveAttachment(file)
            .then(results => this.setState({ticket : results.data}))
            .catch(err => console.log(err))
    }

    render(){
        return (
            <>
              <div className="kt-portlet kt-portlet--height-fluid">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">Support Request</h3>
                  </div>
        
                  <SupportTicketDropdown />
                </div>
                <div className="kt-portlet__body">
                  <div className="kt-widget4">
                        <Grid container spacing={3} justify="center">
                            <Grid item xs={4}>
                                <Paper>
                                   <PersonIcon/> { this.state.ticket ? this.state.ticket.user.firstName : '' } { this.state.ticket ? this.state.ticket.user.lastName : '' }
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper>
                                  <MailOutlineIcon/>  { this.state.ticket ? this.state.ticket.user.email : '' }
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper>
                                   <PhoneIcon/> { this.state.ticket ? this.state.ticket.user.phoneNumber : '' }
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} justify="center">
                            <Grid item xs={12}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Attachments</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container spacing={3} justify="space-between">
                                        <Grid item xs={12}>
                                            <Typography>
                                                Note:Upload attachment extension allow:.pdf, .xlsx, .xls, .png, .doc, .docx, .jpg, .jpeg, .csv, .txt
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <input 
                                                accept="image/*"
                                                style={{display: "none"}}
                                                id="contained-button-file"
                                                type="file"
                                                onChange={this.onChangeHandler}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button variant="contained" color="default" component="span" startIcon={<CloudUploadIcon />}>
                                                    Upload
                                                </Button>
                                            </label>
                                        </Grid>
                                        <Grid item xs={12}>
                                        <List component="nav" className={classes.root} aria-label="Mailbox folders">
                                            <ListItem button>
                                            <ListItemText primary="Inbox" />
                                            </ListItem>
                                            <Divider />
                                            <ListItem button divider>
                                            <ListItemText primary="Drafts" />
                                            </ListItem>
                                            <ListItem button>
                                            <ListItemText primary="Trash" />
                                            </ListItem>
                                            <Divider light />
                                            <ListItem button>
                                            <ListItemText primary="Spam" />
                                            </ListItem>
                                        </List>
                                        </Grid>
                                        <Grid item xs={12}>
                                            { this.state.isUploaded &&
                                                <Button variant="contained" color="primary" disableElevation onClick={this.onUpload}>
                                                    Save
                                                </Button>
                                            }
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} justify="center">
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                  </div>
                </div>
              </div>
            </>
          );
    }

}

const mapStateToProps = (state) => {
	return {
		user : state.auth.user
	}
}

export default connect(mapStateToProps)(TicketViewUpdateComponent);