import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import Main from "../components/layout/Main";
import { useAuthContext } from "../context/AuthContext";
import { API } from "../constant";
import { getToken } from "../helpers";
import axios from 'axios';
import { Button, Form, Input, Select, DatePicker, Card, message } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const LeaveForm = () => {
  const { user } = useAuthContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);
  const [leaveOptions, setLeaveOptions] = useState([]);

  // Department

  useEffect(() => {
    const fetchDepartmentsFromStrapi = async () => {
      try {
        const response = await fetch(`${API}/departments`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const responseData = await response.json();
        const departments = responseData.data;

        // console.log(departments); 

        if (Array.isArray(departments)) {
          setDepartmentOptions(departments);
        } else {
          console.error('Data returned from API is not an array:', departments);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartmentsFromStrapi();
  }, []); // Empty dependency array to run only once on component mount


 // Reporting manager

  useEffect(() => {
    const fetchManagersFromStrapi = async () => {
    try {
      const response = await fetch(`${API}/reporting-managers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const responseData = await response.json();
      const managers = responseData.data;

      // console.log(managers); 

      if (Array.isArray(managers)) {
        setManagerOptions(managers);
      } else {
        console.error('Data returned from API is not an array:', managers);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  fetchManagersFromStrapi();
  }, []); // Empty dependency array to run only once on component mount
  

  //leave types

  useEffect(() => {
    const fetchLeavesTypesFromStrapi = async () => {
      try {
        const response = await fetch(`${API}/leave-types`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const responseData = await response.json();
        const leaveTypes = responseData.data;

        // console.log(leaveTypes); 

        if (Array.isArray(leaveTypes)) {
          setLeaveOptions(leaveTypes);
        } else {
          console.error('Data returned from API is not an array:', leaveTypes);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchLeavesTypesFromStrapi();
  }, []); // Empty dependency array to run only once on component mount


  // Triggering mail

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("emPrAHH5PlpdVpi4e");
  }, []);

  const SERVICE_ID = "service_qn4ekbx";
  const TEMPLATE_ID = "template_5ihfikd";

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const userId = user?.id;
      const startDate = values.range_picker[0].format('DD-MM-YYYY');
      const endDate = values.range_picker[1].format('DD-MM-YYYY');

      const leaveRequestData = {
        data: {
          leave_user_id: userId,
          full_name: values.full_name,
          email: values.email,
          department: values.department,
          emp_id: values.emp_id,
          leave_type: values.leave_type,
          reports_to: values.reports_to,
          start_date: startDate,
          end_date: endDate,
          reason: values.reason,
          leave_status: "PENDING",
          leave_comments: "Your leave request is currently under review.",
        }
      };


      // Send leave request data to your API
      const response = await axios.post(`${API}/leaves`, leaveRequestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      message.success("Leave request submitted successfully!");
      // message.info("Now sending Mail to Your Reporting Person regarding leave request.");

       // Send email using EmailJS
       emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        // leave_user_id: userId,
        full_name: values.full_name,
        email: values.email,
        department: values.department,
        emp_id: values.emp_id,
        leave_type: values.leave_type,
        reports_to: values.reports_to,
        start_date: startDate,
        end_date: endDate,
        reason: values.reason,
      });

      form.resetFields();
      message.success("Mail send successfully regarding Leave request!");

      if (response.ok) {
        // throw new Error("Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      message.error("Error while submitting the leave request!");
    } finally {
      setLoading(false);
    }
  };
  


  
  // const teamOptions = [
  //   { value: 'Project', label: 'Project' },
  //   { value: 'Support', label: 'Support' },
  //   { value: 'QA', label: 'QA' },
  //   { value: 'Design', label: 'Design' },
  //   { value: 'SEO', label: 'SEO' },
  //   { value: 'Management', label: 'Management' },
  //   { value: 'Proposal', label: 'Proposal' },
  //   { value: 'Internal project', label: 'Internal project' },
  // ];

  // const leaveType = [
  //   { value: 'Casual Leave', label: 'CL (Casual Leave)' },
  //   { value: 'Paid Leave', label: 'EL/PL (Earned/Privileged Leave)' },
  //   { value: 'Sick Leave', label: 'SL (Sick Leave)' },
  // ];

  // const reportsToOptions = [
  //   { value: 'Karthick', label: 'Karthick' },
  //   { value: 'Sankar', label: 'Sankar' },
  //   { value: 'Joe', label: 'Joe' },
  //   { value: 'Noel', label: 'Noel' },
  //   { value: 'Bala', label: 'Bala' },
  //   { value: 'Ram', label: 'Ram' },
  // ];

  return (
    <Main>
      <Card
        title="Leave Request Form"
        bordered={false}
        style={{
          maxWidth: 600,
          margin: 'auto',
          padding: 20,
          borderRadius: 8,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '60px',
          textAlign: 'center'
        }}
        align="middle"
        justify="center"
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          name="basic"
          layout="vertical"
          variant="filled"
        >
          <Form.Item
            label="Full name"
            name="full_name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please input a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>

         <Form.Item
           label="Department"
           name="department"
           rules={[{ required: true, message: 'Please select your department!' }]}>

           <Select placeholder="Select your department">
             {departmentOptions.map((option) => (
               <Option key={option.attributes.value} value={option.attributes.value}>
                 {option.attributes.label}
               </Option>
             ))}
           </Select>
         </Form.Item>

          <Form.Item
            label="Employee ID"
            name="emp_id"
            rules={[{ required: true, message: 'Please input your employee ID!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
             label="Leave type"
            name="leave_type"
            rules={[{ required: true, message: 'Please select leave type!' }]}
          >

            <Select placeholder="Select leave type">
               {leaveOptions.map((option) => (
               <Option key={option.attributes.value} value={option.attributes.value}>
                 {option.attributes.label}
               </Option>
             ))}
           </Select>
         </Form.Item>
          <Form.Item
          label="Reports to"
          name="reports_to"
          rules={[{ required: true, message: 'Please select your reporting manager!' }]}>

            <Select placeholder="Select your reporting manager">
             {managerOptions.map((option) => (
               <Option key={option.attributes.value} value={option.attributes.value}>
                 {option.attributes.label}
               </Option>
             ))}
           </Select>
         </Form.Item>
          <Form.Item
            label="Date Range"
            name="range_picker"
            rules={[{ required: true, message: 'Please select date range!' }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: 'Please input the reason for leave!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Main>
  );
}

export default LeaveForm;