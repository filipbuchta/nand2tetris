import {ChipDeclarationSyntax} from "../hdl/SyntaxNodes";
import Workspace from "../workspace/Workspace";

class Connection {
    public sourcePin: string;
    public targetPin: string;

}

class Part {
    public chip: Chip;
    public connections: Connection[] = [];
}

export enum PinType {
    Input = 0,
    Internal = 1,
    Output = 2,
}

export class Pin {
    constructor(public name: string, public type: PinType) {

    }
}

export class Chip {
    public name: string;
    public pins: Pin[] = [];
    public parts: Part[] = [];
}

class PinReference {
    public value: boolean;
}

class ChipInstance {

    public chip: Chip;
    public parts: ChipInstance[] = [];

    public pins = {};

    constructor(chip: Chip) {
        this.chip = chip;
    }

    getPin(name: string): boolean {
        return this.pins[name].value;
    }

    setPin(name: string, value: boolean) {
        this.pins[name].value = value;
    }

    eval() {
        for (let part of this.parts) {
            part.eval();
        }
    }
}

class DFFChipInstance extends ChipInstance {
    private state: boolean;

    clockUp() {
        this.state = this.getPin("in");
    }

    clockDown() {
        this.setPin("out", this.state);
    }
}


class NandChipIntsance extends ChipInstance {

    constructor(chip: Chip) {
        super(chip);
    }

    eval() {
        let a = this.getPin("a");
        let b = this.getPin("b");
        if (a == true && b == true)
            this.setPin("out", false);
        else
            this.setPin("out", true);
    }
}


export default class HardwareSimulator {
    private chips: Chip[] = [];

    public createChipInstance(chip: Chip): ChipInstance {
        let chipInstance: ChipInstance;
        if (chip.name == "Nand") {
            chipInstance = new NandChipIntsance(chip);
        } else {
            chipInstance = new ChipInstance(chip);
        }

        for (let part of chip.parts) {
            let partInstance = this.createChipInstance(part.chip);
            chipInstance.parts.push(partInstance);

            for (let connection of part.connections) {
                //chipInstance.pins.
                //connection.targetPin;
            }
        }


        // for (let pin of chipInstance.pins) {
        //     //chipInstance.setPin(pin.name, false);
        // }


        return chipInstance;
    }

    public step() {
        let chip = Workspace.current.chip;
        let instance = this.createChipInstance(chip);
        //instance.setPin("a", false);
        //instance.setPin("b", false);

      //  instance.eval();

        console.log(instance);
    }

    public createChip(declaration: ChipDeclarationSyntax): Chip {
        let chip = this.chips[declaration.name.value];
        if (chip != null) {
            return chip;
        }

        chip = new Chip();

        chip.name = declaration.name.value;
        chip.parts = [];
        //chip.isBuiltIn =


        for (let pin of declaration.inputPins) {
            chip.pins.push(new Pin(pin.name.value, PinType.Input));
        }
        for (let pin of declaration.outputPins) {
            chip.pins.push(new Pin(pin.name.value, PinType.Output));
        }

        for (let partSyntax of declaration.parts) {
            let partChip = this.createChip(partSyntax.chipDeclaration);

            let part = new Part();
            part.chip = partChip;

            for (let connectionSyntax of partSyntax.connections) {

                let connection = new Connection();
                connection.sourcePin = connectionSyntax.source.name.value;
                connection.targetPin = connectionSyntax.target.name.value;
                part.connections.push(connection);

                {
                    let pin = chip.pins.filter(p => p.name == connectionSyntax.source.name.value)[0];
                    if (pin == null) {
                        chip.pins.push(new Pin(connectionSyntax.source.name.value, PinType.Internal));
                    }
                }
                {
                    let pin = chip.pins.filter(p => p.name == connectionSyntax.target.name.value)[0];
                    if (pin == null) {
                        chip.pins.push(new Pin(connectionSyntax.target.name.value, PinType.Internal));
                    }
                }

            }

            chip.parts.push(part);
        }


        this.chips[chip.name] = chip;
        return chip;
    }
}