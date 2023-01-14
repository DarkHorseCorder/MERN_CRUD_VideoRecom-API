import React from 'react';
import {notification} from 'antd';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {Tab, Tabs} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import apiClient from "../http-common";
import axios from 'axios';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: [] ,
            videos: [] ,
            musics: [] ,
            foods: [] ,
            test : ''
        };
    }
    componentDidMount(){
        this.GetUserData()
        this.GetVideoData()
        this.GetMusicData()
        this.GetFoodData()
    }

    async GetUserData () {
        let res = await apiClient.get("/auth/getusers",{
            headers: {
                "Content-Type": "application/json",
                "authorization" : "bearer my-token-secret"
              },
        })
        console.log(res.data.response)
        this.setState({users : res.data.response});
    }

    async GetVideoData () {
        let res = await apiClient.get("/video")
        console.log(res.data.response)
        this.setState({videos : res.data.response});
    }

    async GetMusicData () {
        let res = await apiClient.get("/music")
        console.log(res.data.response)
        this.setState({musics : res.data.response});
    }

    async GetFoodData () {
        let res = await apiClient.get("/food")
        console.log(res.data.response)
        this.setState({foods : res.data.response});
    }

    handleVideoCheckStateChange = (e) =>{
        let id = e.target.parentNode.parentNode.parentNode.id;
        let currentUsers = [... this.state.users];
        currentUsers.forEach(user => {
            if(user._id === id){
                user.video = e.target.checked;
            }
        })
        this.setState({
            users: currentUsers,
        })
        this.changeVideoState(id, e.target.checked);
    }
    async changeVideoState2 () {
        let res = await apiClient.post("/auth/changeVideoState")
        console.log(res.data.response)
        this.setState({users : res.data.response});
    }
    changeVideoState = (id, stateValue) =>{
        axios.post(`http://localhost:2400/api/auth/changeVideoState`, 
        {
            "id" : id,
            "stateValue" : stateValue
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","User's Video access role changed",'success');
            }
            else{
                this.openNotification("Failure!","Sorry failed!",'error');
            }
        })
    }

    handleMusicCheckStateChange = (e) =>{
        let id = e.target.parentNode.parentNode.parentNode.id;
        let currentUsers = [... this.state.users];
        currentUsers.forEach(user => {
            if(user._id === id){
                user.music = e.target.checked;
            }
        })
        this.setState({
            users: currentUsers,
        })
        this.changeMusicState(id, e.target.checked);
    }
    changeMusicState = (id, stateValue) =>{
        axios.post(`http://localhost:2400/api/auth/changeMusicState`, 
        {
            "id" : id,
            "stateValue" : stateValue
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","User's Music access role changed",'success');
            }
            else{
                this.openNotification("Failure!","Sorry failed!",'error');
            }
        })
    }


    handleFoodCheckStateChange = (e) =>{
        let id = e.target.parentNode.parentNode.parentNode.id;
        let currentUsers = [... this.state.users];
        currentUsers.forEach(user => {
            if(user._id === id){
                user.food = e.target.checked;
            }
        })
        this.setState({
            users: currentUsers,
        })
        this.changeFoodState(id, e.target.checked);
    }
    changeFoodState = (id, stateValue) =>{
        axios.post(`http://localhost:2400/api/auth/changeFoodState`, 
        {
            "id" : id,
            "stateValue" : stateValue
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
            
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","User's Food access role changed",'success');
            }
            else{
                this.openNotification("Failure!","Sorry failed!",'error');
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

    handleUserDelete = (e) => {
        let id = e.target.parentNode.parentNode.id;
        this.deleteUser(id)
    }

    deleteUser = (id) =>{
        axios.post(`http://localhost:2400/api/auth/deleteuser`, 
        {
            "id" : id,
        },
        {
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","User deleted!",'success');
            }
            else{
                this.openNotification("Failure!","Sorry failed!",'error');
            }
        })
    }

    onMusicDelete = (e) => {
        console.log(e.target.parentNode.id)
        axios.post(`http://localhost:2400/api/music/delete`, 
        {
            id : e.target.parentNode.id
        },
        {
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.data.response==='success'){
                this.openNotification("Success!","Your favourite music deleted",'success');
            }else{
                this.openNotification("Failure!","Sorry Delete failed",'error');
            }
        })
        .then(this.GetMusicData)
    }

    onFoodDelete = (e) => {
        console.log(e.target.parentNode.id)
        axios.post(`http://localhost:2400/api/food/delete`, 
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
                this.openNotification("Success!","Your favourite food deleted",'success');
            }else{
                this.openNotification("Failure!","Sorry Delete failed",'error');
            }
        })
        .then(this.GetFoodData)
    }

    onVideoDelete = (e) => {
        console.log(e.target.parentNode.id)
        axios.post(`http://localhost:2400/api/video/delete`, 
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
                this.openNotification("Success!","Your favourite video deleted",'success');
            }else{
                this.openNotification("Failure!","Sorry Delete failed",'error');
            }
        })
        .then(this.GetVideoData)
    }

    render() {
        return(
            <div className='container-fluid'>
                <div className='row mt-2'>
                    <div className='col-lg-12 d-flex justify-content-between'>
                        <h3>Administrater Page</h3>
                        <Link to={'/'}>
                            <Button className='logout-btn' type="danger" size='large' >Log Out</Button>
                        </Link>
                    </div>
                    <div className='col-lg-12'>
                    <Tabs defaultActiveKey="user_management" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="user_management" title="User Management">
                            <h4>User Management</h4>
                            <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.users.map((user) => 
                                    <tr id={user._id} key={user._id}>
                                        <td>1</td>
                                        <td>{user.username}</td>
                                        <td>{user.password}</td>
                                        <td>
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            label="Video access role"
                                            style={{display: "flex", justifyContent: "center" , padding : "0px"}}
                                            checked = {user.video}
                                            onChange = {(e) => {this.handleVideoCheckStateChange(e)}}
                                        />
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            label="Music access role"
                                            style={{display: "flex", justifyContent: "center" , padding : "0px"}}
                                            checked = {user.music}
                                            onChange = {(e) => {this.handleMusicCheckStateChange(e)}}
                                        />
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            label="Food access role"
                                            style={{display: "flex", justifyContent: "center" , padding : "0px"}}
                                            checked = {user.food}
                                            onChange = {(e) => {this.handleFoodCheckStateChange(e)}}
                                        />
                                        </td>
                                        <td>
                                            <Button onClick={(e) => {this.handleUserDelete(e)}}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="video_management" title="Video Management">
                            <h4>Video Management</h4>
                            <div className='row'>
                                {this.state.videos.length > 0 ? 
                                    this.state.videos.map((video) => 
                                        <div className='col-3 col-md-4 col-sm-6 col-xs-12 m-3' key = {video._id}>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={require('../images/video_thumbnail.jpg')} />
                                                <Card.Body id={video._id}>
                                                    <Card.Title>{video.title}</Card.Title>
                                                    <Card.Text>
                                                    {video.subtitle}
                                                    </Card.Text>
                                                    <button className='ant-btn-danger' type='danger' style={{marginLeft : '1rem'}} onClick = {(e) => this.onVideoDelete(e)}>Delete</button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                    :
                                    <>
                                        <p>There is no video</p>
                                    </>}
                                
                            </div>
                        </Tab>
                        <Tab eventKey="music_management" title="Music Management">
                            <h4>Music Management</h4>
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
                                                    <button className='ant-btn-danger' type='danger' style={{marginLeft : '1rem'}} onClick = {(e) => this.onMusicDelete(e)}>Delete</button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                    :
                                    <>
                                        <p>There is no music</p>
                                    </>}
                                
                            </div>
                        </Tab>
                        <Tab eventKey="food_management" title="Food Management">
                            <h4>Food Management</h4>
                            <div className='row'>
                                {this.state.foods.length > 0 ? 
                                    this.state.foods.map((food) => 
                                        <div className='col-3 col-md-4 col-sm-6 col-xs-12 m-3' key = {food._id}>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={require('../images/food_thumbnail.jpg')} />
                                                <Card.Body id={food._id}>
                                                    <Card.Title>{food.title}</Card.Title>
                                                    <Card.Text>
                                                    {food.subtitle}
                                                    </Card.Text>
                                                    <button className='ant-btn-danger' type='danger' style={{marginLeft : '1rem'}} onClick = {(e) => this.onFoodDelete(e)}>Delete</button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                    :
                                    <>
                                        <p>There is no food</p>
                                    </>}
                                
                            </div>
                        </Tab>
                    </Tabs>
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default Admin;