// ContactTable.js

import React, { useState, useEffect, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TablePagination,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { deleteContact } from '../utils/apihandler';
import { FormContext } from '../context/formContext';
import { useNavigate } from 'react-router-dom';

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [roleFilter, setRoleFilter] = useState('');
  const { formData, setFormData, setIsFormVisible, setUpdateFormData } = useContext(FormContext);
  const navigate = useNavigate();

  // Fetch contacts from backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contacts');
        setContacts(response.data.data); // Assuming the contacts are returned in response.data.data
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleEdit = (contact) => {
    setUpdateFormData(contact);
    setIsFormVisible(true);
    navigate('/update-contact');
  };

  const handleDelete = async (contact) => {
    console.log('Delete contact', contact);
    try {
      const response = await deleteContact(contact);
      setContacts(contacts.filter((c) => c._id !== contact._id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value); // Update the role filter state
  };

  // Filter contacts by selected role
  const filteredContacts = roleFilter
    ? contacts.filter((contact) => contact.jobTitle === roleFilter)
    : contacts;

  // Paginate the filtered contacts
  const paginatedContacts = filteredContacts.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Box sx={{ overflowX: 'auto', padding: 2 }}>
      {/* Filter by Role Dropdown */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel
            id="role-filter-label"
            sx={{
              color: 'white', // Set label color to white
              '&.Mui-focused': {
                color: 'white', // Keep label white when focused
              },
            }}
          >
            Filter by Role
          </InputLabel>
          <Select
            labelId="role-filter-label"
            value={roleFilter}
            onChange={handleRoleFilterChange}
            label="Filter by Role"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // White border
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // White border on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // White border when focused
              },
              color: 'white', // Dropdown text color
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact, index) => (
              <TableRow key={index} hover>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(contact)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(contact)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <TablePagination
          component="div"
          count={filteredContacts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-caption': {
              color: 'white', // Set pagination text color to white
            },
            '& .MuiTablePagination-select, & .MuiTablePagination-toolbar': {
              color: 'white', // Set pagination button text color to white
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ContactTable;
