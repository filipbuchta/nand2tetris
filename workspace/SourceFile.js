System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DocumentSpan, SourceFile;
    return {
        setters:[],
        execute: function() {
            DocumentSpan = (function () {
                function DocumentSpan(position, end, color) {
                    this.position = position;
                    this.end = end;
                    this.color = color;
                }
                return DocumentSpan;
            }());
            exports_1("DocumentSpan", DocumentSpan);
            SourceFile = (function () {
                function SourceFile(filename, content) {
                    this.filename = filename;
                    this.content = content;
                }
                Object.defineProperty(SourceFile.prototype, "extensions", {
                    get: function () {
                        return this.filename.substring(this.filename.lastIndexOf(".") + 1);
                    },
                    enumerable: true,
                    configurable: true
                });
                return SourceFile;
            }());
            exports_1("default", SourceFile);
        }
    }
});
//# sourceMappingURL=SourceFile.js.map