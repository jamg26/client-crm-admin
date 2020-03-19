import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Tooltip from '@material-ui/core/Tooltip';
import { getUserAdmin, getUserAdminById, deleteUserAdmin } from '../../../services/manager.service';
import Chip from '@material-ui/core/Chip';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

let rows = [];

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

function Manager(props) {
  rows = props.data.row;
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editUserAdmin = (id) => {
    getUserAdminById(id)
      .then((results) => {
        props.props.history.push(`/manager/${id}`, {
          data: results.data,
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteuser = (id) => {
    deleteUserAdmin(id)
      .then((results) => {
        console.log(results)
        props.props.history.push('/manager');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Paper>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.firstName ? row.firstName : ''} { row.lastName ? row.lastName : '' }
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="right">
                { row.hasCRMAdminRole && 
                  <Chip color="primary" label="Active" />
                }
                { !row.hasCRMAdminRole && 
                  <Chip color="secondary" label="Inactive" />
                }
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Delete">
                  <IconButton aria-label="Delete" onClick={ () => deleteuser(row.id) }>
                    <DeleteIcon />
                  </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                  <IconButton aria-label="Edit" onClick={ () => editUserAdmin(row.id)}>
                    <EditIcon />
                  </IconButton>
              </Tooltip>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}


class ManagerViewComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      row: []
    }
  }

  componentDidMount(){
    getUserAdmin()
      .then((results) => {
        this.setState({row:results.data})
      })
  }

  render() {
    return(
      <Manager data={this.state} props={this.props}/>
    )
  }
}

export default ManagerViewComponent;