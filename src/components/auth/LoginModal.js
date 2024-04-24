import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";

import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const LoginModal = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    msg: null,
  });
  const error = useSelector((state) => state.error);

  useEffect(() => {
    // Check for login error
    if (error.id === "LOGIN_FAIL") {
      setFormData({ ...formData, msg: error.msg.msg });
    } else {
      setFormData({ ...formData, msg: null });
    }
  }, [error]);

  const { email, password, msg } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    // Attempt to login
    login(user);
  };

  return (
    <React.Fragment>
      <h1 className="mb-5">Welcome to Pleadis</h1>
      <div className="login-logout-form">
        <h2 className="m-4 login-label">
          <FontAwesomeIcon
            icon={["fas", "user"]}
            size="2x"
            color="rgb(0,128,255)"
            className="user-icon"
          />
          Sign In
        </h2>
        {msg ? <Alert color="danger">{msg}</Alert> : null}
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="mb-3"
              onChange={onChange}
            />

            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="mb-3"
              onChange={onChange}
            />
            <Button
              type="submit"
              color="dark"
              style={{ marginTop: "2rem" }}
              block
              className="login-button"
            >
              Login
            </Button>
            <Link to="/register" className="mt-3 link-register">
              Don't have an account yet?
            </Link>
          </FormGroup>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default LoginModal;
