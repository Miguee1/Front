import React from "react";
import auth from "./auth";
import { withRouter } from "react-router-dom";
import { Form as FORM, Input, Button as BUTTON, Checkbox } from "antd";
import { UserOutlined, LockOutline } from "@ant-design/icons";

export const AppLayout = props => {
  return (
    <div>
      <h1>App Layout</h1>>
      <FORM>
        <FORM.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </FORM.Item>
        <FORM.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input type="password" placeholder="Password" />
        </FORM.Item>
        <FORM.Item>
          <FORM.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </FORM.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </FORM.Item>

        <FORM.Item>
          <BUTTON
            onClick={() => {
              auth.logout(() => {
                props.history.push("/");
              });
            }}
          >
            Log in
          </BUTTON>
          Or <a href="">register now!</a>
        </FORM.Item>
      </FORM>
    </div>
  );
};
