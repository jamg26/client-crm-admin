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
import CommentIcon from '@material-ui/icons/Comment';

import { connect } from 'react-redux';
import { getFileName } from '../../../../../_metronic/utils/utils';
import { awsServices } from '../../../../services/aws.service';
import { saveAttachment, getAttachment, getCommentById, saveComment } from '../../../../services/support.service'
import TicketSupportAttachment from './TicketSupportAttachment';
import TextField from '@material-ui/core/TextField';


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
            isUploaded: false,
            toggleForm: false
        }
        this.id = this.props.match.params.id;
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onchangeCommentHandler = this.onchangeCommentHandler.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    componentDidMount(){
       this.geSupportTicketData();
       this.getSupportAttachment();
       this.getSupportCommentById();
    }

    geSupportTicketData(){
        getTicketById(this.id)
            .then(results => this.setState({ticket : results.data}))
            .catch(err => console.log(err))
    }

    getSupportAttachment(){
        getAttachment(this.id)
            .then(results => this.setState({attachments: results.data}))
            .catch(err => console.log(err))
    }

    getSupportCommentById(){
        getCommentById(this.id)
        .then(results => this.setState({comments: results.data}))
        .catch(err => console.log(err))
    }

    onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
          isUploaded : true
        });
    }

    onchangeCommentHandler = event => {
        this.setState({comment: event.target.value});
    }

    async onUpload() {

        try {
            let fleupload = await awsServices(this.state.selectedFile);
            await this.saveAttachment(fleupload);

        } catch(err){
            console.log(err)
        }
    }

    saveAttachment(data){
        let file = {
            supportTicketId : this.state.ticket.id,
            filePath: data.location,
            fileName: getFileName(data.location),
            userId: this.props.user.id
        }
        saveAttachment(file)
            .then(results => this.getSupportAttachment())
            .catch(err => console.log(err))
    }

    async saveCommentHandler(){
        let data = {
            supportTicketId: this.id,
            userId: this.props.user.id,
            comment: this.state.comment
        };
        let comments = await saveComment(data);
        this.getSupportCommentById();
        this.setState({comment:''})
    }

    renderAttachment(){
        if(this.state.attachments) {
            let attachments = this.state.attachments.map(item => 
                <TicketSupportAttachment key={item.id} data={item}/>
            )
            return attachments;
        } else {
            return(
                <>
                <ListItem>No Attachments</ListItem>
                </>
            )
        }
    }

    renderComment(){
        if(this.state.comments) {
           let comment = this.state.comments.map(item => 
                <List key={`${item.id}-${item.comment}`} component="nav" className={classes.root} aria-label="Mailbox folders">
                    <ListItem>
                    <Typography>
                        Derek added a comment - 03/23/20 5:45:22 AM                                     
                    </Typography>
                    </ListItem>
                    <ListItem>
                    <Typography>{ item.comment }</Typography>
                    </ListItem>
                    <Divider light />
                </List>
            );
            return comment;
        }
    }

    commentForm(){
        if (this.state.toggleForm) {
            return (
               <>
                 <Grid item xs={12}>
                    <List component="nav" className={classes.root} aria-label="Mailbox folders">
                    <ListItem>
                    <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        rows="4"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.onchangeCommentHandler}
                        value={this.state.comment}
                        />
                    </ListItem>
                     </List>
                </Grid>
                <Grid item xs={12}>
                    <ListItem>
                        <Button variant="contained" color="default" style={{marginRight:"20px"}} onClick={() => this.setState({toggleForm:false})}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={ () => this.saveCommentHandler() }>Save</Button>
                    </ListItem>
                </Grid>
               </>
            )
        }
    }

    render(){
        return (
            <>

                <div className="kt-portlet">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">Support Request</h3>
                  </div>
                </div>
                </div>

              <div className="kt-portlet kt-portlet--height-fluid">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">
                    # { this.state.ticket ? this.state.ticket.supportTicketKey : '' } / { this.state.ticket ? this.state.ticket.description : '' }
                    </h3>
                  </div>
                  <SupportTicketDropdown />
                </div>
                <div className="kt-portlet__body">
                  <div className="kt-widget4">
                    <List component="nav" className={classes.root} aria-label="Mailbox folders">
                        <ListItem>
                            <Grid container spacing={3} justify="space-between">
                                <Grid item xs={4}>
                                    <PersonIcon/> { this.state.ticket ? this.state.ticket.user.firstName : '' } { this.state.ticket ? this.state.ticket.user.lastName : '' }
                                </Grid>
                                <Grid item xs={4}>
                                    <MailOutlineIcon/>  { this.state.ticket ? this.state.ticket.user.email : '' }
                                </Grid>
                                <Grid item xs={4}>
                                    <div> { this.state.ticket ? this.state.ticket.status : '' } </div>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider light />
                    </List>
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
                                            <ListItem>
                                                <Grid container spacing={3} justify="space-between">
                                                    <Grid item xs={6}><ListItemText primary="Filename" /></Grid>
                                                    <Grid item xs={6}><ListItemText primary="Action" /></Grid>
                                                </Grid>
                                            </ListItem>
                                            <Divider light />
                                            { this.renderAttachment() }
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
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12}>
                        <Grid item xs={12}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                <Typography className={classes.heading}>Comments</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container spacing={3} justify="center">
                                        <Grid item xs={12}>
                                            { this.renderComment() }
                                        </Grid>
                                        { !this.state.toggleForm &&  
                                            <Grid item xs={12}>
                                            <List component="nav" className={classes.root} aria-label="Mailbox folders">
                                                <ListItem>
                                                    <Button variant="contained" color="primary" disableElevation onClick={() => this.setState({toggleForm:true})}>
                                                        Comment
                                                    </Button>
                                                </ListItem>
                                            </List>
                                            </Grid>
                                        }
                                        { this.commentForm() }
                                    </Grid>
                                </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
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