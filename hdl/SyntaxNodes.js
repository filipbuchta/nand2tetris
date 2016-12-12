System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var SyntaxNode, IdentifierSyntax, NumericLiteralSyntax, ChipDeclarationSyntax, PinDeclarationSynax, PartSyntax, PinReferenceSyntax, ConnectionSyntax;
    return {
        setters:[],
        execute: function() {
            SyntaxNode = (function () {
                function SyntaxNode() {
                }
                return SyntaxNode;
            }());
            exports_1("SyntaxNode", SyntaxNode);
            IdentifierSyntax = (function (_super) {
                __extends(IdentifierSyntax, _super);
                function IdentifierSyntax() {
                    _super.apply(this, arguments);
                }
                return IdentifierSyntax;
            }(SyntaxNode));
            exports_1("IdentifierSyntax", IdentifierSyntax);
            NumericLiteralSyntax = (function (_super) {
                __extends(NumericLiteralSyntax, _super);
                function NumericLiteralSyntax() {
                    _super.apply(this, arguments);
                }
                return NumericLiteralSyntax;
            }(SyntaxNode));
            exports_1("NumericLiteralSyntax", NumericLiteralSyntax);
            ChipDeclarationSyntax = (function (_super) {
                __extends(ChipDeclarationSyntax, _super);
                function ChipDeclarationSyntax() {
                    _super.apply(this, arguments);
                }
                return ChipDeclarationSyntax;
            }(SyntaxNode));
            exports_1("ChipDeclarationSyntax", ChipDeclarationSyntax);
            PinDeclarationSynax = (function (_super) {
                __extends(PinDeclarationSynax, _super);
                function PinDeclarationSynax() {
                    _super.apply(this, arguments);
                }
                return PinDeclarationSynax;
            }(SyntaxNode));
            exports_1("PinDeclarationSynax", PinDeclarationSynax);
            PartSyntax = (function (_super) {
                __extends(PartSyntax, _super);
                function PartSyntax() {
                    _super.apply(this, arguments);
                }
                return PartSyntax;
            }(SyntaxNode));
            exports_1("PartSyntax", PartSyntax);
            PinReferenceSyntax = (function (_super) {
                __extends(PinReferenceSyntax, _super);
                function PinReferenceSyntax() {
                    _super.apply(this, arguments);
                }
                return PinReferenceSyntax;
            }(SyntaxNode));
            exports_1("PinReferenceSyntax", PinReferenceSyntax);
            ConnectionSyntax = (function (_super) {
                __extends(ConnectionSyntax, _super);
                function ConnectionSyntax() {
                    _super.apply(this, arguments);
                }
                return ConnectionSyntax;
            }(SyntaxNode));
            exports_1("ConnectionSyntax", ConnectionSyntax);
        }
    }
});
//# sourceMappingURL=SyntaxNodes.js.map