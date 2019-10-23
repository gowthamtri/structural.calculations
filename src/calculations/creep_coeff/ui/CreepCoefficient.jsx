import React, { Component } from "react";
import ReactDOM from "react-dom";
import CreepCoefficientsInputs from './CreepCoefficientsInputs.jsx';
import Report from '../../../components/report/Report.jsx';

class CreepCoefficient extends Component {
    constructor(data) {
        super();
        this.data = JSON.parse(data.inputs);
        this.state = {
            report: {
                "header": "Please run the calculation"
            }
        };
        console.log("Main State");
        console.log(this.state);
        this.reportGenerated = this.reportGenerated.bind(this);
    }

    reportGenerated(report) {
        this.setState({ report: JSON.parse(report) });
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            Inputs
                        </div>
                        <div className="card-body overflow-auto">
                            <CreepCoefficientsInputs data={this.data} reportGenerated={this.reportGenerated} />
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            Calculation Report
                        </div>
                        <div className="card-body overflow-auto">
                            <Report report={this.state.report} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<CreepCoefficient {...(wrapper.dataset)} />, wrapper) : false;