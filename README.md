# Agents MCP Server

Intelligent agent system for task automation. Automatically routes commands to specialized agents based on keywords and context.

## 🤖 Features

- **Automatic Agent Routing** - Intelligently matches commands to agents
- **7 Built-in Agents** - Web, SEO, Media, Git, Content, Analytics, Email
- **Extensible** - Easy to add new agents and keywords
- **Command History** - Tracks all executed commands
- **Keyword Matching** - Context-aware command understanding
- **Multiple Agents** - Shows alternative agents if available

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Start Server

```bash
npm start
```

Server runs on `http://localhost:3000`

## 📝 Available Agents

### 1. Web Agent
Manages website updates, deployments, content changes
- `edit-page` - Edit HTML/CSS
- `change-price` - Update pricing
- `add-section` - Add new page section
- `deploy` - Deploy to production
- `fix-text` - Fix Polish characters

### 2. SEO Agent
Optimizes content for search engines and conversions
- `optimize-content` - Improve page content
- `add-meta` - Add SEO metadata
- `check-keywords` - Analyze keywords

### 3. Media Agent
Handles image optimization, conversions, gallery management
- `compress` - Compress images
- `convert` - Convert to WebP
- `optimize` - Auto-optimize images

### 4. Git Agent
Manages Git operations, commits, branches, deployments
- `commit` - Create commit
- `push` - Push to GitHub
- `deploy` - Deploy to production

### 5. Content Agent
Writes and improves content, fixes grammar
- `write` - Generate content
- `improve` - Enhance existing text
- `fix-grammar` - Fix Polish grammar

### 6. Analytics Agent
Analyzes traffic, generates reports
- `report` - Generate report
- `analyze` - Analyze metrics
- `track` - Setup tracking

### 7. Email Agent
Manages email campaigns, notifications
- `send` - Send email
- `template` - Create email template
- `campaign` - Setup campaign

## 💡 Usage Examples

### Using cURL

```bash
# Simple command
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"command": "deploy website"}'

# With context
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{
    "command": "fix polish characters",
    "context": {
      "file": "index.html",
      "language": "pl"
    }
  }'
```

### Using JavaScript

```javascript
const response = await fetch('http://localhost:3000', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    command: 'optimize images',
    context: { path: 'site/images' }
  })
});

const result = await response.json();
console.log(result);
```

## 🔧 API Response Format

```json
{
  "status": "success",
  "timestamp": "2025-11-27T10:00:00Z",
  "agent": "web",
  "command": "deploy website",
  "result": {
    "status": "info",
    "message": "Web agent processing: deploy website",
    "subcommands": [...]
  },
  "alternativeAgents": ["git", "seo"]
}
```

## 📚 Architecture

```
agents-mcp-server/
├── src/
│   ├── index.js           # MCP Server entry point
│   └── agents/
│       ├── registry.js    # Agent registry & management
│       └── router.js      # Command routing logic
├── package.json
└── README.md
```

## 🛠️ Adding Custom Agents

```javascript
// In registry.js
this.register('custom', {
  name: 'Custom Agent',
  description: 'Does custom things',
  async execute(command, context) {
    return {
      status: 'success',
      message: `Processing: ${command}`
    };
  }
}, ['custom', 'keyword1', 'keyword2']);
```

## 📊 Command Routing Logic

1. Parse command into keywords
2. Search registry for matching agent keywords
3. Sort agents by relevance (keyword matches)
4. Execute primary agent
5. Return result with alternative agents
6. Record execution in history

## 🔐 Security

- Input validation on all commands
- Error handling for agent failures
- CORS enabled for development
- Command history for auditing

## 📄 License

MIT

---

**Made for Sopel Przeprowadzki** | Intelligent automation at your command 🚀
