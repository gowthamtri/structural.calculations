import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextInput from "./../../../components/TextInput.jsx";
import SelectListInput from "./../../../components/SelectListInput.jsx";

class CreepCoefficientsInputs extends Component {
    constructor(data) {
        super();
        this.state = JSON.parse(data.inputs);
        console.log(this.state);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target);        
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {        
        return (
            <form id="inputs-form" action="/creepcoeff" method="post">
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
export default CreepCoefficientsInputs;

const wrapper = document.getElementById("inputs-form");
wrapper ? ReactDOM.render(<CreepCoefficientsInputs {...(wrapper.dataset)} />, wrapper) : false;