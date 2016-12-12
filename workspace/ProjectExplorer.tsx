
import * as React from "react";
import SourceFile from "./SourceFile";


export default class ProjectExplorer extends React.Component<{ sourceFiles: SourceFile[]}, any> {
    render() {
        return <div>
            {this.props.sourceFiles.map(sourceFile => {
                return <div key={sourceFile.filename} onClick={() => this.props.onOpenSourceFile(sourceFile)}>
                    {sourceFile.filename}
                </div>
            })}
        </div>
    }
}