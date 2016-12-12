System.register(["./Parser", "./Binder", "../workspace/SourceFile"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Parser_1, Binder_1, SourceFile_1;
    var Compiler;
    return {
        setters:[
            function (Parser_1_1) {
                Parser_1 = Parser_1_1;
            },
            function (Binder_1_1) {
                Binder_1 = Binder_1_1;
            },
            function (SourceFile_1_1) {
                SourceFile_1 = SourceFile_1_1;
            }],
        execute: function() {
            Compiler = (function () {
                function Compiler(sources) {
                    this.sources = sources;
                }
                Compiler.prototype.compile = function () {
                    var nodes = [];
                    for (var _i = 0, _a = this.sources; _i < _a.length; _i++) {
                        var source = _a[_i];
                        if (source.extensions == "hdl") {
                            var parser = new Parser_1["default"](source);
                            var syntax = parser.parse();
                            source.syntax = syntax;
                            nodes.push(syntax);
                        }
                    }
                    var binder = new Binder_1["default"](nodes);
                    binder.bind();
                    for (var _b = 0, _c = this.sources; _b < _c.length; _b++) {
                        var source = _c[_b];
                        source.spans = [];
                        {
                            var identifier = source.syntax.name;
                            source.spans.push(new SourceFile_1.DocumentSpan(identifier.position, identifier.end, "blue"));
                        }
                    }
                };
                return Compiler;
            }());
            exports_1("default", Compiler);
        }
    }
});
//# sourceMappingURL=Compiler.js.map