import React, { Component, Fragment } from 'react'
import "antd/dist/antd.css";
import { Input, Button, List, Modal } from "antd";

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: ['12','34'],
      visible: false,
      editValue: '',
      editId: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
  }
  componentWillMount() {
    
  }
  render() {
    return (
      <Fragment>
        <div style={{ marginTop: "10px", marginLeft: "10px" }}>
          <Input
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="输入待办项内容"
            style={{ width: "300px", marginRight: "10px" }}
          />
          <Button type="primary" onClick={this.handleBtnClick}>
            提交
          </Button>
        </div>
        <List
          style={{ marginTop: "10px", width: "300px", marginLeft: "10px" }}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item actions={[<span onClick={this.handleItemEdit.bind(this, index)}>编辑</span>, <span onClick={this.handleItemDelete.bind(this, index)}>删除</span>]}>
              {item}
            </List.Item>
          )}
        />
        <Modal
          title="编辑待办项内容"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            value={this.state.editValue}
            onChange={this.handleEditChange}
            style={{ width: "300px", marginRight: "10px" }}
          />
        </Modal>
      </Fragment>
    )
  }
  componentDidMount() {
    if (!window.localStorage) {
      alert("浏览器不支持localstorage");
      return false;
    } else {
      var storage=window.localStorage;
      if(storage.todolist){
        let asd=JSON.parse(storage.todolist)
        this.setState({
          list:asd,
        })
        console.log(this.state.list)
      }else{
        let arr=[]
        storage.todolist=JSON.stringify(arr)
        this.setState({
          list:JSON.parse(storage.todolist)
        })
      }
    }
  }
  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }
  handleBtnClick() {
    if (this.state.inputValue) {
      let newList = [...this.state.list, this.state.inputValue]
      window.localStorage.todolist=JSON.stringify(newList)
      this.setState({
        inputValue: '',
        list: newList
      })
    }
  }
  handleItemEdit(id) {
    let newList = [...this.state.list]
    let selectItem = ''
    newList.forEach((item, index) => {
      if (id == index) {
        selectItem = item
      }
    })
    this.setState({
      visible: true,
      editValue: selectItem,
      editId: id
    });
  }
  handleItemDelete(id) {
    let newList = [...this.state.list]
    newList.forEach((item, index) => {
      if (id == index) {
        newList.splice(index, 1)
      }
    })
    window.localStorage.todolist=JSON.stringify(newList)
    this.setState({
      list: newList
    })
  }
  handleEditChange(e) {
    this.setState({
      editValue: e.target.value
    })
  }
  // 模态框确认与取消
  handleOk() {
    let newList = [...this.state.list]
    newList.forEach((item, index) => {
      if (this.state.editId == index) {
        newList[index] = this.state.editValue
      }
    })
    window.localStorage.todolist=JSON.stringify(newList)
    this.setState({
      visible: false,
      list: newList,
      editValue: '',
      editId: ''
    })
  }
  handleCancel() {
    this.setState({
      visible: false,
      editValue: '',
      editId: ''
    });
  }
}
