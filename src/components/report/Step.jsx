import React, { Component } from "react";
import MathJax from 'react-mathjax2'

class Step extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let step = this.props.step
        if (step.expression) {
            return (
                <MathJax.Context input='tex'>
                    <div>
                        <span class="message">{step.description}, </span>
                        <span class="message"><MathJax.Node inline>{step.symbol}</MathJax.Node> = </span>
                        <span class="message"><MathJax.Node inline>{step.expression}</MathJax.Node> = </span>
                        <span class="message">{step.value} {step.unit} </span>
                    </div>
                </MathJax.Context>
            );
        } else if (step.symbol) {
            return (
                <MathJax.Context input='tex'>
                    <div>
                        <span class="message">{step.description}, </span>
                        <span class="message"><MathJax.Node inline>{step.symbol}</MathJax.Node> = </span>
                        <span class="message">{step.value} {step.unit} </span>
                    </div>
                </MathJax.Context>
            );
        } else {
            return (
                <div>
                    <span class="message">{step.text}</span>
                </div>
            );
        }
    }
}
export default Step;