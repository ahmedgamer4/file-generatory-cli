import { ConfigManager } from "../config/config-manager.config";

export class FileTemplate {
  constructor(private content: string) {}

  clone(): FileTemplate {
    return new FileTemplate(this.content);
  }

  getContent(): string {
    return this.content;
  }

  modify(content: string): FileTemplate {
    return new FileTemplate(content);
  }
}

export const defaultTemplates = {
  config: new FileTemplate("# Configuration File\n\n"),
  script: new FileTemplate("#!/bin/bash\n# Script Template\n"),
  document: new FileTemplate("# Documentation\n\n## Overview\n"),
};
