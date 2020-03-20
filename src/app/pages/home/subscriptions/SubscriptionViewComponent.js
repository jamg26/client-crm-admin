import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
// import { getBusiness, updateBusiness, saveBusiness } from '../../../../services/business.service';

const SubscriptionViewComponent = () => {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
    // const response = await getBusiness();
      setState({
        columns: [
          { title: 'Action', field: 'name' },
          { title: 'Name', field: 'name' },
          { title: 'Business', field: 'businessName' },
          { title: 'Email', field: 'email'},
          { title: 'Phone#', field: 'phone'},
          { title: 'Status', field: 'status'},
          { title: 'Include BO', field: 'includeBo'},
        ],
        // data : response.data
      });
    }
    fetchData();
  }, []);

  return (
    <MaterialTable
      title="Business"
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
            // setTimeout(() => {
            //   resolve();
            //   setState(prevState => {
            //     const data = [...prevState.data];
            //     data.splice(data.indexOf(oldData), 1);
            //     return { ...prevState, data };
            //   });
            // }, 600);
          }),
      }}
    />
  );
}

export default SubscriptionViewComponent;