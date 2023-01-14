import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button, Input, Checkbox, notification} from 'antd';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

class Music extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            musics : [],
            currentmusictitle : '',
            currentmusicsubtitle : '',
            currentmusicid : '',
            modalshow : false,
            editmodalshow : false
        };
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleEditModalShow = this.handleEditModalShow.bind(this);
        this.handleEditModalClose = this.handleEditModalClose.bind(this);
    };

    componentDidMount(){
        this.GetUserRole()
    }
    GetUserRole = () => {
        console.log(localStorage.getItem('currentUser'))
        axios.post(`http://localhost:2400/api/auth/eachuser`, 
        {
            user:localStorage.getItem('currentUser')
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.userdata.music === true){
                this.setState({permission : true})
                this.Getdata()
            }
            else
            this.setState({permission : false})
        })
    }
    Getdata = () => {
        console.log(localStorage.getItem('currentUser'))
        axios.post(`http://localhost:2400/api/music/getuserdata`, 
        {
            user:localStorage.getItem('currentUser')
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            this.setState({musics : res.data.response});
        })
    }

    handleModalShow = () => {
        this.setState({
            modalshow: true,
        })
    };
    handleModalClose = () => {
        this.setState({
            modalshow: false,
        })
    };

    handleEditButton = (e) => {
        this.setState({
            editmodalshow : true
        })
        let id = e.target.parentNode.id;
        console.log(id)
        this.state.musics.forEach(music => {
            if(music._id === id){
                console.log(music)
                this.setState({
                    editmodalshow : true,
                    currentmusictitle : music.title,
                    currentmusicsubtitle : music.subtitle,
                    currentmusicid : music._id
                })
            }
        })
        
    }

    handleEditModalShow = () => {
        this.setState({
            editmodalshow: true,
        })
    };
    handleEditModalClose = () => {
        this.setState({
            editmodalshow: false,
        })
    };

    openNotification = (title,discription,icon) => {
        notification[icon]({
          message: title,
          description: discription,
          duration:2
        });
    };

    onCreate = (sendData) => {
        axios.post(`http://localhost:2400/api/music/create`, 
        {
            data:sendData,
            owner:localStorage.getItem('currentUser')
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","Your favourite music list created",'success');
            }else{
                this.openNotification("Failure!","Sorry Create failed",'error');
            }
        })
        .then(this.handleModalClose)
        .then(this.Getdata)
    }

    onUpdate = (sendData) => {
        axios.post(`http://localhost:2400/api/music/update`, 
        {
            data:sendData,
            id : this.state.currentmusicid
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","Your favourite music list updated",'success');
            }else{
                this.openNotification("Failure!","Sorry Update failed",'error');
            }
        })
        .then(this.handleEditModalClose)
        .then(this.Getdata)
    }

    onDelete = (e) => {
        axios.post(`http://localhost:2400/api/music/delete`, 
        {
            id : e.target.parentNode.id
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","Your favourite music deleted",'success');
            }else{
                this.openNotification("Failure!","Sorry Delete failed",'error');
            }
        })
        .then(this.Getdata)
    }
    render() {
        return(
            this.state.permission == true ? 
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
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h3>Your favourite music page</h3>
                        </div>
                        <div>
                            <Button className='logout-btn' type="danger" size='large' onClick={this.handleModalShow}>Create your favourite music</Button>
                            <Modal show={this.state.modalshow} onHide={this.handleModalClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create your favourite music list</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <Form
                                        name="basic"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        initialValues={{ remember: true }}
                                        onFinish={this.onCreate}
                                        autoComplete="off"
                                    >
                                        <Form.Item 
                                            className='form-input'
                                            label="Title for music"
                                            name="title"
                                            rules={[{ required: true, message: 'Please input the title for music!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item 
                                            className='form-input'
                                            label="Subtitle for music"
                                            name="subtitle"
                                            rules={[{ required: true, message: 'Please input subtitle for music!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item className='justify-content-center'>
                                            <Button type="danger" htmlType="submit">
                                                Create
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                    <div className='row'>
                        {this.state.musics.length > 0 ? 
                            this.state.musics.map((music) => 
                                <div className='col-3 col-md-4 col-sm-6 col-xs-12 m-3' key = {music._id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={require('../images/music_thumbnail.jpg')} />
                                        <Card.Body id={music._id}>
                                            <Card.Title>{music.title}</Card.Title>
                                            <Card.Text>
                                            {music.subtitle}
                                            </Card.Text>
                                            <button className='ant-btn-primary' type='button' style={{marginRight : '1rem'}} onClick = {(e) => {this.handleEditButton(e)}}>Edit</button>
                                            <button className='ant-btn-danger' type='danger' style={{marginLeft : '1rem'}} onClick = {(e) => this.onDelete(e)}>Delete</button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                            :
                            <>
                                <p>Please add your favourite music</p>
                            </>}
                        
                    </div>
                    <Modal show={this.state.editmodalshow} onHide={this.handleEditModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update your favourite music list</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={this.onUpdate}
                                autoComplete="off"
                            >
                                <Form.Item 
                                    className='form-input'
                                    label="Title for music"
                                    name="title"
                                    rules={[{ required: true, message: 'Please input the title for music!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item 
                                    className='form-input'
                                    label="Subtitle for music"
                                    name="subtitle"
                                    rules={[{ required: true, message: 'Please input subtitle for music!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item className='justify-content-center'>
                                    <Button type="danger" htmlType="submit">
                                        Update
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            </>
            :
            <>
            <h3>Sorry You don't have permission for this page</h3>
            <h3>To see this page, Contact with admin please</h3>
            </>
        )
    }
}
export default Music;