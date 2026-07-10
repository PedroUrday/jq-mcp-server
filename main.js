import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import jq from "node-jq";

const server = new McpServer({
    name: "jq",
    version: "1.0.0",
});

server.tool(
    "execute-jq-expression",
    "Execute a jq expression on a JSON file",
    {
        filter: z.string().describe("The jq expression"),
        filePath: z.string().describe("The absolute path to the JSON file"),
    },
    async ({ filter, filePath }) => {
        try {
            const rawResult = await jq.run(filter, filePath, { input: "file" });
            return {
                content: [{ type: "text", text: rawResult }],
            };
        } catch (err) {
            throw new Error("Error running JQ: " + err.message);
        }
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);
