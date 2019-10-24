import React, { Component } from "react";
import Step from './Step.jsx';

class Section extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="report-section-div">
                <p>{this.props.section.header}</p>
                {this.props.section.steps.map(step => {
                    return (<Step step={step} />)
                })}
            </div>
        );
    }
}
export default Section;