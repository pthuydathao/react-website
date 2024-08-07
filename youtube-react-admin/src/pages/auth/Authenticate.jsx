import React, { useState } from "react";
import FormInput from "../../components/forms/FormInput";
import { useHistory } from "react-router-dom";
import { useAuth } from "./AuthContext";

import "./Authenticate.css";
import axios from "axios";

const Authenticate = () => {
  const [authenticateRequestError, setAuthenticateRequestError] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [authenticateForm, setAuthenticateForm] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const { login } = useAuth();

  const updateAuthenticateForm = (event) => {
    setAuthenticateForm({
      ...authenticateForm,
      [event.target.name]: event.target.value,
    });
    setFieldError({ ...fieldError, [event.target.name]: "" });
    setAuthenticateRequestError("");
  };

  const sendAuthenticateRequest = async (event) => {
    event.preventDefault();
    const URL = `${process.env.REACT_APP_API_URL}/auth/authenticate`;
    try {
      const response = await axios.post(URL, authenticateForm);
      const token = response.data.data.token;
      sessionStorage.setItem("token", token);
      login(token);
      history.push("/");
    } catch (error) {
      setAuthenticateRequestError(
        error.response?.data?.message ||
          "Login failed! Invalid email or password"
      );
    }
  };

  return (
    <div className="outer-container">
      <div className="form-container authenticate-form">
        <div className="form-header">
          <h2>Login</h2>
        </div>
        <form
          className="form-body authenticate-form"
          onSubmit={sendAuthenticateRequest}
        >
          <div className="form-fields-container">
            <FormInput
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter email"
              onChange={updateAuthenticateForm}
              isRequired={true}
              errorMessage={fieldError.email}
            />
            <FormInput
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              onChange={updateAuthenticateForm}
              isRequired={true}
              errorMessage={fieldError.password}
            />
          </div>
          <div className="form-submit">
            <button className="submit-button" type="submit">
              Login
            </button>
            {authenticateRequestError && (
              <p className="authenticate-request-error">
                {authenticateRequestError}
              </p>
            )}
          </div>
        </form>
        <div className="form-footer">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
