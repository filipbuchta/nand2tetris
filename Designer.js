var Designer = (function () {
    function Designer() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        requestAnimationFrame(this.tick.bind(this));
    }
    Designer.prototype.tick = function () {
        this.update();
        this.draw();
        requestAnimationFrame(this.tick.bind(this));
    };
    Designer.prototype.update = function () {
    };
    Designer.prototype.drawChip = function (chip) {
        var context = this.context;
        context.fillText(chip.name + " " + chip.size, 10, 10);
        context.strokeRect(50, 50, 100 * chip.size, 100 * chip.size);
        for (var _i = 0, _a = chip.parts; _i < _a.length; _i++) {
            var part = _a[_i];
            this.drawChip(part.chip);
        }
    };
    Designer.prototype.draw = function () {
        this.canvas.width = 600;
        this.canvas.height = 600;
        var context = this.context;
        context.fillStyle = "black";
        if (this.currentChip != null) {
            this.drawChip(this.currentChip);
        }
    };
    return Designer;
}());
//# sourceMappingURL=Designer.js.map