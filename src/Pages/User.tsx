import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useCallback, useState } from "react";
import Table from "../Components/Table";
import { IUser } from "../utils/DataSource/User";
import { Role } from "../utils/Role";

type GenericObject = { [key: number]: string };
const lookupObject: GenericObject = {};
const columns = [
  { title: "First Name", field: "firstName" },
  { title: "Middle Name", field: "middleName" },
  { title: "Last Name", field: "lastName" },
  { title: "Email", field: "email" },
  { title: "Phone", field: "phone" },
  {
    title: "Role",
    field: "role",
    lookup: Object.keys(Role).reduce((acc, elem: string) => {
      acc[Role[elem as keyof typeof Role]] = elem;
      return acc;
    }, lookupObject),
  },
  { title: "Address", field: "address" },
  {
    title: "Created On",
    field: "createdOn",
    type: "datetime",
    editable: false,
  },
  {
    title: "Edited On",
    field: "modifiedOn",
    type: "datetime",
    editable: false,
  },
];

const UserList = () => {
  const [data, setData] = useState<Array<IUser>>([]);
  const [loading, setLoading] = useState(false);
  const onLoad = async () => {
    try {
      setLoading(true);
      const config = {
        url: "http://localhost:4000/users",
        method: "get",
      };
      const response = await axios(config);
      const userData = response.data;
      setData(userData);
      setLoading(false);
    } catch (err) {
      console.log("error while fetching users => ", err);
    }
  };
  const getSpecificUser = async (id: number): Promise<IUser | undefined> => {
    try {
      const config = {
        url: `http://localhost:4000/users/${id}`,
        method: "get",
      };
      const response = await axios(config);
      return response.data;
    } catch (err) {
      console.log("Error while getting specific user details => ", err);
    }
  };
  const onUserCreate = useCallback(
    (newData: object): Promise<void> => {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("form data => ", newData);
          const role = +(newData as any).role;
          const formData = newData as IUser;
          formData.role = role;
          const config = {
            url: "http://localhost:4000/users",
            method: "post",
            data: formData,
          };
          const response = await axios(config);
          setData([...data, response.data as IUser]);
          resolve();
        } catch (err) {
          console.log("error while creating new user => ", err);
          reject();
        }
      });
    },
    [data]
  );
  const onUserEdit = useCallback(
    (newData: object, oldData?: object): Promise<void> => {
      return new Promise(async (resolve, reject) => {
        try {
          const { id } = newData as IUser;
          const formData = newData as IUser;
          const config = {
            url: `http://localhost:4000/users/${id}`,
            method: "patch",
            data: formData,
          };
          await axios(config);
          const userData = await getSpecificUser(id);
          if (userData) {
            const dataUpdate = [...data];
            const index = (oldData as any).tableData.index;
            dataUpdate[index] = userData;
            setData([...dataUpdate]);
          }

          resolve();
        } catch (err) {
          console.log("error while editing the user");
          reject();
        }
      });
    },
    [data]
  );

  const onUserDelete = useCallback(
    (oldData: object): Promise<void> =>
      new Promise(async (resolve, reject): Promise<void> => {
        try {
          const { id } = oldData as IUser;
          const config = {
            url: `http://localhost:4000/users/${id}`,
            method: "delete",
          };
          const response = await axios(config);
          console.group("response from user delete => ", response);
          const dataDelete = [...data];
          const index = (oldData as any).tableData.index;
          dataDelete.splice(index, 1);
          const newDataArray = dataDelete.map((elem: any) => {
            delete elem.tableData;
            return elem as IUser;
          });
          setData(newDataArray);

          resolve();
        } catch (err) {
          console.log("error while user delete => ", err);
          reject();
        }
      }),
    [data]
  );
  console.log("data ", data);
  return (
    <div>
      <h1>User List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Button onClick={onLoad} variant="contained">
          {data.length ? "Refresh" : "Load Data"}
          {loading ? <CircularProgress color="secondary" /> : null}
        </Button>
      </div>
      <Table
        columns={columns}
        data={data}
        title={"User List"}
        options={{
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: onUserCreate,
          onRowUpdate: onUserEdit,
          onRowDelete: onUserDelete,
        }}
      />
    </div>
  );
};

export default UserList;
