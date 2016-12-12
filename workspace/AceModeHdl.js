System.register(["ace", "ace/ext/language_tools", "./Workspace"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ace_1, Workspace_1;
    var langTools;
    return {
        setters:[
            function (ace_1_1) {
                ace_1 = ace_1_1;
            },
            function (_1) {},
            function (Workspace_1_1) {
                Workspace_1 = Workspace_1_1;
            }],
        execute: function() {
            langTools = ace_1["default"].require("ace/ext/language_tools");
            langTools.setCompleters([]);
            langTools.addCompleter({
                getCompletions: function (editor, session, pos, prefix, callback) {
                    var results = Workspace_1["default"].current.languageService.getCompletionsAtPosition(Workspace_1["default"].current.document, session.doc.positionToIndex(pos), prefix);
                    callback(null, results);
                }
            });
            ace_1["default"].define('ace/mode/hdl', function (require, exports, module) {
                var oop = ace_1["default"].require("ace/lib/oop");
                var TextMode = ace_1["default"].require("ace/mode/text").Mode;
                var TextHighlightRules = ace_1["default"].require("ace/mode/text_highlight_rules").TextHighlightRules;
                var rules = function () {
                    this.$rules = {
                        start: [{
                                token: "keyword",
                                regex: "^CHIP|BUILTIN|IN|OUT|PARTS$"
                            }, {
                                token: "comment",
                                regex: "//.*"
                            }, {
                                token: "comment",
                                regex: "/\\*.*",
                                next: "comment",
                                merge: true
                            }],
                        comment: [{
                                token: "comment",
                                regex: ".*\\*/",
                                next: "start",
                                merge: true
                            }, {
                                token: "comment",
                                regex: ".+",
                                merge: true
                            }]
                    };
                };
                oop.inherits(rules, TextHighlightRules);
                var Mode = function () {
                    this.HighlightRules = rules;
                };
                oop.inherits(Mode, TextMode);
                exports.Mode = Mode;
            });
        }
    }
});
//# sourceMappingURL=AceModeHdl.js.map