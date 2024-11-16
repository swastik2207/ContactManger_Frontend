
import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import { FormContext } from '../context/formContext';
import { createContact, updateContact } from '../utils/apihandler';
import { useNavigate } from 'react-router-dom';
const UpdateContactForm = () => {
  // Access context values
 
  const { updateFormData, setUpdateFormData , isFormVisible,setIsFormVisible} = useContext(FormContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Cleanup function to reset the form data when the component unmounts
    return () => {

    setUpdateFormData({
       _id:'',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
    })
    setIsFormVisible(false);
    };
  }, []); 


if(!isFormVisible)return (
    <div>
        This Page is not Accessible
    </div>
)
 




  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    await updateContact(updateFormData);
    navigate("/")
    
  };

  // Render the form only when isFormVisible is true
  return (
    <>
       
        <Paper sx={{ padding: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Update The Contact
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={updateFormData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={updateFormData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  name="email"
                  value={updateFormData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  name="phone"
                  value={updateFormData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Company"
                  variant="outlined"
                  fullWidth
                  name="company"
                  value={updateFormData.company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  name="jobTitle"
                  value={updateFormData.jobTitle}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Update Contact
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      
    </>
  );
};

export default UpdateContactForm;
