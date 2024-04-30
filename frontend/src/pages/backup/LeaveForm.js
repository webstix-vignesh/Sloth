import React, { useState } from 'react';
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
        }
      };
  
      const response = await axios.post(`${API}/leaves`, leaveRequestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      message.success("Leave request submitted successfully!");
      form.resetFields();

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
  

  const teamOptions = [
    { value: 'Project', label: 'Project' },
    { value: 'Support', label: 'Support' },
    { value: 'QA', label: 'QA' },
    { value: 'Design', label: 'Design' },
    { value: 'SEO', label: 'SEO' },
    { value: 'Management', label: 'Management' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Internal project', label: 'Internal project' },
  ];

  const leaveType = [
    { value: 'Casual Leave', label: 'CL (Casual Leave)' },
    { value: 'Paid Leave', label: 'EL/PL (Earned/Privileged Leave)' },
    { value: 'Sick Leave', label: 'SL (Sick Leave)' },
  ];

  const reportsToOptions = [
    { value: 'Karthick', label: 'Karthick' },
    { value: 'Sankar', label: 'Sankar' },
    { value: 'Joe', label: 'Joe' },
    { value: 'Noel', label: 'Noel' },
    { value: 'Bala', label: 'Bala' },
    { value: 'Ram', label: 'Ram' },
  ];

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
            rules={[{ required: true, message: 'Please select your department!' }]}
          >
            <Select placeholder="Select your department">
              {teamOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
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
              {leaveType.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Reports to"
            name="reports_to"
            rules={[{ required: true, message: 'Please select your reporting manager!' }]}
          >
            <Select placeholder="Select your reporting manager">
              {reportsToOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
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
