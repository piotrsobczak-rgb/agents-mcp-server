#!/usr/bin/env node
/**
 * MCP Server - Intelligent Agent System
 * Automatic agent routing based on user commands
 */

import http from 'http';
import { AgentRouter } from './agents/router.js';
import { AgentRegistry } from './agents/registry.js';

const PORT = process.env.MCP_PORT || 3000;

// Initialize registry and router
const registry = new AgentRegistry();
const router = new AgentRouter(registry);

// Initialize built-in agents
await registry.initializeBuiltInAgents();

// Create MCP Server
const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse request
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const data = body ? JSON.parse(body) : {};
      const { command, context = {} } = data;

      if (!command) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing command' }));
        return;
      }

      // Route command to appropriate agent
      const result = await router.route(command, context);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (error) {
      console.error('Error processing command:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`🤖 MCP Agent Server running on port ${PORT}`);
  console.log(`📚 Registry has ${registry.agents.size} agents loaded`);
  console.log('✅ Ready to process commands\n');
});
