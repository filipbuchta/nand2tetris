class Designer {


    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private currentChip: Chip;


    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        requestAnimationFrame(this.tick.bind(this));

    }


    tick() {
        this.update();
        this.draw();
        requestAnimationFrame(this.tick.bind(this));
    }

    update() {

    }

    drawChip(chip: Chip): void {
        let context = this.context;

        context.fillText(`${chip.name} ${chip.size}`, 10, 10);
        context.strokeRect(50, 50, 100 * chip.size, 100 * chip.size);

        for (let part of chip.parts) {
            this.drawChip(part.chip);
        }
    }

    draw() {
        this.canvas.width = 600;
        this.canvas.height = 600;

        let context = this.context;
        context.fillStyle = "black";
        if (this.currentChip != null) {
            this.drawChip(this.currentChip);
        }
    }
}