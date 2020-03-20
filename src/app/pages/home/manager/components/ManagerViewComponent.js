import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getUserAdmin, saveUserAdmin, updateUserAdmin, deleteUserAdmin } from '../../../../services/manager.service';

const BusinessViewComponent = () => {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
    const response = await getUserAdmin();
      setState({
        columns: [
          { title: 'First Name', field: 'firstName' },
          { title: 'Last Name', field: 'lastName' },
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
      title="Admin Manager"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            saveUserAdmin(newData)
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
            updateUserAdmin(newData)
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
          }),
        onRowDelete: oldData =>
          new Promise((resolve,reject) => {
            console.log(oldData.id)
            deleteUserAdmin(oldData.id)
              .then((result) => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              })
              .catch((err) => {
                reject(err)
              });
          }),
      }}
    />
  );
}

export default BusinessViewComponent;