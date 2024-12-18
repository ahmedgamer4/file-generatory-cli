import type { FileStorage } from "./file.storage";
import AWS from "aws-sdk";

// Disable AWS warnings
AWS.config.logger = {} as any;

export const S3_BUCKET_NAME = "file-generator";

export class S3FileStorage implements FileStorage {
  private s3 = new AWS.S3({
    region: "us-east-1",
    s3ForcePathStyle: true,
    endpoint: "http://localhost:5005",
    credentials: {
      accessKeyId: "S3RVER",
      secretAccessKey: "S3RVER",
    },
  });

  async loadFile(filePath: string) {
    const data = await this.s3
      .getObject({ Key: filePath, Bucket: S3_BUCKET_NAME })
      .promise();
    return data.Body?.toString() || "";
  }

  async saveFile(filePath: string, content: string): Promise<void> {
    if (!content) throw new Error("File content cannot be empty");

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: filePath,
      Body: Buffer.from(content, "utf-8"), // Convert string to Buffer
      ContentType: this.getContentType(filePath),
    };

    try {
      const result = await this.s3.putObject(params).promise();
      console.log(`File uploaded to S3 successfully - ETag: ${result.ETag}`);
    } catch (error: any) {
      console.error("S3 upload error:", error.message);
      throw new Error(`Failed to upload to S3: ${error.message}`);
    }
  }

  private getContentType(filePath: string): string {
    const extension = filePath.split(".").pop()?.toLowerCase();
    const contentTypes: Record<string, string> = {
      json: "application/json",
      yaml: "text/yaml",
      yml: "text/yaml",
      md: "text/markdown",
      txt: "text/plain",
    };
    return contentTypes[extension || ""] || "text/plain";
  }
}
