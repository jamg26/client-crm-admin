import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import * as moment from 'moment';
import { getOpenSupportTicket } from '../../../../../services/support.service';

const TicketsAllComponent = () => {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
    const response = await getOpenSupportTicket();
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
      title="Open Ticket"
      columns={state.columns}
      data={state.data}
    />
  );
}

export default TicketsAllComponent;