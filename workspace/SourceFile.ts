
import {SyntaxNode} from "../hdl/SyntaxNodes";

export class DocumentSpan {
    constructor(public position: number, public end: number, public color: string) { //TODO: add reference

    }
}

export default class SourceFile {

    public syntax: SyntaxNode;
    public spans: DocumentSpan[];

    public get extensions(): string {
        return this.filename.substring(this.filename.lastIndexOf(".")+1);
    }

    constructor(public filename: string, public content: string) {

    }
}