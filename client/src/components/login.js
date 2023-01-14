import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button, Input, Checkbox, notification} from 'antd';
import {Tab, Tabs} from 'react-bootstrap';
import axios from 'axios';
import './style.css'

class Login extends React.Component {

    componentDidMount(){
        localStorage.setItem('currentUser','null');
    }
    onLogin = (sendData) => {
        axios.post(`http://localhost:2400/api/auth/logins`, 
        {data:sendData},
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.response==='admin'){
                this.openNotification("Success!","Welcone Admin",'success');
                this.props.navigate111("/admin");
            }
            else if(res.data.response==='success'){
                this.openNotification("Success!","W E L C O M E !",'success');
                localStorage.setItem('currentUser',res.data.username);
                this.props.navigate111("/main");
            }else{
                this.openNotification("Failure!","You aren't registered!",'error');
            }
        })
    }
    onRegister = (sendData) => {
        axios.post(`http://localhost:2400/api/auth/register`, 
        {data:sendData},
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","You are registered",'success');
                this.props.navigate111("/");
            }
            else if(res.data.response==='sameuserexist'){
                this.openNotification("Failure!","Same user already exist",'error');
                this.props.navigate111("/");
            }
            else{
                this.openNotification("Failure!","Sorry Your register failed",'error');
            }
        })
    }

    openNotification = (title,discription,icon) => {
        notification[icon]({
          message: title,
          description: discription,
          duration:2
        });
    };

    render() {
      return(
        <div className='container-fluid login-background d-flex'>
            <div className='row d-flex login-form'>
            <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="login" title="Login">
                    <h1>Log In</h1>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onLogin}
                        autoComplete="off"
                    >
                        <Form.Item 
                            className='form-input'
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className='form-input'
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item className='justify-content-center' name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item className='justify-content-center'>
                            <Button type="primary" htmlType="submit">
                            Log In
                            </Button>
                        </Form.Item>
                    </Form>
                </Tab>
                <Tab eventKey="register" title="Register">
                    <h1>Register</h1>
                    <Form
                        name="registerForm"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onRegister}
                        autoComplete="off"
                    >
                        <Form.Item 
                            className='form-input'
                            label="Username"
                            name="register_username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className='form-input'
                            label="Password"
                            name="register_password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item className='justify-content-center'>
                            <Button type="primary" htmlType="submit">
                            Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Tab>
            </Tabs>
                
            </div>
        </div>
      );
    }
}

function NavigateMain(props) {
    let navigate = useNavigate();
    return <Login {...props} navigate111={navigate} />
}

export default NavigateMain;