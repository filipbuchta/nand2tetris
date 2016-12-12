System.register(["./SourceFile", "../hdl/Compiler", "../hdl/LanguageService", "../hardware/HardwareSimulator"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SourceFile_1, Compiler_1, LanguageService_1, HardwareSimulator_1;
    var Workspace;
    return {
        setters:[
            function (SourceFile_1_1) {
                SourceFile_1 = SourceFile_1_1;
            },
            function (Compiler_1_1) {
                Compiler_1 = Compiler_1_1;
            },
            function (LanguageService_1_1) {
                LanguageService_1 = LanguageService_1_1;
            },
            function (HardwareSimulator_1_1) {
                HardwareSimulator_1 = HardwareSimulator_1_1;
            }],
        execute: function() {
            Workspace = (function () {
                function Workspace() {
                    this.sourceFiles = [];
                    this.languageService = new LanguageService_1["default"]();
                    this.hardwareSimulator = new HardwareSimulator_1["default"]();
                }
                Workspace.loadFile = function (file) {
                    return fetch(file)
                        .then(function (res) { return res.text(); })
                        .then(function (content) {
                        content = content.replace(/\r/g, "");
                        return new SourceFile_1["default"](file, content);
                    });
                };
                Workspace.load = function () {
                    return Promise.all([
                        this.loadFile("Nand.hdl"),
                        this.loadFile("And.hdl"),
                    ]).then(function (sources) {
                        var workspace = new Workspace();
                        workspace.sourceFiles = sources;
                        workspace.processSources();
                        workspace.document = workspace.sourceFiles[1];
                        workspace.chip = workspace.hardwareSimulator.createChip(workspace.document.syntax);
                        Workspace.current = workspace;
                        workspace.hardwareSimulator.step();
                        return workspace;
                    });
                };
                Workspace.prototype.processSources = function () {
                    var compiler = new Compiler_1["default"](this.sourceFiles);
                    compiler.compile();
                };
                return Workspace;
            }());
            exports_1("default", Workspace);
        }
    }
});
//# sourceMappingURL=Workspace.js.map