#!/usr/bin/env node
/**
 * CLI Client for MCP Agent Server
 * Usage: node cli.js "your command here"
 */

import axios from 'axios';

const SERVER_URL = process.env.MCP_SERVER || 'http://localhost:3000';

async function main() {
  const command = process.argv.slice(2).join(' ');

  if (!command) {
    console.log(`
🤖 MCP Agent CLI
Usage: node cli.js "your command here"

Examples:
  node cli.js "deploy website"
  node cli.js "optimize images"
  node cli.js "fix polish characters"
  node cli.js "update pricing"
  node cli.js "add email agent"

Available agents:
  - web (web, site, page, deploy, website, html, edit)
  - seo (seo, marketing, optimize, keywords, meta, conversion)
  - media (image, media, photo, compress, webp, gallery)
  - git (git, github, commit, push, deploy, version)
  - content (content, text, copy, write, grammar, spell, polish)
  - analytics (analytics, report, stats, metrics, data, track)
  - email (email, mail, newsletter, campaign, sendgrid)
    `);
    process.exit(0);
  }

  try {
    console.log(`\n📡 Sending command to agent server...\n`);
    
    const response = await axios.post(SERVER_URL, {
      command,
      timestamp: new Date().toISOString()
    });

    const result = response.data;

    // Format output
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`✓ Agent: ${result.agent}`);
    console.log(`✓ Status: ${result.status}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    
    if (result.result) {
      console.log(`📋 Response:\n`);
      console.log(result.result.message);
      
      if (result.result.subcommands) {
        console.log(`\n📚 Available subcommands:`);
        result.result.subcommands.forEach(cmd => {
          console.log(`   • ${cmd}`);
        });
      }
    }

    if (result.alternativeAgents && result.alternativeAgents.length > 0) {
      console.log(`\n💡 Alternative agents:`);
      result.alternativeAgents.forEach(agent => {
        console.log(`   • ${agent}`);
      });
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  } catch (error) {
    if (error.response) {
      console.error(`❌ Error: ${error.response.data.error}`);
      console.error(`Message: ${error.response.data.message}`);
    } else if (error.code === 'ECONNREFUSED') {
      console.error(`❌ Cannot connect to server at ${SERVER_URL}`);
      console.error(`Make sure the MCP server is running: npm start`);
    } else {
      console.error(`❌ Error: ${error.message}`);
    }
    process.exit(1);
  }
}

main();
