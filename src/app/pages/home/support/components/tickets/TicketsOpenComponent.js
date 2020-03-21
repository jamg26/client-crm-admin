import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getOpenSupportTicket } from '../../../../../services/support.service';

const TicketsAllComponent = () => {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
    const response = await getOpenSupportTicket();
      setState({
        columns: [
          { title: 'Status', field: 'status' },
          { title: 'Name', field: 'name' },
          { title: 'Email', field: 'email' },
          { title: 'Phone', field: 'phone'},
          { title: 'Ticket#', field: 'ticket'},
          { title: 'Subject', field: 'subject'},
          { title: 'Requested On', field: 'requested'}
        ],
        // data : response.data
      });
    }
    fetchData();
  }, []);

  return (
    <MaterialTable
      title="Open Ticket"
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