import * as fs from "fs";
import { dirname } from "path";

export class FileAccessProxy {
  constructor(private hasPermission: boolean = false) {}

  writeFile(filePath: string, content: string) {
    if (!this.hasPermission) {
      throw new Error("Access Denied: Insufficient permissions.");
    }

    const dir = dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });

    if (fs.existsSync(filePath)) {
      console.warn(`File ${filePath} already exists. Overwriting...`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`File written successfully: ${filePath}`);
  }
}
