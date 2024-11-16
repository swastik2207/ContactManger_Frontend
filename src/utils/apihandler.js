// services/contactService.js
import axios from 'axios';

// Function to delete a contact by its ID
export const deleteContact = async (contact) => {
  console.log(contact._id)

  try {
    const response = await axios.delete(`/api/delete-contact/${contact._id}`);
    return response.data; // or return success message
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error; // Propagate error to the caller
  }
};
export const createContact = async (contactData) => {
  try {
    // Send POST request to create a new contact
    const response = await axios.post('/api/create-contact', contactData);
    return response.data; // Returning the response data, you can modify it based on what your backend returns
  } catch (error) {
    // Handle error
    console.error('Error creating contact:', error);
    throw error; // Optionally throw the error so it can be caught in the component
  }
};

// Service for updating a contact
export const updateContact = async (data) => {
  console.log(data)
  try {
    const response = await axios.put(`/api/update-contact/${data._id}`, data);
    return response.data; // Assuming the response contains the updated contact
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};


