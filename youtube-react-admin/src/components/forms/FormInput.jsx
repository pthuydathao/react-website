import "./FormInput.css";

const FormInput = (payload) => {
  return (
    <div className="form-input">
      <label htmlFor={payload.id}>
        {payload.label}{" "}
        {payload.isRequired && (
          <span className="required-field-indicator">*</span>
        )}
      </label>
      <input
        id={payload.id}
        name={payload.name}
        type={payload.type}
        placeholder={payload.placeholder}
        onChange={payload.onChange}
      />
      {payload.errorMessage && (
        <p className="error-message">{payload.errorMessage}</p>
      )}
    </div>
  );
};

export default FormInput;
