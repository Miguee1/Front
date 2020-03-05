import React from "react";
import auth from "./auth";
import "rsuite/dist/styles/rsuite-default.css";
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  HelpBlock
} from "rsuite";

export const LandingPage = props => {
  return (
    <div>
      <Form layout="inline">
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl name="username" style={{ width: 160 }} />
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl name="password" type="password" style={{ width: 160 }} />
        </FormGroup>

        <Button
          onClick={() => {
            auth.login(() => {
              props.history.push("/app");
            });
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};
