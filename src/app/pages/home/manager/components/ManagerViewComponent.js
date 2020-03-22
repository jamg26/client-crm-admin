import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserAdmin, saveUserAdmin, updateUserAdmin, deleteUserAdmin } from '../../../../services/manager.service';

const BusinessViewComponent = () => {
  const [state, setState] = useState(0);
  
  const notify = (data) => {
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }



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
    <div>
      <ToastContainer />
      <MaterialTable
      title="Admin Manager"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve,reject) => {
            saveUserAdmin(newData)
              .then((result) => {
                notify({success: true, message: 'Admin Created'});
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              })
              .catch((err) => {
                notify({success: false, message: 'Error in saving admin'});
                reject(err)
              })
          }),
        onRowUpdate: (newData, oldData) =>
           new Promise((resolve, reject) => {
            updateUserAdmin(newData)
              .then((result) => {
                resolve();
                notify({success: true, message: 'Update Admin'});
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              })
              .catch((err) => {
                notify({success: false, message: 'Error in updating admin'});
                reject(err)
              })
          }),
        onRowDelete: oldData =>
          new Promise((resolve,reject) => {
            deleteUserAdmin(oldData.id)
              .then((result) => {
                resolve();
                notify({success: true, message: 'Deleted Admin'});
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              })
              .catch((err) => {
                notify({success: true, message: 'Error in deleting Admin'});
                reject(err)
              });
          }),
      }}
    />
    </div>
  );
}

export default BusinessViewComponent;