import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import Report from 'reactcomponents/report/Report';

import CreepCoefficientsInputs from './CreepCoefficientsInputs';
import CreepModel from './model3d/CreepModel.jsx';

class CreepCoefficient extends Component {
    constructor(data) {
        super();
        this.state = {
            data: JSON.parse(data.inputs),
            report: {
                "header": "Please run the calculation"
            },
            showModel: true,
            showReport: false,
        };
        this.onCalculate = this.onCalculate.bind(this);
        this.onModelClick = this.onModelClick.bind(this);
        this.onReportClick = this.onReportClick.bind(this);
    }

    onCalculate(data) {
        axios.post(
            '/creepcoeff', data, { headers: { 'Content-Type': 'application/json' } }
        ).then(response => {
            this.setState({ report: JSON.parse(response.data) });
            this.setState({ isLoaded: true });
        }).catch(error => {
            this.setState({ isLoaded: true });
            console.log(error);
        });
    }

    onReportClick(event) {
        this.setState({ showReport: true, showModel: false });
    }

    onModelClick(event) {
        this.setState({ showModel: true, showReport: false });
    }

    render() {
        let content;
        if (this.state.showReport) {
            content = <div className="card">
                <div className="card-header">
                    Calculation Report
                </div>
                <div className="card-body overflow-auto">
                    <Report report={this.state.report} />
                </div>
            </div>
        } else if (this.state.showModel) {
            content = <div className="col-12 fill">
                <CreepModel />
            </div>
        }

        return (
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            Inputs
                        </div>
                        <div className="card-body overflow-auto">
                            <CreepCoefficientsInputs data={this.state.data} onCalculate={this.onCalculate} />
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="row">
                        <button onClick={this.onModelClick} className={this.state.showModel ? 'btn btn-primary' : 'btn btn-light'}>Model</button>
                        <button onClick={this.onReportClick} className={this.state.showReport ? 'btn btn-primary' : 'btn btn-light'}>Report</button>
                    </div>
                    {content}
                </div>
            </div>
        );
    }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<CreepCoefficient {...(wrapper.dataset)} />, wrapper) : false;
