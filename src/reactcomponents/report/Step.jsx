import React, { Component } from "react";
import MathJax from 'react-mathjax2';

import Table from './Table';

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
                        <span className="message">{step.description}, </span>
                        <span className="message"><MathJax.Node inline>{step.symbol}</MathJax.Node> = </span>
                        <span className="message"><MathJax.Node inline>{step.expression}</MathJax.Node> = </span>
                        <span className="message">{step.value} {step.unit} </span>
                    </div>
                </MathJax.Context>
            );
        } else if (step.symbol) {
            return (
                <MathJax.Context input='tex'>
                    <div>
                        <span className="message">{step.description}, </span>
                        <span className="message"><MathJax.Node inline>{step.symbol}</MathJax.Node> = </span>
                        <span className="message">{step.value} {step.unit} </span>
                    </div>
                </MathJax.Context>
            );
        } else if (step.headers) {
            return (<Table step={step} />);
        } else {
            return (
                <div>
                    <span className="message">{step.text}</span>
                </div>
            );
        }
    }
}
export default Step;