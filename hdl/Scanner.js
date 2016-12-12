System.register(["./SyntaxKind"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SyntaxKind_1;
    var Scanner;
    return {
        setters:[
            function (SyntaxKind_1_1) {
                SyntaxKind_1 = SyntaxKind_1_1;
            }],
        execute: function() {
            Scanner = (function () {
                function Scanner(input) {
                    this.text = input;
                    this.position = 0;
                    this.startPosition = 0;
                    this.tokenValue = null;
                }
                Scanner.prototype.isWhiteSpace = function (char) {
                    return char == ' ' || char == '\t' || char == '\r' || char == '\n';
                };
                Scanner.prototype.isNumeric = function (char) {
                    return (char >= '0' && char <= '9');
                };
                Scanner.prototype.isIdentifierStart = function (char) {
                    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
                };
                Scanner.prototype.isIdentifierPart = function (char) {
                    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9');
                };
                Scanner.prototype.scan = function () {
                    this.startPosition = this.position;
                    while (true) {
                        this.tokenPosition = this.position;
                        if (this.position >= this.text.length) {
                            return this.token = SyntaxKind_1["default"].EndOfFileToken;
                        }
                        var ch = this.text.charAt(this.position);
                        switch (ch) {
                            case ' ':
                            case '\t':
                            case '\n':
                                while (this.position < this.text.length && this.isWhiteSpace(this.text.charAt(this.position))) {
                                    this.position++;
                                }
                                continue;
                            case '/':
                                if (this.text.charAt(this.position + 1) == '/') {
                                    this.position += 2;
                                    while (this.position < this.text.length) {
                                        if (this.text.charAt(this.position) == '\n') {
                                            break;
                                        }
                                        this.position++;
                                    }
                                    continue;
                                }
                                else if (this.text.charAt(this.position + 1) == '*') {
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
                                return this.token = SyntaxKind_1["default"].Unknown;
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
                                return this.token = SyntaxKind_1["default"].NumericLiteral;
                            case '.':
                                if (this.text.charAt(this.position + 1) == '.') {
                                    this.position += 2;
                                    return this.token = SyntaxKind_1["default"].DotDotToken;
                                }
                                else {
                                    this.error(". expected");
                                    this.position++;
                                    return this.token = SyntaxKind_1["default"].Unknown;
                                }
                            case '{':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].OpenBraceToken;
                            case '}':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].CloseBraceToken;
                            case '[':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].OpenBracketToken;
                            case ']':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].CloseBracketToken;
                            case ',':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].CommaToken;
                            case '(':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].OpenParenToken;
                            case ')':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].CloseParenToken;
                            case '=':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].EqualsToken;
                            case ';':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].SemicolonToken;
                            case ':':
                                this.position++;
                                return this.token = SyntaxKind_1["default"].ColonToken;
                            default:
                                if (this.isIdentifierStart(ch)) {
                                    while (this.position < this.text.length && this.isIdentifierPart(this.text.charAt(this.position))) {
                                        this.position++;
                                    }
                                    this.tokenValue = this.text.substring(this.tokenPosition, this.position);
                                    if (this.tokenValue == "CHIP") {
                                        return this.token = SyntaxKind_1["default"].ChipKeyword;
                                    }
                                    else if (this.tokenValue == "IN") {
                                        return this.token = SyntaxKind_1["default"].InKeyword;
                                    }
                                    else if (this.tokenValue == "OUT") {
                                        return this.token = SyntaxKind_1["default"].OutKeyword;
                                    }
                                    else if (this.tokenValue == "PARTS") {
                                        return this.token = SyntaxKind_1["default"].PartsKeyword;
                                    }
                                    else if (this.tokenValue == "CLOCKED") {
                                        return this.token = SyntaxKind_1["default"].ClockedKeyword;
                                    }
                                    else if (this.tokenValue == "BUILTIN") {
                                        return this.token = SyntaxKind_1["default"].BuiltInKeyword;
                                    }
                                    else {
                                        return this.token = SyntaxKind_1["default"].Identifier;
                                    }
                                }
                                else {
                                    this.error("unknown character: " + ch);
                                    this.position++;
                                    return this.token = SyntaxKind_1["default"].Unknown;
                                }
                        }
                    }
                };
                Scanner.prototype.error = function (reason) {
                    debugger;
                    throw reason;
                };
                return Scanner;
            }());
            exports_1("default", Scanner);
        }
    }
});
//# sourceMappingURL=Scanner.js.map