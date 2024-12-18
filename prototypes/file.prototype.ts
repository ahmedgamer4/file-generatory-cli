export interface File {
  clone(): File;
}

export class BasicFileTemplate implements File {
  constructor(private content: string) {}

  clone(): BasicFileTemplate {
    return new BasicFileTemplate(this.content);
  }

  getContent(): string {
    return this.content;
  }

  modify(content: string): BasicFileTemplate {
    return new BasicFileTemplate(content);
  }
}

export const defaultTemplates = {
  config: new BasicFileTemplate("# Configuration File\n\n"),
  script: new BasicFileTemplate("#!/bin/bash\n# Script Template\n"),
  document: new BasicFileTemplate("# Documentation\n\n## Overview\n"),
};
