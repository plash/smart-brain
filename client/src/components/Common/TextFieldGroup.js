import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames(
          "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",
          {
            "b--dark-red": error
          }
        )}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && (
        <div className="db fw6 lh-copy f6 mt-2" style={{ color: "#dc3545" }}>
          {error}
        </div>
      )}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
