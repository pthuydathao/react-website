import React, { useState } from "react";
import FormInput from "../../components/forms/FormInput";

import "./Authenticate.css";

const Authenticate = () => {
  const [authenticateRequestError, setAuthenticateRequestError] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [authenticateForm, setAuthenticateForm] = useState({
    email: "",
    password: "",
  });

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
              label="Email"
              type="email"
              placeholder="Enter email"
              onChange={updateAuthenticateForm}
              isRequired={true}
              errorMessage={fieldError.email}
            />
            <FormInput
              id="password"
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
