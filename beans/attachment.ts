import * as path from "path";
import {Configuration} from "../configuration";
import * as fs from "fs-extra";

export class Attachment {
    public readonly title: string;
    public readonly mime: string;
    public readonly fullFilePath: string;
    public readonly size: number;

    constructor(attachmentObject) {
        const buff = new Buffer(attachmentObject.bufferString);

        this.title = attachmentObject.title;
        this.mime = attachmentObject.mime;
        this.size = buff.length;
        this.fullFilePath = this.writeFile(buff, attachmentObject.fileName);
    }

    private writeFile(buffer: Buffer, fileName: string, baseDir = Configuration.baseDir): string {
        const fullFilePath = path.join(baseDir, fileName);
        fs.outputFileSync(fullFilePath, buffer);
        return fullFilePath;
    }

    toXML() {
        return {
            '@': {
                title: this.title,
                source: this.fullFilePath,
                type: this.mime,
                size: this.size
            }
        };
    }
}