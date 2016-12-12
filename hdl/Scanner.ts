
import SyntaxKind from "./SyntaxKind";

export default class Scanner {
    private text: string;

    public position: number;
    public startPosition: number;
    private tokenPosition: number;

    private token: SyntaxKind;
    tokenValue: any;

    public constructor(input: string) {
        this.text = input;
        this.position = 0;
        this.startPosition = 0;
        this.tokenValue = null;
    }

    private isWhiteSpace(char: string): boolean {
        return char == ' ' || char == '\t' || char == '\r' || char == '\n';
    }
    private isNumeric(char: string): boolean {
        return (char >= '0' && char <= '9');
    }
    private isIdentifierStart(char: string): boolean {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
    }
    private isIdentifierPart(char: string): boolean {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9');
    }

    public scan(): SyntaxKind {
        this.startPosition = this.position;

        while (true) {
            this.tokenPosition = this.position;
            if (this.position >= this.text.length) {
                return this.token = SyntaxKind.EndOfFileToken;
            }
            let ch = this.text.charAt(this.position);

            switch (ch) {
                case ' ':
                case '\t':
                case '\n':
                    while (this.position < this.text.length && this.isWhiteSpace(this.text.charAt(this.position))) {
                        this.position++;
                    }
                    continue;

                case '/':
                    if (this.text.charAt(this.position + 1) == '/') { // Single-line comment
                        this.position += 2;
                        while (this.position < this.text.length) {
                            if (this.text.charAt(this.position) == '\n') {
                                break;
                            }
                            this.position++;
                        }
                        continue;
                    } else if (this.text.charAt(this.position + 1) == '*') { // Multi-line comment
                        this.position += 2;

                        while (this.position < this.text.length) {
                            if (this.text.charAt(this.position) == '*' && this.text.charAt(this.position + 1) == '/') {
                                this.position += 2;
                                break;
                            }
                            this.position++;
                        }
                        continue;
                    }
                    this.error("/ or * expected");
                    this.position++;
                    return this.token = SyntaxKind.Unknown;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    while (this.position < this.text.length && this.isNumeric(this.text.charAt(this.position))) {
                        this.position++;
                    }
                    this.tokenValue = parseInt(this.text.substr(this.tokenPosition, this.position));
                    return this.token = SyntaxKind.NumericLiteral;
                case '.':
                    if (this.text.charAt(this.position + 1) == '.') {
                        this.position += 2;
                        return this.token = SyntaxKind.DotDotToken;
                    } else {
                        this.error(". expected");
                        this.position++;
                        return this.token = SyntaxKind.Unknown;
                    }
                case '{':
                    this.position++;
                    return this.token = SyntaxKind.OpenBraceToken;
                case '}':
                    this.position++;
                    return this.token = SyntaxKind.CloseBraceToken;
                case '[':
                    this.position++;
                    return this.token = SyntaxKind.OpenBracketToken;
                case ']':
                    this.position++;
                    return this.token = SyntaxKind.CloseBracketToken;
                case ',':
                    this.position++;
                    return this.token = SyntaxKind.CommaToken;
                case '(':
                    this.position++;
                    return this.token = SyntaxKind.OpenParenToken;
                case ')':
                    this.position++;
                    return this.token = SyntaxKind.CloseParenToken;
                case '=':
                    this.position++;
                    return this.token = SyntaxKind.EqualsToken;
                case ';':
                    this.position++;
                    return this.token = SyntaxKind.SemicolonToken;
                case ':':
                    this.position++;
                    return this.token = SyntaxKind.ColonToken;
                default:
                    if (this.isIdentifierStart(ch)) {
                        while (this.position < this.text.length && this.isIdentifierPart(this.text.charAt(this.position))) {
                            this.position++;
                        }

                        this.tokenValue = this.text.substring(this.tokenPosition, this.position);
                        if (this.tokenValue == "CHIP") {
                            return this.token = SyntaxKind.ChipKeyword;
                        } else if (this.tokenValue == "IN") {
                            return this.token = SyntaxKind.InKeyword;
                        } else if (this.tokenValue == "OUT") {
                            return this.token = SyntaxKind.OutKeyword;
                        } else if (this.tokenValue == "PARTS") {
                            return this.token = SyntaxKind.PartsKeyword;
                        } else if (this.tokenValue == "CLOCKED") {
                            return this.token = SyntaxKind.ClockedKeyword;
                        } else if (this.tokenValue == "BUILTIN") {
                            return this.token = SyntaxKind.BuiltInKeyword;
                        } else {
                            return this.token = SyntaxKind.Identifier;
                        }
                    } else {
                        this.error("unknown character: " + ch);
                        this.position++;
                        return this.token = SyntaxKind.Unknown;
                    }
            }
        }
    }

    private error(reason: string) {
        debugger;
        throw reason;
    }
}