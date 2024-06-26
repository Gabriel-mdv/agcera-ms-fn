import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoreButton from '../../components/MoreButton';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import { getAllUsersAction, selectAllUser } from '../../redux/usersSlice';
import { tokens } from '../../themeConfig';

const UsersPage = () => {
  /* eslint-disable no-unused-vars */
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const users = useSelector(selectAllUser);

  console.log(users, '_______________________________');

  useEffect(() => {
    dispatch(getAllUsersAction({}));
  }, [dispatch]);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },

    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'isActive',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <StatusBadge
          status={params.value ? 'active' : 'inactive'}
          bg={params.value ? 'bg-green-500' : 'bg-red-500'}
          color={'white'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => <MoreButton id={params.id} model={'user'} />,
    },
  ];

  return (
    <Box className="w-full h-full overflow-auto">
      <PageHeader
        title="USERS"
        hasGenerateReport={() => {
          console.log('Generate Report of users');
        }}
        hasCreate={() => {
          console.log('Create user');
        }}
      />

      <Box
        className="mr-3 mt-5"
        sx={{
          [`& .${gridClasses.columnHeaders}`]: {
            color: 'red',
          },
          [`& .${gridClasses.root}`]: {
            border: 'none',
          },
          [`& .${gridClasses.footerContainer}`]: {
            backgroundColor: colors.text_light.main,
          },
          // table header row
          [`& .${gridClasses.columnHeader}`]: {
            background: colors.highlight.main,
            color: colors.text_light,
          },
          // header icons
          [`& .${gridClasses.iconSeparator}`]: {
            color: colors.text_light.main,
          },
        }}
      >
        <DataGrid
          className="overflow-x-auto"
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          isRowSelectable={() => false}
        />
      </Box>
    </Box>
  );
};
export default UsersPage;
