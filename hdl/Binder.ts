
import {ChipDeclarationSyntax} from "./SyntaxNodes";
export default class Binder {

    constructor(private nodes: ChipDeclarationSyntax[]) {

    }

    public bind() {
        for (let node of this.nodes) {
            if (node.parts != null) {
                for (let part of node.parts) {
                    let partChip = this.nodes.filter( n => n.name.value == part.name.value)[0];
                    part.chipDeclaration = partChip;
                    if (partChip == null) {
                        throw "Unknown chip: " + part.name.value;
                    }
                    for (let connection of part.connections) {
                        let sourcePin = connection.source.name;
                    }
                }
            }
        }
    }
}