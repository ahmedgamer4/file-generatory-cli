import { program } from "commander";
import { ConfigManager } from "./config/config-manager.config";
import { defaultTemplates } from "./prototypes/file.prototype";
import { FileFactoryRegistry, type FactoryKey } from "./factories/file.factory";
import { FileBuilder } from "./builders/file-builder.builder";
import { FileAccessProxy } from "./proxies/file-access.proxy";
import { S3FileStorage } from "./storage/s3-file.storage";
import { LocalFileStorage } from "./storage/local-file.storage";

async function main() {
  program
    .version("1.0.0")
    .description("Configurable File Generator CLI")
    .option("-t, --type <type>", "File type (json, yaml, md)", "json")
    .option("-o, --output <path>", "Output file path", "./output/generated")
    .option(
      "--template <template>",
      "File template (config, script, document)",
      "config"
    )
    .option("--uses3", "Use S3 for file storage")
    .parse(process.argv);

  const options = program.opts();

  const configManager = ConfigManager.getInstance();
  configManager.setSetting("outputType", options.type);
  configManager.setSetting("outputPath", options.type);

  const template =
    defaultTemplates[options.template as keyof typeof defaultTemplates].clone;

  const fileType = options.type;
  const factory = FileFactoryRegistry.getFactory(fileType as FactoryKey);

  const fileBuilder =
    fileType === "md" || fileType === "yaml"
      ? new FileBuilder()
          .addHeader(`${options.template.toUpperCase()} Template`)
          .addContent(
            factory.createFile({
              name: "example",
              description: "test1",
            })
          )
          .addFooter("EOF")
      : new FileBuilder().addContent(
          factory.createFile({
            name: "example",
            description: "test1",
          })
        );

  const fileContent = fileBuilder.build();

  const fileProxy = new FileAccessProxy(true);
  console.log("s3", options["uses3"]);
  // const storage = options["uses3"]
  //   ? new S3FileStorage()
  //   : new LocalFileStorage();
  const storage = new S3FileStorage();

  const outputPath = `${options.output}.${options.type}`;

  try {
    fileProxy.writeFile(outputPath, fileContent);
    storage.saveFile(outputPath, fileContent);
    console.log("File generation complete!");
  } catch (error) {
    console.error("Error generating file:", error);
  }
}

main().catch(console.error);
