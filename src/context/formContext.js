import { createContext, useEffect, useState } from "react";

export const FormContext = createContext(null);

export default function FromProvider({ children }) {
   const [formData,setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });
  const [updateFormData,setUpdateFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });
   const [isFormVisible,setIsFormVisible] = useState(false);
    return (
      <FormContext.Provider
          value={{
            formData,
            setFormData,
            isFormVisible,
            setIsFormVisible,
            updateFormData,
            setUpdateFormData
          }}
      >
        {children}
      </FormContext.Provider>
    );}