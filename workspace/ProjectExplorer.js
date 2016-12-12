System.register(["react"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React;
    var ProjectExplorer;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            }],
        execute: function() {
            ProjectExplorer = (function (_super) {
                __extends(ProjectExplorer, _super);
                function ProjectExplorer() {
                    _super.apply(this, arguments);
                }
                ProjectExplorer.prototype.render = function () {
                    var _this = this;
                    return React.createElement("div", null, this.props.sourceFiles.map(function (sourceFile) {
                        return React.createElement("div", {key: sourceFile.filename, onClick: function () { return _this.props.onOpenSourceFile(sourceFile); }}, sourceFile.filename);
                    }));
                };
                return ProjectExplorer;
            }(React.Component));
            exports_1("default", ProjectExplorer);
        }
    }
});
//# sourceMappingURL=ProjectExplorer.js.map