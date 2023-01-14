import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button, Input, Checkbox, notification} from 'antd';
import {Tab, Tabs} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import axios from 'axios';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            Userdata : {},
        };
        // this.handleModalShow = this.handleModalShow.bind(this);
        // this.handleModalClose = this.handleModalClose.bind(this);
        // this.handleEditModalShow = this.handleEditModalShow.bind(this);
        // this.handleEditModalClose = this.handleEditModalClose.bind(this);
    };
    componentDidMount(){
        this.GetUserdata()
    }

    GetUserdata = () => {
        console.log(localStorage.getItem('currentUser'))
        axios.post(`http://localhost:2400/api/auth/eachuser`, 
        {
            user:localStorage.getItem('currentUser')
        },
        {
            headers: {
              "Content-Type": "application/json",
              "authorization" : "bearer my-token-secret"
            },
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","Update your profils please",'success');
                this.setState({
                    Userdata : res.data.userdata
                })
            }else{
                this.openNotification("Failure!","Sorry Get your data failed",'error');
            }
        })
    }
    UpdateUser = (sendData) => {
        axios.post(`http://localhost:2400/api/auth/updateuser`, 
        {
            user:localStorage.getItem('currentUser'),
            userdata : sendData
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","Update your profils please",'success');
            }else{
                this.openNotification("Failure!","Sorry Get your data failed",'error');
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
            <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/main">Profile</Navbar.Brand>
                <Nav className="justify-content-end" style={{display : 'flex', justifyContent : 'space-between'}}>

                    <Nav.Link href="/video">Video</Nav.Link>
                    <Nav.Link href="/music">Music</Nav.Link>
                    <Nav.Link href="/food">Food</Nav.Link>

                    <Nav.Link href="/" style={{float : 'right', marginRight : '0px'}}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div className='container-fluid'>
                <div className='row mt-2'>
                    <h3>Profile page</h3>
                </div>
                <div className='row'>
                    <div className='container-fluid login-background d-flex'  style={{paddingTop : '10vh'}}>
                        <div className='row d-flex login-form' style={{height : 'fit-content'}}>
                            <h1>{this.state.Userdata.username}</h1>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={this.UpdateUser}
                                autoComplete="off"
                                
                            >
                                <Form.Item 
                                    className='form-input'
                                    label="First Name"
                                    name="firstname"
                                    rules={[{ required: true, message: 'Please input your firstname!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item 
                                    className='form-input'
                                    label="Last Name"
                                    name="lastname"
                                    rules={[{ required: true, message: 'Please input your lastname!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item 
                                    className='form-input'
                                    label="Address"
                                    name="address"
                                    rules={[{ required: true, message: 'Please input your address!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item 
                                    className='form-input'
                                    label="Tel"
                                    name="tel"
                                    rules={[{ required: true, message: 'Please input your telephone!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item 
                                    className='form-input'
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>

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

                                <Form.Item className='justify-content-center'>
                                    <Button type="primary" htmlType="submit">
                                    Complete Profile
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            </>
            
            
        )
    }
}
export default Home;