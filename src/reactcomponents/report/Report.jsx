import React, { Component } from "react";
import Section from './Section';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: props.report
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ report: props.report });
        console.log(`Received new report with header ${this.state.report.header}`);
        console.log(this.state.report);
    }

    render() {
        let hasSections = this.state && this.state.report && this.state.report.sections && this.state.report.sections.length > 0;
        if (hasSections) {
            let report = this.state.report;
            return (
                <div>
                    <h4>{report.header}</h4>
                    {report.sections.map(sec => {
                        if (sec.sections) {
                            return (<div className="row">
                                {sec.sections.map(subs => {
                                    return (<div className="col">
                                        <Section section={subs} />
                                    </div>);
                                })}
                            </div>);
                        } else {
                            return (<Section section={sec} />);
                        }
                    })}
                </div>
            );
        } else {
            return (
                <div>
                    <p>No Report</p>
                </div>
            );
        }
    }
}
export default Report;