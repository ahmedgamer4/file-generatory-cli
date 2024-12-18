export class FileBuilder {
  private fileContent = "";

  addHeader(header: string) {
    this.fileContent += `# ${header}\n\n`;
    return this;
  }

  addContent(content: string) {
    this.fileContent += `${content}\n`;
    return this;
  }

  addFooter(footer: string) {
    this.fileContent += `\n# ${footer}`;
    return this;
  }

  build(): string {
    return this.fileContent;
  }
}
