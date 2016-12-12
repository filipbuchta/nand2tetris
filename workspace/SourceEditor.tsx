import * as React from "react";

import SourceFile from "./SourceFile";
import Compiler from "./../hdl/Compiler";

import ace from "ace";
import "./AceModeHdl";
import AceEditor from "./AceEditor";


export default class SourceEditor extends React.Component<{ sourceFile: SourceFile}, any> {

    private editor: ace.Editor;

    constructor(props) {
        super(props);

        this.state = {
            content: this.props.sourceFile.content,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }


    componentDidMount() {
        // let session: ace.IEditSession = this.editor.session;

        // session.setAnnotations([
        //     {row: 1, column: 1, text: "test", type: "error"}
        // ]);
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });

        this.props.sourceFile.content = event.target.value;
        new Compiler(Workspace.current.sourceFiles).compile();
        console.log(this.props.sourceFile.spans);

    }

    handleSelect(event) {
        this.setState({
            selectionStart: event.target.selectionStart
        });
    }

    render() {
        return <div style={{position: "relative", width: "100%", height: "300"}}>
            <AceEditor enableLiveAutocompletion={true} enableBasicAutocompletion={true} mode="hdl" theme="textmate" value={this.props.sourceFile.content}></AceEditor>
        </div>
    }
}

