import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function CommonTable({
  data,
  columnName,
  handleClick
}) {
  return (
    <TableContainer sx={{width: '75rem', marginLeft: '10rem', marginTop: '5rem'}} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columnName.map((item) => {
              return <StyledTableCell>{item.title}</StyledTableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <StyledTableRow 
            sx={{
              opacity: row.status === "approved" ? "0.5" : "1",
              pointerEvents: row.status === "approved" ? "none" : "unset"
            }}
            key={i}>
              {columnName.map((item) => {
                if(item.key === 'buttons'){
                  return (<div>
                    <Button onClick={() => handleClick('accept', row)} sx={{marginLeft: '-57px',marginTop: '8px',  color: 'green'}}>Accept</Button>
                    <Button onClick={() => handleClick('reject', row)} sx={{marginTop: '8px',  color: 'red'}}>Reject</Button>
                  </div>)
                } else {
                  return <StyledTableCell>{row[item.key]}</StyledTableCell>
                }
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommonTable;