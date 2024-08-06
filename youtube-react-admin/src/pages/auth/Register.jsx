import { useState } from "react";

import "./Authenticate.css";
import FormInput from "../../components/forms/FormInput";
import GenderInput from "../../components/forms/GenderInput";

const RegisterForm = () => {
  const [authenticateRequestError, setAuthenticateRequestError] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: new Date(),
    gender: "",
    phone: "",
    address: "",
  });

  const updateRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
    setFieldError({ ...fieldError, [event.target.name]: "" });
    setAuthenticateRequestError("");
  };

  const sendRegisterRequest = async () => {
    return;
  };

  return (
    <div className="outer-container">
      <div className="form-container">
        <div className="form-header">
          <h2>Register</h2>
        </div>
        <form
          className="form-body register-form"
          onSubmit={sendRegisterRequest}
        >
          <div className="form-fields-container">
            <FormInput
              id="first-name"
              label="First name"
              type="text"
              placeholder="First name"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="last-name"
              label="Last name"
              type="text"
              placeholder="Last name"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="Email"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="dob"
              label="Date of birth"
              type="date"
              placeholder="Date of birth"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <GenderInput id="gender" label="Gender" />
            <FormInput
              id="phone"
              label="Phone"
              type="tel"
              placeholder="Phone number"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="address"
              label="Address"
              type="text"
              placeholder="Address"
              onChange={updateRegisterForm}
            />
          </div>
          <div className="form-submit">
            <button className="submit-button" type="submit">
              Register
            </button>
            {authenticateRequestError && (
              <p className="authenticate-request-error">
                {authenticateRequestError}
              </p>
            )}
          </div>
        </form>
        <div className="form-footer">
          Have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
