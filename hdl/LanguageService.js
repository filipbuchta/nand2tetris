System.register(["./SyntaxNodes"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SyntaxNodes_1;
    var LanguageService;
    return {
        setters:[
            function (SyntaxNodes_1_1) {
                SyntaxNodes_1 = SyntaxNodes_1_1;
            }],
        execute: function() {
            LanguageService = (function () {
                function LanguageService() {
                }
                LanguageService.prototype.walk = function (node, pre, post, context) {
                    if (pre != null) {
                        pre(node, context);
                    }
                    if (node instanceof SyntaxNodes_1.ChipDeclarationSyntax) {
                        this.walk(node.name, pre, post, context);
                    }
                    if (post != null) {
                        post(node, context);
                    }
                };
                LanguageService.prototype.getCompletionsAtPosition = function (document, pos, prefix) {
                    var context = {
                        node: null
                    };
                    var pre = function (node, context) {
                        if (pos < node.position || pos > node.end)
                            return;
                        if (node instanceof SyntaxNodes_1.ChipDeclarationSyntax) {
                            context.node = node;
                        }
                    };
                    this.walk(document.syntax, pre, null, context);
                    if (context.node == null) {
                        return [
                            { name: "CHIP", value: "CHIP", score: 100, meta: "keyword" }
                        ];
                    }
                    else if (context.node instanceof SyntaxNodes_1.ChipDeclarationSyntax) {
                        return [
                            { name: "IN", value: "IN", score: 100, meta: "keyword" },
                            { name: "OUT", value: "OUT", score: 100, meta: "keyword" },
                            { name: "PARTS", value: "PARTS", score: 100, meta: "keyword" }
                        ];
                    }
                };
                return LanguageService;
            }());
            exports_1("default", LanguageService);
        }
    }
});
//# sourceMappingURL=LanguageService.js.map