System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Binder;
    return {
        setters:[],
        execute: function() {
            Binder = (function () {
                function Binder(nodes) {
                    this.nodes = nodes;
                }
                Binder.prototype.bind = function () {
                    for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                        var node = _a[_i];
                        if (node.parts != null) {
                            var _loop_1 = function(part) {
                                var partChip = this_1.nodes.filter(function (n) { return n.name.value == part.name.value; })[0];
                                part.chipDeclaration = partChip;
                                if (partChip == null) {
                                    throw "Unknown chip: " + part.name.value;
                                }
                                for (var _b = 0, _c = part.connections; _b < _c.length; _b++) {
                                    var connection = _c[_b];
                                    var sourcePin = connection.source.name;
                                }
                            };
                            var this_1 = this;
                            for (var _d = 0, _e = node.parts; _d < _e.length; _d++) {
                                var part = _e[_d];
                                _loop_1(part);
                            }
                        }
                    }
                };
                return Binder;
            }());
            exports_1("default", Binder);
        }
    }
});
//# sourceMappingURL=Binder.js.map