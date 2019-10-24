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
            return (
                <table className="table table-hover table-bordered">
                    <thead>
                        {step.headers.map(header => {
                            return (
                                <tr>
                                    {header.cells.map(cell => {
                                        return (<td colSpan={cell.col_span} rowSpan={cell.row_span}>{cell.content}</td>);
                                    })}
                                </tr>);
                        })}
                    </thead>
                    <tbody>
                        {step.rows.map(row => {
                            return (
                                <tr>
                                    {row.cells.map((cell, cellIndex) => {
                                        return (<td colSpan={cell.col_span} rowSpan={cell.row_span}>{cell.content}</td>);
                                    })}
                                </tr>);
                        })}
                    </tbody>
                </table>
            );
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