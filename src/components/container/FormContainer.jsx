import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";

class FormContainer extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
    }
    render() {
        return (
            <form id="article-form">
                <Input
                    text="SEO title"
                    label="seo_title"
                    type="text"
                    id="seo_title"
                    value="12"
                    handleChange={this.handleChange}
                />
            </form>
        );
    }
}
export default FormContainer;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;