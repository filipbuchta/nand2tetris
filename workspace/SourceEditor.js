System.register(["react", "./../hdl/Compiler", "./AceModeHdl", "./AceEditor"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React, Compiler_1, AceEditor_1;
    var SourceEditor;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (Compiler_1_1) {
                Compiler_1 = Compiler_1_1;
            },
            function (_1) {},
            function (AceEditor_1_1) {
                AceEditor_1 = AceEditor_1_1;
            }],
        execute: function() {
            SourceEditor = (function (_super) {
                __extends(SourceEditor, _super);
                function SourceEditor(props) {
                    _super.call(this, props);
                    this.state = {
                        content: this.props.sourceFile.content
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
                    new Compiler_1["default"](Workspace.current.sourceFiles).compile();
                    console.log(this.props.sourceFile.spans);
                };
                SourceEditor.prototype.handleSelect = function (event) {
                    this.setState({
                        selectionStart: event.target.selectionStart
                    });
                };
                SourceEditor.prototype.render = function () {
                    return React.createElement("div", {style: { position: "relative", width: "100%", height: "300" }}, 
                        React.createElement(AceEditor_1["default"], {enableLiveAutocompletion: true, enableBasicAutocompletion: true, mode: "hdl", theme: "textmate", value: this.props.sourceFile.content})
                    );
                };
                return SourceEditor;
            }(React.Component));
            exports_1("default", SourceEditor);
        }
    }
});
//# sourceMappingURL=SourceEditor.js.map