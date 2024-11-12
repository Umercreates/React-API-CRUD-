// DataTableComponent.js
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination,
  Tooltip,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

const DataTableComponent = ({ title, data }) => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: '#e8f5e9',
        borderRadius: 2,
        boxShadow: 4,
        margin: 'auto',
        maxWidth: '90%',
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#2e7d32' }}
      >
        {title}
      </Typography>
      {data && data.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 200,
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'auto',
              border: '1px solid #c8e6c9',
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {Object.keys(data[0]).map((key) => (
                    <Tooltip key={key} title={`Sort by ${key}`} arrow>
                      <TableCell
                        align="center"
                        sx={{
                          backgroundColor: '#43a047',
                          color: '#ffffff',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: '#388e3c',
                          },
                        }}
                      >
                        {key.toUpperCase()} <SortIcon fontSize="small" sx={{ ml: 1 }} />
                      </TableCell>
                    </Tooltip>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#f1f8e9' },
                        '&:hover': {
                          backgroundColor: '#c8e6c9',
                        },
                      }}
                    >
                      {Object.values(row).map((value, idx) => (
                        <TableCell key={idx} align="center" sx={{ color: '#2e7d32' }}>
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[]}
            sx={{
              '& .MuiTablePagination-actions': { color: '#2e7d32' },
              '& .MuiTablePagination-toolbar': { bgcolor: '#e8f5e9' },
            }}
          />
        </>
      ) : (
        <Typography
          variant="body1"
          align="center"
          sx={{ marginTop: 1, color: '#757575' }}
        >
          No data available.
        </Typography>
      )}
    </Box>
  );
};

export default DataTableComponent;
