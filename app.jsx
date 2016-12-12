"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Workspace_1 = require("./workspace/Workspace");
var React = require("react");
var ReactDOM = require("react-dom");
var Compiler_1 = require("./hdl/Compiler");
require("./workspace/AceModeHdl");
var AceEditor_1 = require("./workspace/AceEditor");
var SourceEditor = (function (_super) {
    __extends(SourceEditor, _super);
    function SourceEditor(props) {
        _super.call(this, props);
        this.state = {
            content: this.props.sourceFile.content,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    SourceEditor.prototype.componentDidMount = function () {
        // let session: ace.IEditSession = this.editor.session;
        // session.setAnnotations([
        //     {row: 1, column: 1, text: "test", type: "error"}
        // ]);
    };
    SourceEditor.prototype.handleChange = function (event) {
        this.setState({
            content: event.target.value
        });
        this.props.sourceFile.content = event.target.value;
        new Compiler_1.default(Workspace_1.default.current.sources).compile();
        console.log(this.props.sourceFile.spans);
    };
    SourceEditor.prototype.handleSelect = function (event) {
        this.setState({
            selectionStart: event.target.selectionStart
        });
    };
    SourceEditor.prototype.render = function () {
        return <div style={{ position: "relative", width: "100%", height: "300" }}>
           <AceEditor_1.default enableLiveAutocompletion={true} enableBasicAutocompletion={true} mode="hdl" theme="textmate" value={this.props.sourceFile.content}></AceEditor_1.default>
        </div>;
    };
    return SourceEditor;
}(React.Component));
var ProjectExplorer = (function (_super) {
    __extends(ProjectExplorer, _super);
    function ProjectExplorer() {
        _super.apply(this, arguments);
    }
    ProjectExplorer.prototype.render = function () {
        var _this = this;
        return <div>
            {this.props.workspace.sources.map(function (sourceFile) {
            return <div key={sourceFile.filename} onClick={function () { return _this.props.onOpenSourceFile(sourceFile); }}>
                    {sourceFile.filename}
                </div>;
        })}
        </div>;
    };
    return ProjectExplorer;
}(React.Component));
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = this;
        _super.call(this);
        console.log("app logged1");
        this.onOpenSourceFile = this.onOpenSourceFile.bind(this);
        this.state = {
            workspace: {
                sources: []
            },
            sourceFile: null,
        };
        Workspace_1.default.load().then(function (workspace) {
            _this.setState({
                workspace: workspace,
                sourceFile: workspace.sources[0]
            });
            console.log("Workspace loaded");
        });
    }
    App.prototype.onOpenSourceFile = function (sourceFile) {
        console.log("click", sourceFile, this);
        this.setState({
            sourceFile: sourceFile,
        });
    };
    App.prototype.render = function () {
        return <div>
            <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
                <a className="navbar-brand" href="#">Project name</a>
                <ul className="nav navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contact</a>
                    </li>
                </ul>
            </nav>
            <div className="container">
                <br /> <br /> <br />
                <div className="row">
                    <div className="col-xs">
                        <ProjectExplorer workspace={this.state.workspace} onOpenSourceFile={this.onOpenSourceFile}/>
                    </div>
                    <div className="col-xs">
                        {this.state.sourceFile != null ? <SourceEditor sourceFile={this.state.sourceFile}/> : ""}
                    </div>
                </div>

            </div>
        </div>;
    };
    return App;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
ReactDOM.render(<App />, document.getElementById('root'));
