import { Button, CircularProgress } from '@mui/material';
import { flexbox } from '@mui/system';
import React, { useState } from 'react'
import Table from '../Components/Table'
import User from '../utils/DataSource/User';
import { Role } from '../utils/Role';

type GenericObject = { [key: number]: string };
const lookupObject: GenericObject = {}
const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Middle Name', field: 'middleName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' },
    {
      title: 'Role',
      field: 'role',
      lookup: Object.keys(Role).reduce((acc, elem: string) => {
        acc[Role[elem as keyof typeof Role]] = elem
        return acc
      }, lookupObject),
    },
    { title: 'Address', field: 'address' },
    { title: 'Created On', field: 'createdOn', type: 'date' },
    { title: 'Edited On', field: 'editedOn', type: 'date'  },
  ]
  const userData = [
    new User({ 
        firstName: 'Bishal',
        middleName: '',
        lastName: 'Dutta',
        email: 'bishal@dutta.com',
        phone: '8653356936',
        role: Role.SuperAdmin,
        address: 'west bengal',
        createdOn: new Date(),
        editedOn: new Date(),
    }),
    new User({ 
        firstName: 'Bishop',
        middleName: '',
        lastName: 'Dutta',
        email: 'bishop@dutta.com',
        phone: '7001057552',
        role: Role.Admin,
        address: 'west bengal',
        createdOn: new Date(),
        editedOn: new Date(),
    }),
    new User({ 
        firstName: 'ABC',
        middleName: '',
        lastName: 'Dutta',
        email: 'acb@dutta.com',
        phone: '7001057552',
        role: Role.Subscriber,
        address: 'East bengal',
        createdOn: new Date(),
        editedOn: new Date(),
    }),
  ]
const UserList = () => {
    const [data, setData] = useState<Array<User>>([])
    const [loading, setLoading] = useState(false)
    const onLoad = () => {
        setLoading(true)
        setTimeout(()=> {
            setData(userData)
            setLoading(false)
        }, 2000)
    }
  return (
    <div>
        <h1>User List</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <Button onClick={onLoad} variant='contained'>{data.length ? 'Refresh' : 'Load Data'}{loading ? <CircularProgress color='secondary' /> : null}</Button>
        </div>
        <Table
            columns={columns}
            data={data}
            title={"User List"}
            options={{
                actionsColumnIndex: -1
            }}
            editable={{
                onRowUpdate: (newData, oldData): Promise<void> =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...data];
                      const index = (oldData as any).tableData.id;
                      dataUpdate[index] = newData as User;
                      setData([...dataUpdate]);
        
                      resolve();
                    }, 1000)
                  }),
                onRowDelete: (oldData) : Promise<void> =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...data];
                      const index = (oldData as any).tableData.id;
                      dataDelete.splice(index, 1);
                      setData([...dataDelete]);
                      
                      resolve()
                    }, 1000)
                  }),
              }}
      />
    </div>
  )
}

export default UserList