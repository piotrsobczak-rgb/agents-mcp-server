/**
 * Agent Registry - Central registry for all agents
 */

export class AgentRegistry {
  constructor() {
    this.agents = new Map();
    this.keywords = new Map(); // keyword -> agent name mapping
    this.history = [];
  }

  /**
   * Register an agent
   */
  register(name, agent, keywords = []) {
    this.agents.set(name, agent);
    keywords.forEach(kw => {
      const lower = kw.toLowerCase();
      if (!this.keywords.has(lower)) {
        this.keywords.set(lower, []);
      }
      this.keywords.get(lower).push(name);
    });
    console.log(`✓ Agent registered: ${name}`);
  }

  /**
   * Find agents matching keywords
   */
  findByKeywords(query) {
    const terms = query.toLowerCase().split(/\s+/);
    const matches = new Map();

    terms.forEach(term => {
      const agentNames = this.keywords.get(term) || [];
      agentNames.forEach(name => {
        matches.set(name, (matches.get(name) || 0) + 1);
      });
    });

    // Sort by relevance (most keyword matches first)
    return Array.from(matches.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
  }

  /**
   * Get agent by name
   */
  getAgent(name) {
    return this.agents.get(name);
  }

  /**
   * Record command execution
   */
  recordExecution(command, agent, result) {
    this.history.push({
      timestamp: new Date(),
      command,
      agent,
      success: !result.error
    });
  }

  /**
   * Initialize built-in agents
   */
  async initializeBuiltInAgents() {
    // Web Development Agent
    this.register('web', {
      name: 'Web Development Agent',
      description: 'Manages website updates, deployments, content changes',
      async execute(command, context) {
        return {
          status: 'info',
          message: `Web agent processing: ${command}`,
          subcommands: [
            'edit-page - Edit HTML/CSS',
            'change-price - Update pricing',
            'add-section - Add new page section',
            'deploy - Deploy to production',
            'fix-text - Fix Polish characters',
            'change-phone - Update contact info'
          ]
        };
      }
    }, ['web', 'site', 'page', 'deploy', 'website', 'html', 'edit']);

    // SEO/Marketing Agent
    this.register('seo', {
      name: 'SEO & Marketing Agent',
      description: 'Optimizes content for search engines and conversions',
      async execute(command, context) {
        return {
          status: 'info',
          message: `SEO agent processing: ${command}`,
          subcommands: [
            'optimize-content - Improve page content',
            'add-meta - Add SEO metadata',
            'check-keywords - Analyze keywords',
            'improve-cta - Better call-to-actions'
          ]
        };
      }
    }, ['seo', 'marketing', 'optimize', 'keywords', 'meta', 'conversion']);

    // Image & Media Agent
    this.register('media', {
      name: 'Image & Media Agent',
      description: 'Handles image optimization, conversions, gallery management',
      async execute(command, context) {
        return {
          status: 'info',
          message: `Media agent processing: ${command}`,
          subcommands: [
            'compress - Compress images',
            'convert - Convert to WebP',
            'optimize - Auto-optimize images',
            'add-image - Add new image to page'
          ]
        };
      }
    }, ['image', 'media', 'photo', 'compress', 'webp', 'gallery', 'optimize']);

    // Git & Version Control Agent
    this.register('git', {
      name: 'Git & Version Control Agent',
      description: 'Manages Git operations, commits, branches, deployments',
      async execute(command, context) {
        return {
          status: 'info',
          message: `Git agent processing: ${command}`,
          subcommands: [
            'commit - Create commit',
            'push - Push to GitHub',
            'deploy - Deploy to production',
            'revert - Revert changes',
            'sync - Sync with main'
          ]
        };
      }
    }, ['git', 'github', 'commit', 'push', 'deploy', 'version']);

    // Content & Copywriting Agent
    this.register('content', {
      name: 'Content & Copywriting Agent',
      description: 'Writes and improves content, fixes grammar, enhances messaging',
      async execute(command, context) {
        return {
          status: 'info',
          message: `Content agent processing: ${command}`,
          subcommands: [
            'write - Generate content',
            'improve - Enhance existing text',
            'fix-grammar - Fix Polish grammar',
            'translate - Translate content',
            'rewrite - Rewrite section'
          ]
        };
      }
    }, ['content', 'text', 'copy', 'write', 'grammar', 'spell', 'polish']);

    // Data & Analytics Agent
    this.register('analytics', {
      name: 'Analytics & Reporting Agent',
      description: 'Analyzes traffic, generates reports, provides insights',
      async execute(command, context) {
        return {
          status: 'info',
          message: `Analytics agent processing: ${command}`,
          subcommands: [
            'report - Generate report',
            'analyze - Analyze metrics',
            'track - Setup tracking',
            'compare - Compare metrics'
          ]
        };
      }
    }, ['analytics', 'report', 'stats', 'metrics', 'data', 'track']);

    // Email & Communication Agent
    this.register('email', {
      name: 'Email & Communication Agent',
      description: 'Manages email campaigns, notifications, communications',
      async execute(command, context) {
        return {
          status: 'info',
          message: `Email agent processing: ${command}`,
          subcommands: [
            'send - Send email',
            'template - Create email template',
            'campaign - Setup campaign',
            'setup - Configure email service'
          ]
        };
      }
    }, ['email', 'mail', 'newsletter', 'campaign', 'sendgrid']);

    console.log(`\n📦 Built-in agents initialized: ${this.agents.size}`);
  }
}
