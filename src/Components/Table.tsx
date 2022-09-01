
import React, { forwardRef } from 'react'
import MaterialTable, { MaterialTableProps } from '@material-table/core'
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';

const tableIcons = {
    Add: forwardRef((props) => <AddBox {...props} />),
    Check: forwardRef((props) => <Check {...props} />),
    Clear: forwardRef((props) => <Clear {...props} />),
    Delete: forwardRef((props) => <DeleteOutline {...props} />),
    DetailPanel: forwardRef((props) => <ChevronRight {...props} />),
    Edit: forwardRef((props) => <Edit {...props} />),
    Export: forwardRef((props) => <SaveAlt {...props} />),
    Filter: forwardRef((props) => <FilterList {...props} />),
    FirstPage: forwardRef((props) => <FirstPage {...props} />),
    LastPage: forwardRef((props) => <LastPage {...props} />),
    NextPage: forwardRef((props) => <ChevronRight {...props} />),
    PreviousPage: forwardRef((props) => <ChevronLeft {...props} />),
    ResetSearch: forwardRef((props) => <Clear {...props} />),
    Search: forwardRef((props) => <Search {...props} />),
    SortArrow: forwardRef((props) => <ArrowDownward {...props} />),
    ThirdStateCheck: forwardRef((props) => <Remove {...props} />),
    ViewColumn: forwardRef((props) => <ViewColumn {...props} />)
  };
interface ITableProps extends MaterialTableProps<object> {
    columns: Array<object>;
    data: Array<object>;
}
const Table : React.FC<ITableProps> = ({columns, data, ...otherProps}) => {
  return (
    <div>
        <MaterialTable icons={tableIcons} columns={columns} data={data} {...otherProps}/>
    </div>
  )
}

export default Table