import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getBusiness, updateBusiness, saveBusiness, deleteBusiness } from '../../../../services/business.service';

const BusinessViewComponent = () => {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
    const response = await getBusiness();
      setState({
        columns: [
          { title: 'First name', field: 'firstName' },
          { title: 'Last name', field: 'lastName' },
          { title: 'Business Name', field: 'businessName' },
          { title: 'Email', field: 'email' },
          { title: 'Phone', field: 'phoneNumber'}
        ],
        data : response.data
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
            saveBusiness(newData)
              .then((result) => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              })
          }),
        onRowUpdate: (newData, oldData) =>
           new Promise((resolve, reject) => {
            updateBusiness(newData)
              .then((result) => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              })
              .catch((err) => {
                reject(err)
              })
          })
      }}
    />
  );
}

export default BusinessViewComponent;