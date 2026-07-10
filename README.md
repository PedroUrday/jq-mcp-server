# jq MCP Server

This project is an MCP (Model Context Protocol) server for AI models that allows executing jq expressions against JSON files.

## What it does

The server exposes a tool that runs a jq filter on a JSON file and returns the result as text. It accepts the jq expression and the absolute path to the JSON file, and it handles execution errors.

## Requirements

- Node.js
- npm, pnpm (recommended) or any compatible Node.js package manager

## Installation

- Install the dependencies with:

```bash
npm install
```

- Or with pnpm:

```bash
pnpm install
```

For security reasons, the pnpm package manager is recommended. You can configure it with the following command before installing any dependencies:

```bash
pnpm config set minimum-release-age 1440 --global
```

This adds a layer of security against supply chain attacks.

If you use pnpm run `pnpm approve-builds`, select `node-jq` with <space> key and press <Enter>. Finally press `y` and press <Enter> to confirm.

- Or install dependencies with your favorite Node.js package manager.

## Usage with MCP clients

This server is intended to be started by MCP-compatible clients; you do not need to run `node main.js` manually. Properly configured clients will start the server when needed. Below are example client configurations (replace `/path/to/...` with the correct path on your system).

- Continue (VSCode extension) — example `config.yaml`:

```yaml
mcpServers:
    - name: jq MCP server
      command: npx
      args:
          - -y
          - node
          - /path/to/mcp_servers/jq/main.js
      env: {}
```

- Claude (desktop) — example `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "jq": {
            "command": "npx",
            "args": ["-y", "node", "/path/to/mcp_servers/jq/main.js"]
        }
    }
}
```

- GitHub Copilot (VSCode). Press Ctrl+Shift+P (Windows or Linux) or Cmd+Shift+P (Mac) to open the Command Palette. Execute the MCP: Open User Configuration command. This creates a clean `mcp.json` in your global user profile directory. Edit the `mcp.json` file and place the following:

```json
{
    "servers": {
        "jq": {
            "command": "npx",
            "args": ["-y", "node", "/path/to/mcp_servers/jq/main.js"]
        }
    }
}
```

- Generic MCP client (command line):

```bash
# A client can launch the server this way if it must be started manually
npx -y node /path/to/mcp_servers/jq/main.js
```

## Tool exposed

The server exposes the following MCP tool:

- `execute-jq-expression`
    - Parameters:
        - `filter`: the jq expression to evaluate
        - `filePath`: the absolute path to the JSON file

## Example

If the JSON file contains:

```json
{
    "name": "Ada",
    "skills": ["jq", "JSON"]
}
```

You can use a filter such as:

```text
.name
```

or:

```text
.skills[]
```

Notes:

- Check the documentation of the MCP client you use for the exact configuration key names; the examples above are common templates.
- When chatting with the AI, make sure to provide the absolute path of JSON file and the jq expression.
