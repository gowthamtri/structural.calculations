import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "./../../../components/Input.jsx";

class Inputs extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            width: 10,
            depth: 20
        };
    }
    render() {
        return (
            <form id="inputs-form" action="/creepcoeff" method="post">
                <Input text="Width" label="width" type="number" id="width" value={ this.state.width } handleChange={this.handleChange} />
                <Input text="Depth" label="depth" type="number" id="depth" value={ this.state.depth } handleChange={this.handleChange} />
            </form>
        );
    }
}
export default Inputs;

const wrapper = document.getElementById("inputs-form");
wrapper ? ReactDOM.render(<Inputs />, wrapper) : false;