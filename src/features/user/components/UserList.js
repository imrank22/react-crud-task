import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function UserList({users, deleteUser, editUser}) {
    return (
        <TableContainer component={Paper} style={{ marginTop: '4%' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Website</TableCell>
                        <TableCell>Company name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users?.length ?
                            users.map((row) => (
                                <TableRow
                                    key={row.username}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.username}
                                    </TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.website}</TableCell>
                                    <TableCell>{row.companyName}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Delete">
                                            <IconButton style={{ color: 'red' }} onClick={()=> deleteUser(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Edit">
                                            <IconButton style={{ color: '#1876D1' }} onClick={()=>editUser(row)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow>
                                <TableCell component="th" scope="row">
                                    No employee added
                                </TableCell>
                            </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
