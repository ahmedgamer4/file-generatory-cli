export class ConfigManager {
  private static instance: ConfigManager;
  private settings: Record<string, string> = {};

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) ConfigManager.instance = new ConfigManager();
    return ConfigManager.instance;
  }

  setSetting(key: string, value: string) {
    if (!key || !value) throw new Error("Invalid key or value");
    this.settings[key] = value;
  }

  getSetting(key: string): string | undefined {
    return this.settings[key];
  }
}
