export interface FileFactory {
  createFile(data?: Record<string, any>): string;
}

export class JSONFileFactory implements FileFactory {
  createFile(data: Record<string, any>): string {
    return JSON.stringify(data, null, 2);
  }
}

export class YAMLFileFactory implements FileFactory {
  createFile(data: Record<string, any>): string {
    return Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }
}

export class MDFileFactory implements FileFactory {
  createFile(data: Record<string, any>): string {
    return Object.entries(data)
      .map(([key, value]) => `## ${key}\n\n${value}\n`)
      .join("\n");
  }
}

export type FactoryKey = "json" | "md" | "yaml";
export class FileFactoryRegistry {
  private static factories: Record<FactoryKey, FileFactory> = {
    json: new JSONFileFactory(),
    md: new MDFileFactory(),
    yaml: new YAMLFileFactory(),
  };

  static getFactory(type: FactoryKey) {
    const factory = FileFactoryRegistry.factories[type];
    if (!factory) throw new Error(`Unsupported file type: ${type}`);

    return factory;
  }
}
