
import Parser from "./Parser";
import SourceFile from "../workspace/SourceFile";
import Binder from "./Binder";
import {ChipDeclarationSyntax} from "./SyntaxNodes";
import {DocumentSpan} from "../workspace/SourceFile";

export default class Compiler {

    constructor(private sources: SourceFile[]) {

    }

    public compile() {
        let nodes = [];
        for (let source of this.sources) {
            if (source.extensions == "hdl") {
                let parser = new Parser(source);
                let syntax = parser.parse();
                source.syntax = syntax;
                nodes.push(syntax);
            }
        }
        let binder = new Binder(nodes);
        binder.bind();

        for (let source of this.sources) {
            source.spans = [];
            {
                let identifier = (<ChipDeclarationSyntax>source.syntax).name;
                source.spans.push(new DocumentSpan(identifier.position, identifier.end, "blue"));
            }
        }
    }
}