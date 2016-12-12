import Scanner from "./Scanner";
import SyntaxKind from "./SyntaxKind";
import {
    SyntaxNode, NumericLiteralSyntax, ChipDeclarationSyntax, PartSyntax, IdentifierSyntax,
    ConnectionSyntax, PinDeclarationSynax, PinReferenceSyntax
} from "./SyntaxNodes";
import SourceFile from "../workspace/SourceFile";

export default class Parser {
    private source: SourceFile;
    private scanner: Scanner;

    private currentToken: SyntaxKind;

    constructor(source: SourceFile) {
        this.source = source;
        this.scanner = new Scanner(this.source.content);
    }

    private error(reason: string) {
        throw reason;
    }

    private nextToken(): SyntaxKind {
        return this.currentToken = this.scanner.scan();
    }

    private parseExpected(kind: SyntaxKind): boolean {
        if (this.currentToken == kind) {
            this.nextToken();
            return true;
        }

        this.error("Expected: " + SyntaxKind[kind] + " but got " + SyntaxKind[this.currentToken]);
        return false;
    }

    private parseOptional(kind: SyntaxKind): boolean {
        if (this.currentToken == kind) {
            this.nextToken();
            return true;
        }

        return false;
    }


    public parse(): ChipDeclarationSyntax {
        this.nextToken();

        return this.parseChipDeclaration();
    }

    private parseIdentifier(): IdentifierSyntax {

        let tokenValue = this.scanner.tokenValue;
        this.parseExpected(SyntaxKind.Identifier);

        let node = new IdentifierSyntax();
        node.position = this.scanner.startPosition;

        node.value = this.scanner.tokenValue;

        node.end = this.scanner.position;
        return node;
    }

    private parseNumericLiteral(): NumericLiteralSyntax {
        let tokenValue = this.scanner.tokenValue;
        this.parseExpected(SyntaxKind.NumericLiteral);
        let node = new NumericLiteralSyntax();
        node.value = parseInt(tokenValue);
        return node;
    }

    private parsePinDeclaration(): PinDeclarationSynax {
        let node = new PinDeclarationSynax();
        node.name = this.parseIdentifier();
        if (this.parseOptional(SyntaxKind.OpenBraceToken)) {

            node.width = this.parseNumericLiteral();
            this.parseExpected(SyntaxKind.CloseBraceToken);
        }

        return node;
    }

    private parseList<T extends SyntaxNode>(parseElement: () => T, listTerminator: SyntaxKind): T[] {

        let nodes = [];
        while (true) {
            if (this.currentToken == listTerminator) {
                break;
            }
            nodes.push(parseElement.bind(this)());
            if (this.currentToken == listTerminator) {
                break;
            }
            this.parseExpected(SyntaxKind.CommaToken);
        }

        return nodes;

    }

    private parsePinReference(): PinReferenceSyntax {
        let node = new PinReferenceSyntax();
        node.name = this.parseIdentifier();
        if (this.parseOptional(SyntaxKind.OpenBracketToken)) {
            node.from = this.parseNumericLiteral();
            if (this.parseOptional(SyntaxKind.DotDotToken)) {
                node.to = this.parseNumericLiteral();
                this.parseExpected(SyntaxKind.CloseBracketToken);
            }
        }
        return node;
    }

    private parseConnection(): ConnectionSyntax {
        let node = new ConnectionSyntax();
        node.source = this.parsePinReference();
        this.parseExpected(SyntaxKind.EqualsToken);
        node.target = this.parsePinReference();
        return node;
    }

    private parsePart(): PartSyntax {
        let node = new PartSyntax();
        node.name = this.parseIdentifier();
        this.parseExpected(SyntaxKind.OpenParenToken);
        node.connections = this.parseList(this.parseConnection, SyntaxKind.CloseParenToken);
        this.parseExpected(SyntaxKind.CloseParenToken);
        this.parseExpected(SyntaxKind.SemicolonToken);
        return node;
    }

    private parseChipDeclaration(): ChipDeclarationSyntax {
        this.parseExpected(SyntaxKind.ChipKeyword);

        let node = new ChipDeclarationSyntax();
        node.position = this.scanner.startPosition;


        node.name = this.parseIdentifier();

        this.parseExpected(SyntaxKind.OpenBraceToken);

        if (this.parseOptional(SyntaxKind.InKeyword)) {
            node.inputPins = this.parseList(this.parsePinDeclaration, SyntaxKind.SemicolonToken);
            this.parseExpected(SyntaxKind.SemicolonToken);
        }
        if (this.parseOptional(SyntaxKind.OutKeyword)) {
            node.outputPins = this.parseList(this.parsePinDeclaration, SyntaxKind.SemicolonToken);
            this.parseExpected(SyntaxKind.SemicolonToken);
        }

        if (this.parseOptional(SyntaxKind.BuiltInKeyword)) {
            this.parseIdentifier();
            this.parseExpected(SyntaxKind.SemicolonToken);
        }

        node.parts = [];
        if (this.parseOptional(SyntaxKind.PartsKeyword)) {
            this.parseExpected(SyntaxKind.ColonToken);
            while (this.currentToken == SyntaxKind.Identifier) {
                node.parts.push(this.parsePart());
            }
        }
        if (this.parseOptional(SyntaxKind.BuiltInKeyword)) {
            this.parseIdentifier();
            this.parseExpected(SyntaxKind.SemicolonToken);
        }
        if (this.parseOptional(SyntaxKind.ClockedKeyword)) {
            this.parseList(this.parseIdentifier, SyntaxKind.SemicolonToken);
            this.parseExpected(SyntaxKind.SemicolonToken);
        }

        this.parseExpected(SyntaxKind.CloseBraceToken);

        node.end = this.scanner.position;
        return node;
    }


}
