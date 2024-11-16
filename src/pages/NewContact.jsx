
import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import { FormContext } from '../context/formContext';
import { createContact } from '../utils/apihandler';
import { useNavigate } from 'react-router-dom';
const ContactForm = () => {
  // Access context values
 
  const { formData, setFormData} = useContext(FormContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Cleanup function to reset the form data when the component unmounts
    return () => {

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
    })
    };
  }, []); 



 




  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('New Contact Submitted:', formData);
    await createContact(formData)
    navigate("/")
    
  };

  // Render the form only when isFormVisible is true
  return (
    <>
       
        <Paper sx={{ padding: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Add New Contact
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={formData.lastName}
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
                  value={formData.email}
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
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Company"
                  variant="outlined"
                  fullWidth
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  name="jobTitle"
                  value={formData.jobTitle}
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
                    Add Contact
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      
    </>
  );
};

export default ContactForm;
