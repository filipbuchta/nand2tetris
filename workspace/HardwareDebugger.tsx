import * as React from "react";
import {Chip, PinType} from "../hardware/HardwareSimulator";

export default class HardwareDebugger extends React.Component<{ chip: Chip }, any> {


    render() {
        let chip = this.props.chip;

        return <div>
            <div className="row">
                <div className="col-xs">
                    <div className="btn-toolbar" role="toolbar">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-md btn-outline-primary"><i
                                className="fa fa-step-forward"/></button>
                            <button type="button" className="btn btn-md btn-outline-primary"><i
                                className="fa fa-forward"/></button>
                            <button type="button" className="btn btn-md btn-outline-primary"><i
                                className="fa fa-pause"/></button>
                            <button type="button" className="btn btn-md btn-outline-primary"><i className="fa fa-stop"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs">
                    <table className="table table-sm">
                        <caption>Pins</caption>
                        <thead>
                        <tr>
                            <th />
                            <th>Pin</th>
                            <th>Decimal</th>
                            <th>Binary</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.chip.pins
                                .sort((a, b) => a.type - b.type)
                                .map((pin) => {
                                    let icon;
                                    switch (pin.type) {
                                        case PinType.Input: icon = <i className="fa fa-long-arrow-right"/>; break;
                                        case PinType.Output: icon = <i className="fa fa-long-arrow-left"/>; break;
                                        default: icon = ""; break;
                                    }
                                    return <tr key={pin.name}>
                                        <td>{icon}</td>
                                        <td>{pin.name}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                })
                        }
                        </tbody>

                    </table>
                </div>
                <div className="col-xs">
                    <table className="table table-sm table-reflow">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.props.chip.name}</td>
                            <td>123</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-xs">
                    <table className="table table-sm">
                        <caption>Output</caption>
                        <thead>
                        <tr>
                            <th>time</th>
                            <th>A</th>
                            <th>B</th>
                            <th>out</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>0</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    }
}