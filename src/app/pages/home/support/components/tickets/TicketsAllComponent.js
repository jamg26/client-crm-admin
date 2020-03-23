import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import * as moment from 'moment';
import { getAllSupportTicket } from '../../../../../services/support.service';

const TicketsAllComponent = (props) => {
  
  const [state, setState] = useState(0);
  const propsData = props.props;
  
  useEffect(() => {
    const fetchData = async () => {
    const response = await getAllSupportTicket();
      setState({
        columns: [
          { title: 'Status', field: 'status' },
          { title: 'Name', field: 'user',
            render: rowData => `${rowData.user.firstName} ${rowData.user.lastName}`
          },
          { title: 'Email', field: 'email',
            render: rowData => `${rowData.user.email}`
          },
          { title: 'Phone', field: 'phone',
            render: rowData => `${rowData.user.phoneNumber}`
          },
          { title: 'Ticket#', field: 'supportTicketKey'},
          { title: 'Subject', field: 'subject'},
          { title: 'Requested On', field: 'dateCreated',
            render: rowData => `${moment(rowData.dateCreated).format('LLL')}`
          }
        ],
        data : response.data
      });
    }
    fetchData();
  }, []);


  const editTicketSupport = (data) => {
    propsData.history.push({
      pathname:`supportrequest/${data.id}`,
      data : data
     });
  }

  return (
    <MaterialTable
      title="All Ticket"
      columns={state.columns}
      data={state.data}
      onRowClick={(event, rowData) => editTicketSupport(rowData)}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            // saveBusiness(newData)
            //   .then((result) => {
            //     resolve();
            //     setState(prevState => {
            //       const data = [...prevState.data];
            //       data.push(newData);
            //       return { ...prevState, data };
            //     });
            //   })
          })
      }}
    />
  );
}

export default TicketsAllComponent;