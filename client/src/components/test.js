import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Table, Input, Space, Modal, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './style.css'

const { TextArea } = Input;
const { Option } = Select;

class Home extends React.Component {

    state={
        displaydata:[],
        current:1,
        pagesize:10,
        total:0,
        searchText: '',
        searchedColumn: '',
        modalvisible: false,
        number:'',
        name:'',
        gender:'Male',
        age:'',
        description:'',
    }

    componentDidMount(){
        this.fetchDisplayData();
    }

    fetchDisplayData = () => {
        fetch(`http://localhost:2400/api/tests`, {
            method: 'get',
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(res =>res.json())
        .then(data => {
            if(data){
                data.sort(function(a,b){return a.number-b.number});
                data.forEach(item=>{
                    item['key']=item._id;
                })
                this.setState({
                    displaydata:data,
                    total:data.length,
                    number:data.length+1,
                })
            }
        })
    }

    getColumnSearch = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
        ),
    });
    
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    onTableChange = (pagination) => {
        this.setState({
            current:pagination.current,
            pagesize:pagination.pagesize,
        })
    }

    showTotal = (total) => {
        return `Total ${total} items`;
    }

    selectRow = (record) => {
        let index=(this.state.current-1)*this.state.pagesize+record.target.parentNode.rowIndex-1;
        let detaildata=this.state.displaydata[index];
        fetch(`http://localhost:2400/api/tests/detail`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({data:detaildata._id})
        })
        .then(res =>res.json())
        .then(data => {
            if(data){
                this.setState({
                    showDescription:data.description,
                })
            }
        })
    }

    Logout = () => {
        this.props.navigate('/');
    }

    AddData = () => {
        this.setState({
            modalvisible:true,
        })
    }

    modalOk = () => {
        let addData={
            number:this.state.number,
            name:this.state.name,
            gender:this.state.gender,
            age:this.state.age,
            description:this.state.description,
        }
        fetch(`http://localhost:2400/api/tests/add`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({data:addData})
        })
        .then(res =>res.json())
        .then(data => {
            if(data){
                data.sort(function(a,b){return a.number-b.number});
                data.forEach(item=>{
                    item['key']=item._id;
                })
                this.setState({
                    displaydata:data,
                    total:data.length,
                    number:data.length+1,
                })
            }
        })
        this.setState({
            modalvisible:false,
            name:'',
            gender:'Male',
            age:'',
            description:'',
        })
    }

    modalCancel = () => {
        this.setState({
            modalvisible:false,
            name:'',
            gender:'Male',
            age:'',
            description:'',
        })
    }

    changeNumber = (e) => {
        this.setState({
            number:e.target.value,
        })
    }

    changeName = (e) => {
        this.setState({
            name:e.target.value,
        })
    }

    changeGender = (e) => {
        this.setState({
            gender:e,
        })
    }

    changeAge = (e) => {
        this.setState({
            age:e.target.value,
        })
    }

    changeDescription = (e) => {
        this.setState({
            description:e.target.value,
        })
    }

    render() {
        const columns = [
            {
                title: 'Number',
                dataIndex: 'number',
                sorter: (a, b) => a.number - b.number,
                align:'center',
                width:'10%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                ...this.getColumnSearch('name'),
                align:'center',
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                filters: [
                    {
                        text: 'Male',
                        value: 'Male',
                    },
                    {
                        text: 'Female',
                        value: 'Female',
                    },
                ],
                onFilter: (value, record) => record.gender.indexOf(value) === 0,
                align:'center',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                sorter: (a, b) => a.age - b.age,
                align:'center',
            },
        ];
        return(
            <div className='container-fluid'>
                <div className='row mt-2'>
                    <div className='col-lg-12'>
                        <Button className='logout-btn' type="danger" size='large' onClick={this.Logout}>Log Out</Button>
                    </div>
                </div>
                <div className='row my-3'>
                    <h1 className='main-title m-0'>L I S T</h1>
                </div>
                <div className='row mt-2'>
                    <div></div>
                </div>
                <div className='row table-div'>
                    <div className='col-lg-8'>
                        <Table columns={columns} dataSource={this.state.displaydata} pagination={{current:this.state.current,pagesize:this.state.pagesize,position:['topCenter'],size:'medium', showSizeChanger:true, showQuickJumper:true,showTotal:this.showTotal}} size='small' onChange={this.onTableChange} bordered={true} onRow={(record, rowIndex) => {
                            return {
                            onClick: this.selectRow,
                            };
                        }} />
                        <Button className='logout-btn mt-2' type="primary" size='large' onClick={this.AddData}>Add Data</Button>
                    </div>
                    <div className='col-lg-4 pt-5'>
                        <h4 className='description-h4 mt-3'>Description:</h4>
                        <TextArea rows={15}  value={this.state.showDescription} placeholder='Select table row to show description.'></TextArea>
                    </div>
                </div>
                <Modal
                    title="Insert New Data."
                    centered
                    visible={this.state.modalvisible}
                    onOk={this.modalOk}
                    onCancel={this.modalCancel}
                >
                    <div className='row'>
                        <div className='col-lg-2 col-md-3 my-auto mt-2'>
                            <p className='add-p'>Number :</p>
                        </div>
                        <div className='col-lg-3 col-md-7 mt-2'>
                            <Input className='pe-0' type={'number'} value={this.state.number} placeholder='Input Number.' onChange={this.changeNumber}></Input>
                        </div>
                        <div className='col-lg-2 col-md-3 my-auto mt-2'>
                            <p className='add-p'>Name :</p>
                        </div>
                        <div className='col-lg-5 col-md-7 mt-2'>
                            <Input  value={this.state.name} placeholder='Input Name.' onChange={this.changeName}></Input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-2 col-md-3 my-auto mt-2'>
                            <p className='add-p'>Gender :</p>
                        </div>
                        <div className='col-lg-4 col-md-7 mt-2'>
                        <Select value={this.state.gender} style={{ width: 120 }} onChange={this.changeGender}>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                        </Select>
                        </div>
                        <div className='col-lg-2 col-md-3 my-auto mt-2'>
                            <p className='add-p'>Age :</p>
                        </div>
                        <div className='col-lg-4 col-md-7 mt-2'>
                            <Input className='pe-0' type={'number'}  value={this.state.age} placeholder='Input Age.'  onChange={this.changeAge}></Input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-3 col-md-3 my-auto mt-2'>
                            <p className='add-p'>Description :</p>
                        </div>
                        <div className='col-lg-9 col-md-9 mt-2'>
                        </div>
                        <div className='col-lg-12 col-md-12 mt-2'>
                            <TextArea rows={5}  value={this.state.description} placeholder='Input Description.'  onChange={this.changeDescription}></TextArea>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

function NavigateLogin(props) {
    let navigate = useNavigate();
    return <Home {...props} navigate={navigate} />
}

export default NavigateLogin;