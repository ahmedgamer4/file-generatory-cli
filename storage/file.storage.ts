export interface FileStorage {
  saveFile(filePath: string, content: string): void;
  loadFile(filePath: string): string | Promise<string>;
}
