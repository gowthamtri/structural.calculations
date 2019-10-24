import React from "react";
import PropTypes from "prop-types";
const SelectListInput = ({ label, text, id, value, options, handleChange }) => (
    <div className="form-group">
        <label htmlFor={label}>{text}</label>
        <select className="form-control" id={id} name={id} value={value} name={id} onChange={handleChange}>
            {options.map(item => {
                return <option value={item.value}>{item.description}</option>
            })}
        </select>
    </div>
);
SelectListInput.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
};
export default SelectListInput;