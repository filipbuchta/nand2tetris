System.register(["./Scanner", "./SyntaxKind", "./SyntaxNodes"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Scanner_1, SyntaxKind_1, SyntaxNodes_1;
    var Parser;
    return {
        setters:[
            function (Scanner_1_1) {
                Scanner_1 = Scanner_1_1;
            },
            function (SyntaxKind_1_1) {
                SyntaxKind_1 = SyntaxKind_1_1;
            },
            function (SyntaxNodes_1_1) {
                SyntaxNodes_1 = SyntaxNodes_1_1;
            }],
        execute: function() {
            Parser = (function () {
                function Parser(source) {
                    this.source = source;
                    this.scanner = new Scanner_1["default"](this.source.content);
                }
                Parser.prototype.error = function (reason) {
                    throw reason;
                };
                Parser.prototype.nextToken = function () {
                    return this.currentToken = this.scanner.scan();
                };
                Parser.prototype.parseExpected = function (kind) {
                    if (this.currentToken == kind) {
                        this.nextToken();
                        return true;
                    }
                    this.error("Expected: " + SyntaxKind_1["default"][kind] + " but got " + SyntaxKind_1["default"][this.currentToken]);
                    return false;
                };
                Parser.prototype.parseOptional = function (kind) {
                    if (this.currentToken == kind) {
                        this.nextToken();
                        return true;
                    }
                    return false;
                };
                Parser.prototype.parse = function () {
                    this.nextToken();
                    return this.parseChipDeclaration();
                };
                Parser.prototype.parseIdentifier = function () {
                    var tokenValue = this.scanner.tokenValue;
                    this.parseExpected(SyntaxKind_1["default"].Identifier);
                    var node = new SyntaxNodes_1.IdentifierSyntax();
                    node.position = this.scanner.startPosition;
                    node.value = this.scanner.tokenValue;
                    node.end = this.scanner.position;
                    return node;
                };
                Parser.prototype.parseNumericLiteral = function () {
                    var tokenValue = this.scanner.tokenValue;
                    this.parseExpected(SyntaxKind_1["default"].NumericLiteral);
                    var node = new SyntaxNodes_1.NumericLiteralSyntax();
                    node.value = parseInt(tokenValue);
                    return node;
                };
                Parser.prototype.parsePinDeclaration = function () {
                    var node = new SyntaxNodes_1.PinDeclarationSynax();
                    node.name = this.parseIdentifier();
                    if (this.parseOptional(SyntaxKind_1["default"].OpenBraceToken)) {
                        node.width = this.parseNumericLiteral();
                        this.parseExpected(SyntaxKind_1["default"].CloseBraceToken);
                    }
                    return node;
                };
                Parser.prototype.parseList = function (parseElement, listTerminator) {
                    var nodes = [];
                    while (true) {
                        if (this.currentToken == listTerminator) {
                            break;
                        }
                        nodes.push(parseElement.bind(this)());
                        if (this.currentToken == listTerminator) {
                            break;
                        }
                        this.parseExpected(SyntaxKind_1["default"].CommaToken);
                    }
                    return nodes;
                };
                Parser.prototype.parsePinReference = function () {
                    var node = new SyntaxNodes_1.PinReferenceSyntax();
                    node.name = this.parseIdentifier();
                    if (this.parseOptional(SyntaxKind_1["default"].OpenBracketToken)) {
                        node.from = this.parseNumericLiteral();
                        if (this.parseOptional(SyntaxKind_1["default"].DotDotToken)) {
                            node.to = this.parseNumericLiteral();
                            this.parseExpected(SyntaxKind_1["default"].CloseBracketToken);
                        }
                    }
                    return node;
                };
                Parser.prototype.parseConnection = function () {
                    var node = new SyntaxNodes_1.ConnectionSyntax();
                    node.source = this.parsePinReference();
                    this.parseExpected(SyntaxKind_1["default"].EqualsToken);
                    node.target = this.parsePinReference();
                    return node;
                };
                Parser.prototype.parsePart = function () {
                    var node = new SyntaxNodes_1.PartSyntax();
                    node.name = this.parseIdentifier();
                    this.parseExpected(SyntaxKind_1["default"].OpenParenToken);
                    node.connections = this.parseList(this.parseConnection, SyntaxKind_1["default"].CloseParenToken);
                    this.parseExpected(SyntaxKind_1["default"].CloseParenToken);
                    this.parseExpected(SyntaxKind_1["default"].SemicolonToken);
                    return node;
                };
                Parser.prototype.parseChipDeclaration = function () {
                    this.parseExpected(SyntaxKind_1["default"].ChipKeyword);
                    var node = new SyntaxNodes_1.ChipDeclarationSyntax();
                    node.position = this.scanner.startPosition;
                    node.name = this.parseIdentifier();
                    this.parseExpected(SyntaxKind_1["default"].OpenBraceToken);
                    if (this.parseOptional(SyntaxKind_1["default"].InKeyword)) {
                        node.inputPins = this.parseList(this.parsePinDeclaration, SyntaxKind_1["default"].SemicolonToken);
                        this.parseExpected(SyntaxKind_1["default"].SemicolonToken);
                    }
                    if (this.parseOptional(SyntaxKind_1["default"].OutKeyword)) {
                        node.outputPins = this.parseList(this.parsePinDeclaration, SyntaxKind_1["default"].SemicolonToken);
                        this.parseExpected(SyntaxKind_1["default"].SemicolonToken);
                    }
                    if (this.parseOptional(SyntaxKind_1["default"].BuiltInKeyword)) {
                        this.parseIdentifier();
                        this.parseExpected(SyntaxKind_1["default"].SemicolonToken);
                    }
                    node.parts = [];
                    if (this.parseOptional(SyntaxKind_1["default"].PartsKeyword)) {
                        this.parseExpected(SyntaxKind_1["default"].ColonToken);
                        while (this.currentToken == SyntaxKind_1["default"].Identifier) {
                            node.parts.push(this.parsePart());
                        }
                    }
                    if (this.parseOptional(SyntaxKind_1["default"].BuiltInKeyword)) {
                        this.parseIdentifier();
                        this.parseExpected(SyntaxKind_1["default"].SemicolonToken);
                    }
                    if (this.parseOptional(SyntaxKind_1["default"].ClockedKeyword)) {
                        this.parseList(this.parseIdentifier, SyntaxKind_1["default"].SemicolonToken);
                        this.parseExpected(SyntaxKind_1["default"].SemicolonToken);
                    }
                    this.parseExpected(SyntaxKind_1["default"].CloseBraceToken);
                    node.end = this.scanner.position;
                    return node;
                };
                return Parser;
            }());
            exports_1("default", Parser);
        }
    }
});
//# sourceMappingURL=Parser.js.map