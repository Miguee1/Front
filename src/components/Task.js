import React, { Component } from "react";
import { Modal, Row, Col, Table, message } from "antd";
import "rsuite/dist/styles/rsuite-default.css";
import { Button, Form, FormGroup, FormControl, ButtonToolbar } from "rsuite";
import axios from "axios";

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: record => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name
  })
};

class Task extends Component {
  columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: text => <a>{text}</a>
    },
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "Description",
      dataIndex: "description"
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "x",
      render: text => (
        <span>
          {" "}
          <Button color={"#98DFAF"} onClick={() => this.eliminarTare(text)}>
            {" "}
            Delete
          </Button>
          <Button onClick={() => this.editTask(text)}>Edit</Button>
        </span>
      )
    }
  ];
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: "0"
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }
  location = {
    current: "mail"
  };

  addTask = () => {
    if (this.state.title === "" || this.state.description === "") {
      message.success("inserte contenido");
    } else {
      console.log(this.state);
      axios
        .post("http://localhost:3000/api/task", {
          body: this.state,
          Headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          this.componentDidMount();
        });
      this.setState({ title: "", description: "", _id: "0" });
    }
  };
  componentDidMount() {
    axios.get("http://localhost:3000/api/task").then(res => {
      this.setState({ data: res.data });
      console.log(this.state.data);
      this.setState({ tasks: res.data });
      console.log(this.state.tasks);
    });
  }

  handleChange(value, e) {
    const { name } = e.target;
    this.setState({
      [name]: value
    });
  }

  eliminarTare = id => {
    const { confirm } = Modal;
    const self = this;
    confirm({
      title: "Do you Want to delete these items?",
      onOk() {
        axios
          .delete(`/api/task/${id}`, {
            body: self.state,
            Headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            const data = res.data;
            message.success("Se elimino correctamente");
            self.setState({
              tasks: self.state.tasks.filter(item => item._id !== id)
            });
          });
        return false;
      },
      onCancel() {
        console.log("Non deleted");
      }
    });
  };

  editTask(id) {
    this.setState(
      {
        title: this.state.tasks.filter(objeto => objeto._id == id)[0].title,
        description: this.state.tasks.filter(objeto => objeto._id == id)[0]
          .description,
        _id: id
      },
      () => {
        console.log(this.state);
      }
    );
    console.log(this.state.tasks.filter(objeto => objeto._id == id)[0]);
  }

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Form onSubmit={this.addTask}>
              <FormGroup>
                <FormControl
                  onChange={this.handleChange}
                  CustomInput
                  size="lg"
                  placeholder="title task"
                  name="title"
                  value={this.state.title}
                />
              </FormGroup>

              <FormGroup>
                <FormControl
                  onChange={this.handleChange}
                  CustomInput
                  size="lg"
                  placeholder="description"
                  rows={5}
                  name="description"
                  componentClass="textarea"
                  value={this.state.description}
                />
              </FormGroup>

              <FormGroup>
                <ButtonToolbar>
                  <Button onClick={this.addTask} appearance="primary">
                    Send
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Col>
          <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Table
              rowSelection={rowSelection}
              columns={this.columns}
              dataSource={this.state.tasks}
            />
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            Col
          </Col>
        </Row>
        ,
      </div>
    );
  }
}

export default Task;
