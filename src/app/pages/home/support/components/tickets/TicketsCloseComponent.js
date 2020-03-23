import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import * as moment from 'moment';
import { getClosedSupportTicket } from '../../../../../services/support.service';

const TicketsAllComponent = () => {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
    const response = await getClosedSupportTicket();
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

  return (
    <MaterialTable
      title="Closed Ticket"
      columns={state.columns}
      data={state.data}
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
          }),
        onRowUpdate: (newData, oldData) =>
           new Promise((resolve, reject) => {
            // updateBusiness(newData)
            //   .then((result) => {
            //     resolve();
            //     if (oldData) {
            //       setState(prevState => {
            //         const data = [...prevState.data];
            //         data[data.indexOf(oldData)] = newData;
            //         return { ...prevState, data };
            //       });
            //     }
            //   })
            //   .catch((err) => {
            //     reject(err)
            //   })
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
           
          }),
      }}
    />
  );
}

export default TicketsAllComponent;