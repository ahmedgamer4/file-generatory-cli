# Configurable File Generator CLI

## Overview

A CLI tool for generating configuration files, scripts, and documents.

## Installation

```bash
bun install
```

## Usage

```bash
# Run S3rver
bun run s3.ts

# Generate a JSON config file
bun run start -- -t json -o ./output/config --template config

# Generate a YAML script
bun run start -- -t yaml -o ./output/script --template script

# Use S3 storage
bun run start -- -t json --use-s3 -o remote/config
```

## Design Patterns Used

1. **Singleton**: ConfigManager
2. **Builder**: Dynamic file content construction
3. **Prototype**: File template cloning
4. **Factory Method**: File type generation
5. **Proxy**: File access control
6. **Adapter**: File storage mechanisms
