import React from 'react';
import { ListItem , ListItemText, Divider, Grid, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import { getFileName } from '../../../../../_metronic/utils/utils';
import { deleteAttachment } from '../../../../services/support.service';

class TicketSupportAttachment extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : null
        }
    }

    componentDidMount(){
        this.setState({data: this.props.data});
    }

    downloadFile(file){
        const response = {
            file: file,
        };
        window.location.href = response.file;
    }

    async deleteAttachment(id){
        deleteAttachment(id)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    renderAttachments() {
        if (this.state.data){
           return (
                <>
                     <ListItem>
                        <Grid container spacing={3} justify="space-between" key={`grid=${this.state.data.id}`}>
                            <Grid item xs={6}><ListItemText primary={this.state.data.fileName ? this.state.data.fileName : getFileName(this.state.data.filePath)} /></Grid>
                            <Grid item xs={6}>
                                <a href={this.state.data.filePath}
                                    download={this.state.data.filePath} target="_blank">
                                    <IconButton aria-label="download">
                                        <GetAppIcon fontSize="small"/>
                                    </IconButton>
                                </a>
                                <IconButton aria-label="Delete" onClick={() => this.deleteAttachment(this.state.data.id)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider light />
                </>
           )
        }
    }

    render() {

        return (
            <>
                { this.renderAttachments() }
            </>
        )
    }
}

export default TicketSupportAttachment;