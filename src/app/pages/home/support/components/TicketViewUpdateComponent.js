import React, { useState, useEffect } from 'react';
import SupportTicketDropdown from "../../../../partials/content/CustomDropdowns/SupportTicketDropdown";
import { withStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { DropzoneArea } from 'material-ui-dropzone'
import { getTicketById } from '../../../../services/support.service';

const classes = theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display:'flex',
        justifyContent: 'space-between'
      }
})


class TicketViewUpdateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
       let id = this.props.match.params;
       getTicketById(id.id)
        .then((results) => {
            console.log(results)
            this.setState({
                ticket : results.data
            });
            console.log(classes)
        })
        .catch((err) => {
            console.log(err)
        })

    }

    handleChange(event){
        console.log(event)
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
                    <div className="kt-widget4__item">
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <div>
                                    { this.state ? this.state.ticket.user.firstName : '' } { this.state ? this.state.ticket.user.lastName : '' }
                                </div>
                                <div>
                                    { this.state ? this.state.ticket.user.email : '' }
                                </div>
                                <div>
                                     { this.state ? this.state.ticket.user.phoneNumber : '' }
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                        <DropzoneArea 
                            onChange={ this.handleChange }
                        />
                        </Grid>
                        {/* <Grid item xs={6}>
                            <Paper className={classes.paper}>xs=6</Paper>
                        </Grid> */}
                        {/* <Grid item xs={6}>
                            <Paper className={classes.paper}>xs=6</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>xs=3</Paper>
                        </Grid> */}
                        </Grid>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
    }

}

export default withStyles(classes)(TicketViewUpdateComponent);


// const useStyles = makeStyles(theme => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//       display:'flex',
//       justifyContent: 'space-between'
//     },
//   }));

// export default function TicketViewUpdateComponent(props) {

//     const [state, setState] = useState(0);

//     // setState({
//     //     data : props.location.data
//     // },[]);

//     // if (!state.data) {
//     //     // props.history.push({
//     //     //     pathname:`/supportrequest`,
//     //     // })
//     //     props.history.push("/supportrequest");
//     // }


//     // let data = null;

//     // if (!props.location.data) {
//     //     props.history.push({
//     //         pathname:`/supportrequest`,
//     //     });
//     // } else {
//     //     data = props.location.data;
//     // }


//     const classes = useStyles();

//     const handleChange = (event) => {
//         console.log(event)
//     }

    // return (
    //     <>
    //       <div className="kt-portlet kt-portlet--height-fluid">
    //         <div className="kt-portlet__head">
    //           <div className="kt-portlet__head-label">
    //             <h3 className="kt-portlet__head-title">Support Request</h3>
    //           </div>
    
    //           <SupportTicketDropdown />
    //         </div>
    //         <div className="kt-portlet__body">
    //           <div className="kt-widget4">
    //             <div className="kt-widget4__item">
    //             <div className={classes.root}>
    //                 <Grid container spacing={3}>
    //                 <Grid item xs={12}>
    //                     <Paper className={classes.paper}>
    //                         {/* <div>
    //                             { data ? `${data.user.firstName} ${data.user.lastName}` : '' }
    //                         </div>
    //                         <div>
    //                         { data ? `${data.user.email}` : ''  }
    //                         </div>
    //                         <div>
    //                         { data ? `${data.user.phoneNumber}` : '' }
    //                         </div> */}
    //                     </Paper>
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                 <DropzoneArea 
    //                     onChange={ handleChange }
    //                 />
    //                 </Grid>
    //                 {/* <Grid item xs={6}>
    //                     <Paper className={classes.paper}>xs=6</Paper>
    //                 </Grid> */}
    //                 {/* <Grid item xs={6}>
    //                     <Paper className={classes.paper}>xs=6</Paper>
    //                 </Grid>
    //                 <Grid item xs={3}>
    //                     <Paper className={classes.paper}>xs=3</Paper>
    //                 </Grid>
    //                 <Grid item xs={3}>
    //                     <Paper className={classes.paper}>xs=3</Paper>
    //                 </Grid>
    //                 <Grid item xs={3}>
    //                     <Paper className={classes.paper}>xs=3</Paper>
    //                 </Grid>
    //                 <Grid item xs={3}>
    //                     <Paper className={classes.paper}>xs=3</Paper>
    //                 </Grid> */}
    //                 </Grid>
    //             </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   );
// }