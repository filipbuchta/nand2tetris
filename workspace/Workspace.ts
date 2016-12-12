import Parser from "../hdl/Parser";
import SourceFile from "./SourceFile";
import Compiler from "../hdl/Compiler";
import LanguageService from "../hdl/LanguageService";
import HardwareSimulator from "../hardware/HardwareSimulator";
import {Chip} from "../hardware/HardwareSimulator";
import {ChipDeclarationSyntax} from "../hdl/SyntaxNodes";

export default class Workspace {
    public sourceFiles: SourceFile[] = [];

    public static current: Workspace;

    public document: SourceFile;
    public chip: Chip;

    public languageService: LanguageService = new LanguageService();
    public hardwareSimulator: HardwareSimulator = new HardwareSimulator();

    public static loadFile(file: string): Promise<SourceFile> {
        return fetch(file)
            .then(res => res.text())
            .then(content => {
                content = content.replace(/\r/g, "");
                return new SourceFile(file, content)
            });
    }

    public static load(): Promise<Workspace> {
        return Promise.all(
            [
                this.loadFile("Nand.hdl"),
                this.loadFile("And.hdl"),
            ]
        ).then((sources: SourceFile[]) => {
            let workspace = new Workspace();
            workspace.sourceFiles = sources;
            workspace.processSources();

            workspace.document = workspace.sourceFiles[1];
            workspace.chip = workspace.hardwareSimulator.createChip(<ChipDeclarationSyntax>workspace.document.syntax);

            Workspace.current = workspace;

            workspace.hardwareSimulator.step();

            return workspace;
        });
    }

    private processSources() {
        let compiler = new Compiler(this.sourceFiles);
        compiler.compile();

    }

}
