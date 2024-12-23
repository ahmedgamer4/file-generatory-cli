/**
 * Target interface: FileStorage
 * Adaptee: Bun file API
 * Adapted Methods: Bun.file, Bun.write
 * Responsibiliity: Brides Bun API to FileStorage
 */

import type { FileStorage } from "./file.storage";

export class LocalFileStorage implements FileStorage {
  loadFile(filePath: string): string {
    const f = Bun.file(filePath);
    return f.toString();
  }

  saveFile(filePath: string, content: string): void {
    Bun.write(filePath, content);
    console.log(`File saved locally at ${filePath}`);
  }
}
