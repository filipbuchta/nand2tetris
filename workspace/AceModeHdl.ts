import ace from "ace";
import "ace/ext/language_tools";
import Workspace from "./Workspace";

var langTools = ace.require("ace/ext/language_tools");
langTools.setCompleters([]);
langTools.addCompleter({
    getCompletions: function (editor, session, pos: {row: number, column: number}, prefix: string, callback) {
        let results = Workspace.current.languageService.getCompletionsAtPosition(Workspace.current.document, session.doc.positionToIndex(pos), prefix);
        callback(null, results);
    }
});


ace.define('ace/mode/hdl', function (require, exports, module) {

    let oop = ace.require("ace/lib/oop");
    let TextMode = ace.require("ace/mode/text").Mode;

    let TextHighlightRules = ace.require("ace/mode/text_highlight_rules").TextHighlightRules;

    let rules = function () {

        this.$rules = {
            start: [{
                token: "keyword",
                regex: "^CHIP|BUILTIN|IN|OUT|PARTS$",
            }, {
                token: "comment",
                regex: "//.*",
            }, {
                token: "comment",
                regex: "/\\*.*",
                next: "comment",
                merge: true,
            }],
            comment: [{
                token: "comment",
                regex: ".*\\*/",
                next: "start",
                merge: true,
            }, {
                token: "comment",
                regex: ".+",
                merge: true,
            }]
        }

    };

    oop.inherits(rules, TextHighlightRules);


    var Mode = function () {
        this.HighlightRules = rules;
    };
    oop.inherits(Mode, TextMode);

    exports.Mode = Mode;
});
