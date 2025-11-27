# MCP Agent Server Integration Guide

## 📋 Overview

The MCP Agent Server is a centralized command routing system that automatically understands your requests and delegates them to specialized agents. It works like a smart assistant that learns from context.

## 🎯 How It Works

```
Your Command
    ↓
MCP Agent Server
    ↓
Keyword Analysis
    ↓
Agent Matching
    ↓
Execute Agent
    ↓
Return Result
```

## 🚀 Quick Start

### 1. Start the Server

```bash
cd d:\Przeprowadzki\agents-mcp-server
npm install
npm start
```

Server will run on `http://localhost:3000`

### 2. Use the CLI

```bash
# In another terminal
node cli.js "your command"
```

Examples:
```bash
node cli.js "deploy website"
node cli.js "fix polish text"
node cli.js "optimize images"
node cli.js "update pricing"
node cli.js "write email campaign"
```

## 🤖 Available Agents & Keywords

### Web Agent
Manages websites, deployments, page updates
**Keywords:** web, site, page, deploy, website, html, edit, change, update

**Common Commands:**
- "deploy website" → Handles production deployment
- "edit home page" → Website editing
- "change phone number" → Update contact info
- "add new section" → Add page sections
- "fix page text" → Fix content

### SEO Agent
Search engine optimization and marketing
**Keywords:** seo, marketing, optimize, keywords, meta, conversion, traffic

**Common Commands:**
- "optimize page for seo" → Improve SEO
- "check keywords" → Analyze keywords
- "improve conversion" → Boost conversions

### Media Agent
Image and multimedia handling
**Keywords:** image, media, photo, compress, webp, gallery, optimize, convert

**Common Commands:**
- "compress images" → Reduce file sizes
- "convert to webp" → Format conversion
- "optimize gallery" → Batch processing
- "add image to site" → Upload images

### Git Agent
Version control and deployment
**Keywords:** git, github, commit, push, deploy, version, sync

**Common Commands:**
- "commit changes" → Create git commit
- "push to github" → Push changes
- "deploy to production" → Deploy
- "sync with main" → Sync branches

### Content Agent
Writing and copywriting
**Keywords:** content, text, copy, write, grammar, spell, polish, translate

**Common Commands:**
- "write product description" → Generate content
- "fix polish grammar" → Fix Polish text
- "improve text" → Enhance writing
- "translate to english" → Translate content

### Analytics Agent
Tracking and reporting
**Keywords:** analytics, report, stats, metrics, data, track, analyze

**Common Commands:**
- "generate report" → Create analytics report
- "analyze traffic" → Analyze metrics
- "track conversions" → Setup tracking

### Email Agent
Email marketing and communications
**Keywords:** email, mail, newsletter, campaign, sendgrid, marketing

**Common Commands:**
- "send email" → Email communications
- "create campaign" → Email marketing
- "setup newsletter" → Newsletter setup

## 📡 API Usage

### HTTP Request

```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{
    "command": "deploy website",
    "context": {
      "environment": "production",
      "force": true
    }
  }'
```

### Response Format

```json
{
  "status": "success",
  "timestamp": "2025-11-27T10:00:00Z",
  "agent": "web",
  "command": "deploy website",
  "result": {
    "status": "info",
    "message": "Web agent processing: deploy website",
    "subcommands": [
      "edit-page - Edit HTML/CSS",
      "deploy - Deploy to production",
      "fix-text - Fix Polish characters"
    ]
  },
  "alternativeAgents": ["git", "seo"]
}
```

## 💻 JavaScript Integration

```javascript
async function executeCommand(command, context = {}) {
  const response = await fetch('http://localhost:3000', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, context })
  });
  
  return await response.json();
}

// Example usage
const result = await executeCommand('deploy website');
console.log(`Agent: ${result.agent}`);
console.log(`Status: ${result.status}`);
console.log(`Message: ${result.result.message}`);
```

## 🧠 Smart Command Understanding

The system uses intelligent keyword matching:

```
Input: "i need to put new images on my website"
        ↓
Keywords Found: [website, images]
        ↓
Matching Agents: [web, media, seo]
        ↓
Primary: web (website is more specific)
```

## 🛠️ Adding Custom Agents

Edit `src/agents/registry.js`:

```javascript
this.register('custom', {
  name: 'My Custom Agent',
  description: 'Does custom work',
  async execute(command, context) {
    // Your logic here
    return {
      status: 'success',
      message: `Processing: ${command}`,
      data: { /* your data */ }
    };
  }
}, ['custom', 'keyword1', 'keyword2', 'keyword3']);
```

Restart server and your agent is ready!

## 📊 Command History

The system tracks all executed commands:

```javascript
registry.history // Array of command executions
```

Each entry contains:
- timestamp
- command text
- agent name
- success status

## 🔐 Best Practices

1. **Be Specific**: "deploy website to production" better than "deploy"
2. **Include Context**: Provide relevant details when possible
3. **Use Natural Language**: Type how you'd speak
4. **Check Alternatives**: Review suggested agents for better routing

## 🐛 Troubleshooting

### Server not responding
```bash
# Check if server is running
npm start
```

### Agent not found
```bash
# Use more specific keywords
node cli.js "deploy my website to production"
```

### Wrong agent selected
```bash
# Check alternative agents in response
# Alternative agents are listed as fallbacks
```

## 📚 Integration with sopel-przeprowadzki-site

The agents server can automate the website:

```bash
node cli.js "update pricing on website"
node cli.js "add new image to home page"
node cli.js "fix polish characters on site"
node cli.js "deploy latest changes"
node cli.js "optimize website images"
```

## 🚀 Next Steps

1. Install dependencies: `npm install`
2. Start server: `npm start`
3. Try first command: `node cli.js "deploy website"`
4. Add your own agents as needed
5. Integrate with your workflows

---

**Repository:** https://github.com/piotrsobczak-rgb/agents-mcp-server

Made with ❤️ for Sopel Przeprowadzki
