import type { FileStorage } from "../storage/file.storage";

export class FileAccessProxy implements FileStorage {
  private hasWriteAccess: boolean;
  private hasReadAccess: boolean;
  private logEnabled: boolean;
  private storage: FileStorage;

  constructor(
    storage: FileStorage,
    hasWriteAccess: boolean = false,
    hasReadAccess: boolean = false,
    logEnabled: boolean = false
  ) {
    this.storage = storage;
    this.hasWriteAccess = hasWriteAccess;
    this.hasReadAccess = hasReadAccess;
    this.logEnabled = logEnabled;
  }
  saveFile(filePath: string, content: string): void {
    if (!this.checkAccess("write")) {
      throw new Error("Access Denied: Insufficient write permissions.");
    }

    this.log("Write", filePath);

    this.storage.saveFile(filePath, content);
  }

  loadFile(filePath: string): string | Promise<string> {
    if (!this.checkAccess("read"))
      throw new Error("Access Denied: Insufficient read permissions");

    this.log("Read", filePath);

    return this.storage.loadFile(filePath);
  }

  private checkAccess(operation: string): boolean {
    switch (operation) {
      case "write":
        return this.hasWriteAccess;
      case "read":
        return this.hasReadAccess;
      default:
        return false;
    }
  }

  private log(operation: string, filePath: string): void {
    if (this.logEnabled) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ${operation} operation on: ${filePath}`);
    }
  }
}
