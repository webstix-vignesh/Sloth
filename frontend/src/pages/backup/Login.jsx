import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/useScreenSize";
import { API } from "../../constant";
import { setToken } from "../../helpers";
import logo from "../../assets/logo/logo.png"
import bg from "../../assets/images/bg-signup.jpg"
import '../../assets/styles/glassy.css';

const Login = () => {
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);
        navigate("/dashboard");
        message.success(`Welcome back ${data.user.username}!`);

      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Row
        align="middle"
        justify="center" // Center the form horizontally
        style={{ minHeight: "100vh",  backgroundImage: `url(${bg})` }} // Center the form vertically
      >
        <Col span={isDesktopView ? 8 : 16}>
        <Card className="glassy-card custom-card">
         
            {/* <Typography.Title level={4}   align="middle">Login</Typography.Title> */}
            <div style={{ textAlign: "center" }}>
            
              <img width={130} src={logo} alt="Login" />
            </div>
            {error && (
              <Alert
                className="alert_error"
                message={error}
                type="error"
                closable
                afterClose={() => setError("")}
              />
            )}
           <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
                style={{ marginBottom: 16 }}  // Add style to set margin bottom
              >
                <Input placeholder="Email address" style={{ borderRadius:'0px'}} />
              </Form.Item>
            
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
                style={{ marginBottom: 16 }}  
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Typography.Paragraph className="form_help_text">
             <Link to="/">Forgot your password?</Link>
            </Typography.Paragraph>
              <Form.Item style={{ marginBottom: 36, marginTop:20 }}>  
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_submit_btn"
                  style={{ width: "100%" }}  
                >
                  Login {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
            </Form>
            
           
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Login;
