System.register(["react", "../hardware/HardwareSimulator"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React, HardwareSimulator_1;
    var HardwareDebugger;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (HardwareSimulator_1_1) {
                HardwareSimulator_1 = HardwareSimulator_1_1;
            }],
        execute: function() {
            HardwareDebugger = (function (_super) {
                __extends(HardwareDebugger, _super);
                function HardwareDebugger() {
                    _super.apply(this, arguments);
                }
                HardwareDebugger.prototype.render = function () {
                    var chip = this.props.chip;
                    return React.createElement("div", null, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs"}, 
                                React.createElement("div", {className: "btn-toolbar", role: "toolbar"}, 
                                    React.createElement("div", {className: "btn-group", role: "group"}, 
                                        React.createElement("button", {type: "button", className: "btn btn-md btn-outline-primary"}, 
                                            React.createElement("i", {className: "fa fa-step-forward"})
                                        ), 
                                        React.createElement("button", {type: "button", className: "btn btn-md btn-outline-primary"}, 
                                            React.createElement("i", {className: "fa fa-forward"})
                                        ), 
                                        React.createElement("button", {type: "button", className: "btn btn-md btn-outline-primary"}, 
                                            React.createElement("i", {className: "fa fa-pause"})
                                        ), 
                                        React.createElement("button", {type: "button", className: "btn btn-md btn-outline-primary"}, 
                                            React.createElement("i", {className: "fa fa-stop"})
                                        ))
                                )
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs"}, 
                                React.createElement("table", {className: "table table-sm"}, 
                                    React.createElement("caption", null, "Pins"), 
                                    React.createElement("thead", null, 
                                        React.createElement("tr", null, 
                                            React.createElement("th", null), 
                                            React.createElement("th", null, "Pin"), 
                                            React.createElement("th", null, "Decimal"), 
                                            React.createElement("th", null, "Binary"))
                                    ), 
                                    React.createElement("tbody", null, this.props.chip.pins
                                        .sort(function (a, b) { return a.type - b.type; })
                                        .map(function (pin) {
                                        var icon;
                                        switch (pin.type) {
                                            case HardwareSimulator_1.PinType.Input:
                                                icon = React.createElement("i", {className: "fa fa-long-arrow-right"});
                                                break;
                                            case HardwareSimulator_1.PinType.Output:
                                                icon = React.createElement("i", {className: "fa fa-long-arrow-left"});
                                                break;
                                            default:
                                                icon = "";
                                                break;
                                        }
                                        return React.createElement("tr", {key: pin.name}, 
                                            React.createElement("td", null, icon), 
                                            React.createElement("td", null, pin.name), 
                                            React.createElement("td", null), 
                                            React.createElement("td", null));
                                    })))
                            ), 
                            React.createElement("div", {className: "col-xs"}, 
                                React.createElement("table", {className: "table table-sm table-reflow"}, 
                                    React.createElement("thead", null, 
                                        React.createElement("tr", null, 
                                            React.createElement("th", null, "Name"), 
                                            React.createElement("th", null, "Time"))
                                    ), 
                                    React.createElement("tbody", null, 
                                        React.createElement("tr", null, 
                                            React.createElement("td", null, this.props.chip.name), 
                                            React.createElement("td", null, "123"))
                                    ))
                            )), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs"}, 
                                React.createElement("table", {className: "table table-sm"}, 
                                    React.createElement("caption", null, "Output"), 
                                    React.createElement("thead", null, 
                                        React.createElement("tr", null, 
                                            React.createElement("th", null, "time"), 
                                            React.createElement("th", null, "A"), 
                                            React.createElement("th", null, "B"), 
                                            React.createElement("th", null, "out"))
                                    ), 
                                    React.createElement("tbody", null, 
                                        React.createElement("tr", null, 
                                            React.createElement("td", null, "0"), 
                                            React.createElement("td", null, "1"), 
                                            React.createElement("td", null, "1"), 
                                            React.createElement("td", null, "1"))
                                    ))
                            )
                        ));
                };
                return HardwareDebugger;
            }(React.Component));
            exports_1("default", HardwareDebugger);
        }
    }
});
//# sourceMappingURL=HardwareDebugger.js.map