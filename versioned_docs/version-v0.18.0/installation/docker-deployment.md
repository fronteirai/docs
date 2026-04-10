# Docker Deployment

Deploy Fronteir AI using Docker for local development, testing, and proof-of-concept scenarios.

## Overview

Docker deployment is the fastest way to get Fronteir AI running. It's ideal for:

- Local development and testing
- Single-machine deployments
- Proof-of-concept and evaluation
- Small team usage

For production deployments, see [Kubernetes Deployment](/installation/kubernetes-deployment/).

## Prerequisites

- Docker installed
- 2+ CPU cores and 4GB RAM available
- 10GB disk space

## Quick Start

### Basic Deployment (Built-in PostgreSQL)

Run Fronteir AI with the built-in PostgreSQL instance (suitable for development and testing):

```bash
docker run -d \
  --name obot \
  -v obot-data:/data \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 8080:8080 \
  -e OPENAI_API_KEY=your-openai-key \
  ghcr.io/obot-platform/obot:latest
```

#### With Authentication

```bash
docker run -d \
  --name obot \
  -v obot-data:/data \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 8080:8080 \
  -e OPENAI_API_KEY=your-openai-key \
  -e OBOT_SERVER_ENABLE_AUTHENTICATION=true \
  -e OBOT_BOOTSTRAP_TOKEN=your-bootstrap-token \
  ghcr.io/obot-platform/obot:latest
```

#### Using a Custom Port

If you want to expose Fronteir AI on a different port (e.g., `-p 9999:8080`), you must also set `OBOT_SERVER_HOSTNAME` so that authentication redirects and MCP server connection URLs work correctly:

```bash
docker run -d \
  --name obot \
  -v obot-data:/data \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 9999:8080 \
  -e OPENAI_API_KEY=your-openai-key \
  -e OBOT_SERVER_HOSTNAME=localhost:9999 \
  ghcr.io/obot-platform/obot:latest
```

## Accessing Fronteir AI

Once started, access Fronteir AI at http://localhost:8080.

If you enabled authentication, use your bootstrap token to log in as the owner and set up an authentication provider. If you didn't supply a bootstrap token, a random one will be generated and can be found in the container's logs by searching for "Bootstrap token".

## Workflow Sharing Storage

Workflow sharing is available through Fronteir AI's Nanobot integration and stores published workflows separately from workspace files.

For local Docker deployments:

- The default local published-workflow store is usually sufficient
- Keep the Fronteir AI data volume mounted if you want published workflows to survive container replacement

If you want published workflows in Docker to use external object storage instead of local disk, configure the published workflow storage environment variables described in [Server Configuration](../configuration/server-configuration.md) and [Workflow Sharing](../functionality/workflow-sharing.md).

## Next Steps

1. **Configure Authentication**: Set up [auth providers](/installation/enabling-authentication/) for secure access
2. **Configure Model Providers**: Configure [model providers](/configuration/model-providers/) (OpenAI, Anthropic, etc.)
3. **Set Up MCP Servers**: Configure [MCP servers](/functionality/mcp-servers/) for extended functionality

## Related Documentation

- [Installation Overview](/installation/overview/)
- [Kubernetes Deployment](/installation/kubernetes-deployment/)
- [Server Configuration](/configuration/server-configuration/)
