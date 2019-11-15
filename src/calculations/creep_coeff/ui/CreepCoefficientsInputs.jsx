import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "reactcomponents/controls/TextInput";
import SelectListInput from "reactcomponents/controls/SelectListInput";

class CreepCoefficientsInputs extends Component {
    constructor({ data, onCalculate }) {
        super();
        this.state = data;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCalculate = onCalculate;
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.onCalculate(this.state);
    }

    render() {
        return (
            <form id="inputs-form" onSubmit={this.handleSubmit}>
                <SelectListInput text="Element type" label="Element type" id="elementtype" value={this.state.elementtype} options={this.state.element_types} handleChange={this.handleChange} />
                <TextInput text="Width" label="Width" type="number" id="width" value={this.state.width} handleChange={this.handleChange} />
                <TextInput text="Depth" label="Depth" type="number" id="depth" value={this.state.depth} handleChange={this.handleChange} />
                <TextInput text="Rh" label="Rh" type="number" id="rh" value={this.state.rh} handleChange={this.handleChange} />
                <TextInput text="Fck" label="Fck" type="number" id="fck" value={this.state.fck} handleChange={this.handleChange} />
                <TextInput text="T" label="T" type="number" id="t" value={this.state.t} handleChange={this.handleChange} />
                <TextInput text="T0" label="T0" type="number" id="t0" value={this.state.t0} handleChange={this.handleChange} />
                <TextInput text="Temperature" label="Temperature" type="number" id="temperature" value={this.state.temperature} handleChange={this.handleChange} />
                <button type="submit" class="btn btn-primary">Calculate</button>
            </form>
        );
    }
}
CreepCoefficientsInputs.propTypes = {
    data: PropTypes.any.isRequired,
    reportGenerated: PropTypes.func.isRequired
};
export default CreepCoefficientsInputs;