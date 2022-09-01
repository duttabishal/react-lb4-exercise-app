import MaterialTable, { MaterialTableProps } from '@material-table/core'
import React from 'react'
interface ITableProps extends MaterialTableProps<object> {
    columns: Array<object>;
    data: Array<object>;
}
const Table : React.FC<ITableProps> = ({columns, data, ...otherProps}) => {
  return (
    <div>
        <MaterialTable columns={columns} data={data} {...otherProps}/>
    </div>
  )
}

export default Table