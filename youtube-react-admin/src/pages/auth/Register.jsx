import { useState } from "react";
import axios from "axios";
import "./Authenticate.css";
import FormInput from "../../components/forms/FormInput";
import GenderInput from "../../components/forms/GenderInput";
import { formatInTimeZone } from "date-fns-tz";

const FormatUTCDate = (date) => {
  return formatInTimeZone(date, "UTC", "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX");
};

const RegisterForm = () => {
  const [authenticateRequestError, setAuthenticateRequestError] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    gender: "MALE", // Set an initial value for gender
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

  const sendRegisterRequest = async (event) => {
    event.preventDefault();
    const URL = `${process.env.REACT_APP_API_URL}/auth/register`;
    console.log("payload:", registerForm);
    const response = await axios.post(URL, registerForm);
    console.log("response:", response);
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
              name="firstName"
              label="First name"
              type="text"
              placeholder="First name"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="last-name"
              name="lastName"
              label="Last name"
              type="text"
              placeholder="Last name"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="citizen-id"
              name="citizenId"
              label="Citizen ID"
              type="number"
              placeholder="Citizen ID"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="dob"
              name="dateOfBirth"
              label="Date of birth"
              type="date"
              placeholder="Date of birth"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <div className="form-input">
              <label htmlFor="gender">
                Gender
                <span className="required-field-indicator">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={registerForm.gender}
                onChange={updateRegisterForm}
              >
                <option key="male" value="MALE">
                  MALE
                </option>
                <option key="female" value="FEMALE">
                  FEMALE
                </option>
                <option key="other" value="OTHER">
                  OTHER
                </option>
              </select>
            </div>
            <FormInput
              id="phone"
              name="phone"
              label="Phone"
              type="tel"
              placeholder="Phone number"
              onChange={updateRegisterForm}
              isRequired={true}
            />
            <FormInput
              id="address"
              name="address"
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
