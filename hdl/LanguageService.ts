import SourceFile from "../workspace/SourceFile";
import {SyntaxNode, ChipDeclarationSyntax} from "./SyntaxNodes";
import SyntaxKind from "./SyntaxKind";

export default class LanguageService {


    walk(node: SyntaxNode, pre: (node, context) => void, post: (node, context) => void, context: any) {
        if (pre != null) {
            pre(node, context);
        }
        if (node instanceof ChipDeclarationSyntax) {
           this.walk(node.name, pre, post, context);
        }
        if (post != null) {
            post(node, context);
        }
    }

    public getCompletionsAtPosition(document: SourceFile, pos: number, prefix: string) {
        let context = {
            node: null,
        };

        let pre = (node: SyntaxNode, context) => {
            if (pos < node.position || pos > node.end)
                return;

            if (node instanceof ChipDeclarationSyntax) {
                context.node = node;
            }
        };


        this.walk(document.syntax, pre, null, context);
        if (context.node == null) {
            return [
                {name: "CHIP", value: "CHIP", score: 100, meta: "keyword"}
            ];
        } else if (context.node instanceof ChipDeclarationSyntax) {
            return [
                {name: "IN", value: "IN", score: 100, meta: "keyword"},
                {name: "OUT", value: "OUT", score: 100, meta: "keyword"},
                {name: "PARTS", value: "PARTS", score: 100, meta: "keyword"}
            ];
        }
    }
}