import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ContactTable from "./pages/ContactTable";
import { Button } from "@mui/material";
import { FormContext } from "./context/formContext";
import UpdateContactForm from "./pages/UpdateContact";

// Lazy load the NewContact component
const NewContact = lazy(() => import("./pages/NewContact"));
const UpdateContact = lazy(() => import("./pages/UpdateContact"));

const App = () => {
  const { setIsFormVisible } = useContext(FormContext);
  const navigate = useNavigate();

  // Redirect to the "NewContact" page
  const handleAddContactClick = () => {
  
    navigate("/new-contact"); // Redirect to the NewContact page
  };

  return (
    <div className="App">
      <h1 className="text-center text-3xl font-semibold my-4">Contact Table</h1>
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="bg-black p-6 rounded-lg border-4 border-white">
          <div className="text-center mb-6">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddContactClick}
            >
              Add New Contact
            </Button>
          </div>
          <div className="overflow-x-auto">
            <ContactTable />
          </div>
        </div>
      </div>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/new-contact" element={<NewContact />} />
          <Route path="/update-contact" element={<UpdateContactForm/>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppWrapper;
