/**
 * Agent Router - Routes commands to appropriate agents
 */

export class AgentRouter {
  constructor(registry) {
    this.registry = registry;
  }

  /**
   * Route command to appropriate agent(s)
   */
  async route(command, context = {}) {
    const timestamp = new Date().toISOString();
    
    console.log(`\n🔄 Routing command: "${command}"`);

    // Find matching agents
    const matchingAgents = this.registry.findByKeywords(command);

    if (matchingAgents.length === 0) {
      return {
        status: 'error',
        timestamp,
        message: 'No agents found for this command',
        suggestion: 'Try being more specific. Available keywords: web, site, seo, media, git, content, email, analytics',
        command
      };
    }

    // Execute primary agent
    const primaryAgentName = matchingAgents[0];
    const primaryAgent = this.registry.getAgent(primaryAgentName);

    console.log(`✓ Selected agent: ${primaryAgentName}`);

    try {
      const result = await primaryAgent.execute(command, context);
      
      // Record execution
      this.registry.recordExecution(command, primaryAgentName, result);

      return {
        status: result.status || 'success',
        timestamp,
        agent: primaryAgentName,
        command,
        result,
        alternativeAgents: matchingAgents.slice(1, 3) // Show 2 alternative agents
      };
    } catch (error) {
      console.error(`✗ Agent execution failed:`, error);
      return {
        status: 'error',
        timestamp,
        agent: primaryAgentName,
        command,
        error: error.message
      };
    }
  }

  /**
   * Get agent suggestions for a query
   */
  getSuggestions(query) {
    const agents = this.registry.findByKeywords(query);
    return agents.slice(0, 5).map(name => {
      const agent = this.registry.getAgent(name);
      return {
        name,
        description: agent.description
      };
    });
  }
}
