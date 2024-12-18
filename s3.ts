import S3rver from "s3rver";
import { readFileSync } from "fs";

new S3rver({
  port: 5005,
  directory: "./s3",
  configureBuckets: [
    {
      name: "file-generator",
      configs: [
        readFileSync("./cors.xml"),
        // Bun.file("./cors.xml").toString()
      ],
    },
  ],
}).run();
