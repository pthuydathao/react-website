const GenderInput = (payload) => {
  return (
    <div className="form-input">
      <label htmlFor="gender">
        {payload.label} <span className="required-field-indicator">*</span>
      </label>
      <select id={payload.id} name={payload.id} required>
        <option value="" disabled selected>
          Select your gender
        </option>
        <option key="male" value="Male">
          Male
        </option>
        <option key="female" value="Female">
          Female
        </option>
        <option key="other" value="Other">
          Other
        </option>
      </select>
    </div>
  );
};

export default GenderInput;
