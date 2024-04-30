import React, { useState } from 'react';
// import { Button, Card, Col, Form, Input, message, Row, Spin, Select } from 'antd';
// import { API } from "../constant";
// import { getToken } from "../helpers";
import Main from "../components/layout/Main";
import { useAuthContext } from "../context/AuthContext";

import axios from 'axios';


const LeaveCheck = () => {
  const [formData, setFormData] = useState({
    reason: '',
    duration: '',
  });
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userId = user?.id; // Get the logged-in user's ID
      
      // Check if all required fields are filled
      if (!formData.reason || !formData.duration) {
        alert('Please fill in all required fields');
        return;
      }

      // Include user ID in the form data
      const dataWithUser = {
        data: {
          reason: formData.reason,
          duration: formData.duration,
          leave_user: userId, // Assuming admin_user is the field to associate with the user
        }
      };

      // Submit leave application to Strapi backend
      await axios.post('http://localhost:1337/api/checks', dataWithUser);

      // Reset form data after successful submission
      setFormData({ reason: '', duration: '' });
      
      // Display success message to the user
      alert('Leave application submitted successfully');
    } catch (error) {
      console.error('Error submitting leave application:', error);
      alert('Failed to submit leave application');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Dummy function to get logged-in user's ID
  const getLoggedInUserId = () => {
    // Implement this function to get the logged-in user's ID
    // For example, you might use authentication context or state
    return '1'; // Replace with actual user ID
  };

  return (
    <Main>
    <form onSubmit={handleSubmit}>
      <label>
        Reason:
        <input
          type="text"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
        />
      </label>
      <label>
        Duration:
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
    </Main>
  );
};

export default LeaveCheck;


