System.register(["../workspace/Workspace"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Workspace_1;
    var Connection, Part, PinType, Pin, Chip, PinReference, ChipInstance, DFFChipInstance, NandChipIntsance, HardwareSimulator;
    return {
        setters:[
            function (Workspace_1_1) {
                Workspace_1 = Workspace_1_1;
            }],
        execute: function() {
            Connection = (function () {
                function Connection() {
                }
                return Connection;
            }());
            Part = (function () {
                function Part() {
                    this.connections = [];
                }
                return Part;
            }());
            (function (PinType) {
                PinType[PinType["Input"] = 0] = "Input";
                PinType[PinType["Internal"] = 1] = "Internal";
                PinType[PinType["Output"] = 2] = "Output";
            })(PinType || (PinType = {}));
            exports_1("PinType", PinType);
            Pin = (function () {
                function Pin(name, type) {
                    this.name = name;
                    this.type = type;
                }
                return Pin;
            }());
            exports_1("Pin", Pin);
            Chip = (function () {
                function Chip() {
                    this.pins = [];
                    this.parts = [];
                }
                return Chip;
            }());
            exports_1("Chip", Chip);
            PinReference = (function () {
                function PinReference() {
                }
                return PinReference;
            }());
            ChipInstance = (function () {
                function ChipInstance(chip) {
                    this.parts = [];
                    this.pins = {};
                    this.chip = chip;
                }
                ChipInstance.prototype.getPin = function (name) {
                    return this.pins[name].value;
                };
                ChipInstance.prototype.setPin = function (name, value) {
                    this.pins[name].value = value;
                };
                ChipInstance.prototype.eval = function () {
                    for (var _i = 0, _a = this.parts; _i < _a.length; _i++) {
                        var part = _a[_i];
                        part.eval();
                    }
                };
                return ChipInstance;
            }());
            DFFChipInstance = (function (_super) {
                __extends(DFFChipInstance, _super);
                function DFFChipInstance() {
                    _super.apply(this, arguments);
                }
                DFFChipInstance.prototype.clockUp = function () {
                    this.state = this.getPin("in");
                };
                DFFChipInstance.prototype.clockDown = function () {
                    this.setPin("out", this.state);
                };
                return DFFChipInstance;
            }(ChipInstance));
            NandChipIntsance = (function (_super) {
                __extends(NandChipIntsance, _super);
                function NandChipIntsance(chip) {
                    _super.call(this, chip);
                }
                NandChipIntsance.prototype.eval = function () {
                    var a = this.getPin("a");
                    var b = this.getPin("b");
                    if (a == true && b == true)
                        this.setPin("out", false);
                    else
                        this.setPin("out", true);
                };
                return NandChipIntsance;
            }(ChipInstance));
            HardwareSimulator = (function () {
                function HardwareSimulator() {
                    this.chips = [];
                }
                HardwareSimulator.prototype.createChipInstance = function (chip) {
                    var chipInstance;
                    if (chip.name == "Nand") {
                        chipInstance = new NandChipIntsance(chip);
                    }
                    else {
                        chipInstance = new ChipInstance(chip);
                    }
                    for (var _i = 0, _a = chip.parts; _i < _a.length; _i++) {
                        var part = _a[_i];
                        var partInstance = this.createChipInstance(part.chip);
                        chipInstance.parts.push(partInstance);
                        for (var _b = 0, _c = part.connections; _b < _c.length; _b++) {
                            var connection = _c[_b];
                        }
                    }
                    // for (let pin of chipInstance.pins) {
                    //     //chipInstance.setPin(pin.name, false);
                    // }
                    return chipInstance;
                };
                HardwareSimulator.prototype.step = function () {
                    var chip = Workspace_1["default"].current.chip;
                    var instance = this.createChipInstance(chip);
                    //instance.setPin("a", false);
                    //instance.setPin("b", false);
                    //  instance.eval();
                    console.log(instance);
                };
                HardwareSimulator.prototype.createChip = function (declaration) {
                    var chip = this.chips[declaration.name.value];
                    if (chip != null) {
                        return chip;
                    }
                    chip = new Chip();
                    chip.name = declaration.name.value;
                    chip.parts = [];
                    //chip.isBuiltIn =
                    for (var _i = 0, _a = declaration.inputPins; _i < _a.length; _i++) {
                        var pin = _a[_i];
                        chip.pins.push(new Pin(pin.name.value, PinType.Input));
                    }
                    for (var _b = 0, _c = declaration.outputPins; _b < _c.length; _b++) {
                        var pin = _c[_b];
                        chip.pins.push(new Pin(pin.name.value, PinType.Output));
                    }
                    for (var _d = 0, _e = declaration.parts; _d < _e.length; _d++) {
                        var partSyntax = _e[_d];
                        var partChip = this.createChip(partSyntax.chipDeclaration);
                        var part = new Part();
                        part.chip = partChip;
                        var _loop_1 = function(connectionSyntax) {
                            var connection = new Connection();
                            connection.sourcePin = connectionSyntax.source.name.value;
                            connection.targetPin = connectionSyntax.target.name.value;
                            part.connections.push(connection);
                            {
                                var pin = chip.pins.filter(function (p) { return p.name == connectionSyntax.source.name.value; })[0];
                                if (pin == null) {
                                    chip.pins.push(new Pin(connectionSyntax.source.name.value, PinType.Internal));
                                }
                            }
                            {
                                var pin = chip.pins.filter(function (p) { return p.name == connectionSyntax.target.name.value; })[0];
                                if (pin == null) {
                                    chip.pins.push(new Pin(connectionSyntax.target.name.value, PinType.Internal));
                                }
                            }
                        };
                        for (var _f = 0, _g = partSyntax.connections; _f < _g.length; _f++) {
                            var connectionSyntax = _g[_f];
                            _loop_1(connectionSyntax);
                        }
                        chip.parts.push(part);
                    }
                    this.chips[chip.name] = chip;
                    return chip;
                };
                return HardwareSimulator;
            }());
            exports_1("default", HardwareSimulator);
        }
    }
});
//# sourceMappingURL=HardwareSimulator.js.map