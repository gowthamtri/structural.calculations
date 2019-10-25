import React, { Component } from "react";
import MathJax from 'react-mathjax2';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let step = this.props.step;
        return (
            <table className="table table-hover table-bordered">
                    <thead>
                        {step.headers.map(header => {
                            return (
                                <tr>
                                    {header.cells.map(cell => {
                                        if (cell.style == 'latex') {
                                            return (<td colSpan={cell.col_span} rowSpan={cell.row_span}>
                                                <MathJax.Context input='tex'>
                                                    <MathJax.Node inline>{cell.content}</MathJax.Node>
                                                </MathJax.Context>
                                            </td>);
                                        } else {
                                            return (<td colSpan={cell.col_span} rowSpan={cell.row_span}>
                                                {cell.content}
                                            </td>);
                                        }
                                    })}
                                </tr>);
                        })}
                    </thead>
                    <tbody>
                        {step.rows.map(row => {
                            return (
                                <tr>
                                    {row.cells.map((cell) => {
                                        if (cell.style == 'latex') {
                                            return (<td colSpan={cell.col_span} rowSpan={cell.row_span}>
                                                <MathJax.Context input='tex'>
                                                    <MathJax.Node inline>{cell.content}</MathJax.Node>
                                                </MathJax.Context>
                                            </td>);
                                        } else {
                                            return (<td colSpan={cell.col_span} rowSpan={cell.row_span}>
                                                {cell.content}
                                            </td>);
                                        }
                                    })}
                                </tr>);
                        })}
                    </tbody>
                </table>
        );
    }
}
export default Table;