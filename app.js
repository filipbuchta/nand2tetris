System.register(["./workspace/Workspace", "react", "react-dom", "./workspace/AceModeHdl", "./workspace/HardwareDebugger", "./workspace/ProjectExplorer", "./workspace/SourceEditor"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Workspace_1, React, ReactDOM, HardwareDebugger_1, ProjectExplorer_1, SourceEditor_1;
    var App;
    return {
        setters:[
            function (Workspace_1_1) {
                Workspace_1 = Workspace_1_1;
            },
            function (React_1) {
                React = React_1;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (_1) {},
            function (HardwareDebugger_1_1) {
                HardwareDebugger_1 = HardwareDebugger_1_1;
            },
            function (ProjectExplorer_1_1) {
                ProjectExplorer_1 = ProjectExplorer_1_1;
            },
            function (SourceEditor_1_1) {
                SourceEditor_1 = SourceEditor_1_1;
            }],
        execute: function() {
            App = (function (_super) {
                __extends(App, _super);
                function App() {
                    var _this = this;
                    _super.call(this);
                    console.log("app logged1");
                    this.onOpenSourceFile = this.onOpenSourceFile.bind(this);
                    this.state = {
                        workspace: {
                            sourceFiles: []
                        },
                        sourceFile: null,
                        chip: null
                    };
                    Workspace_1["default"].load().then(function (workspace) {
                        _this.setState({
                            workspace: workspace,
                            sourceFile: Workspace_1["default"].current.document,
                            chip: Workspace_1["default"].current.chip
                        });
                        console.log("Workspace loaded");
                    });
                }
                App.prototype.onOpenSourceFile = function (sourceFile) {
                    Workspace_1["default"].current.document = sourceFile;
                    this.setState({
                        sourceFile: Workspace_1["default"].current.document
                    });
                };
                App.prototype.render = function () {
                    return React.createElement("div", null, 
                        React.createElement("nav", {className: "navbar navbar-fixed-top navbar-dark bg-inverse"}, 
                            React.createElement("a", {className: "navbar-brand", href: "#"}, "nand on steroids"), 
                            React.createElement("ul", {className: "nav navbar-nav float-xs-right"}, 
                                React.createElement("li", {className: "nav-item active"}, 
                                    React.createElement("a", {className: "nav-link", href: "#"}, 
                                        "Workspace ", 
                                        React.createElement("span", {className: "sr-only"}, "(current)"))
                                ), 
                                React.createElement("li", {className: "nav-item"}, 
                                    React.createElement("a", {className: "nav-link", href: "#"}, "Courses")
                                ))), 
                        React.createElement("div", {className: "container-fluid"}, 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: "col-xs-1"}, 
                                    React.createElement(ProjectExplorer_1["default"], {sourceFiles: this.state.workspace.sourceFiles, onOpenSourceFile: this.onOpenSourceFile})
                                ), 
                                React.createElement("div", {className: "col-xs-5"}, this.state.sourceFile != null ? React.createElement(SourceEditor_1["default"], {sourceFile: this.state.sourceFile}) : ""), 
                                React.createElement("div", {className: "col-xs-6"}, this.state.chip != null ? React.createElement(HardwareDebugger_1["default"], {chip: this.state.chip}) : ""))
                        ));
                };
                return App;
            }(React.Component));
            exports_1("default", App);
            ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
        }
    }
});
//# sourceMappingURL=app.js.map