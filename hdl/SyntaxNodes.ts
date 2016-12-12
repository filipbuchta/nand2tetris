
import SyntaxKind from "./SyntaxKind";

export class SyntaxNode {
    public position: number;
    public end: number;
}

export class IdentifierSyntax extends SyntaxNode {
    public value: string;
}

export class NumericLiteralSyntax extends SyntaxNode {
    public value: number;
}

export class ChipDeclarationSyntax extends SyntaxNode {
    name: IdentifierSyntax;
    inputPins: PinDeclarationSynax[];
    outputPins: PinDeclarationSynax[];
    parts: PartSyntax[];

}

export class PinDeclarationSynax extends SyntaxNode {
    name: IdentifierSyntax;
    width: NumericLiteralSyntax;
}


export class PartSyntax extends SyntaxNode {
    public name: IdentifierSyntax;
    connections: ConnectionSyntax[];
    chipDeclaration: ChipDeclarationSyntax;
}

export class PinReferenceSyntax extends SyntaxNode {
    public name: IdentifierSyntax;
    public from: NumericLiteralSyntax;
    public to: NumericLiteralSyntax;
}

export class ConnectionSyntax extends SyntaxNode {
    source: PinReferenceSyntax;
    target: PinReferenceSyntax;
}
