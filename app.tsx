import Workspace from "./workspace/Workspace";
import * as React from "react";
import * as ReactDOM from "react-dom";

import SourceFile from "./workspace/SourceFile";

import "./workspace/AceModeHdl";
import HardwareDebugger from "./workspace/HardwareDebugger";
import ProjectExplorer from "./workspace/ProjectExplorer";
import SourceEditor from "./workspace/SourceEditor";


export default class App extends React.Component<any, { workspace: Workspace, sourceFile: SourceFile, chip: Chip}> {


    constructor() {
        super();
        console.log("app logged1");

        this.onOpenSourceFile = this.onOpenSourceFile.bind(this);

        this.state = {
            workspace: {
                sourceFiles: []
            },
            sourceFile: null,
            chip: null,
        };

        Workspace.load().then((workspace) => {
            this.setState({
                workspace: workspace,
                sourceFile: Workspace.current.document,
                chip: Workspace.current.chip
            });
            console.log("Workspace loaded");
        });
    }

    onOpenSourceFile(sourceFile: SourceFile) {
        Workspace.current.document = sourceFile;
        this.setState({
            sourceFile: Workspace.current.document,
        });
    }

    render() {
        return <div>
            <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
                <a className="navbar-brand" href="#">nand on steroids</a>
                <ul className="nav navbar-nav float-xs-right">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Workspace <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Courses</a>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-1">
                        <ProjectExplorer sourceFiles={this.state.workspace.sourceFiles} onOpenSourceFile={this.onOpenSourceFile}/>
                    </div>
                    <div className="col-xs-5">
                        {
                            this.state.sourceFile != null ? <SourceEditor sourceFile={this.state.sourceFile}/> : ""
                        }
                    </div>
                    <div className="col-xs-6">
                        {
                            this.state.chip != null ? <HardwareDebugger chip={this.state.chip}/> : ""
                        }
                    </div>
                </div>

            </div>
        </div>
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
