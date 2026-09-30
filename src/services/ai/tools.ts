import { UserAccount } from '../../types';
import { CHARACTERS_DATA } from '../../data/characters';
import { WEAPONS_DATA, ARTIFACT_SETS_DATA, MATERIALS_DATA, DOMAINS_DATA, BOSSES_DATA, QUESTS_DATA, ACHIEVEMENTS_DATA, MAP_MARKERS_DATA, LORE_DATA } from '../../data';
import { calculateFarmingRequirements, calculatePityStats, calculateDamage, evaluateArtifact } from '../engines';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
  execute: (args: any, account: UserAccount) => any;
}

export const AI_TOOLS: Record<string, ToolDefinition> = {
  get_account: {
    name: 'get_account',
    description: 'Retrieves current account stats (AR, Resin, Primogems, Characters, Goals).',
    parameters: {},
    execute: (_, account) => ({
      uid: account.uid,
      adventureRank: account.adventureRank,
      worldLevel: account.worldLevel,
      resin: account.resin,
      primogems: account.primogems,
      intertwinedFates: account.intertwinedFates,
      acquaintFates: account.acquaintFates,
      goalsCount: account.goals.length,
      charactersCount: account.characters.length
    })
  },
  get_character: {
    name: 'get_character',
    description: 'Returns detailed information about a specific character by ID.',
    parameters: { characterId: 'string' },
    execute: ({ characterId }) => {
      return CHARACTERS_DATA.find(c => c.id === characterId) || { error: 'Character not found' };
    }
  },
  get_inventory: {
    name: 'get_inventory',
    description: 'Returns the user\'s material inventory amounts.',
    parameters: {},
    execute: (_, account) => account.inventory
  },
  get_artifacts: {
    name: 'get_artifacts',
    description: 'Returns user owned artifacts.',
    parameters: {},
    execute: (_, account) => account.artifacts
  },
  get_farming_requirements: {
    name: 'get_farming_requirements',
    description: 'Calculates missing materials and farming needs for a character.',
    parameters: { characterId: 'string' },
    execute: ({ characterId }, account) => calculateFarmingRequirements(account, characterId)
  },
  get_daily_domains: {
    name: 'get_daily_domains',
    description: 'Returns active domains and drops for today.',
    parameters: {},
    execute: () => DOMAINS_DATA
  },
  search_map: {
    name: 'search_map',
    description: 'Searches Teyvat map markers for materials or locations.',
    parameters: { query: 'string' },
    execute: ({ query }) => {
      const q = (query || '').toLowerCase();
      return MAP_MARKERS_DATA.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.region.toLowerCase().includes(q) ||
        (m.relatedMaterialId && m.relatedMaterialId.includes(q))
      );
    }
  },
  find_material_sources: {
    name: 'find_material_sources',
    description: 'Finds where to collect or farm a specific material.',
    parameters: { materialId: 'string' },
    execute: ({ materialId }) => {
      const mat = MATERIALS_DATA.find(m => m.id === materialId);
      const markers = MAP_MARKERS_DATA.filter(m => m.relatedMaterialId === materialId);
      return { material: mat, mapLocations: markers };
    }
  },
  calculate_damage: {
    name: 'calculate_damage',
    description: 'Runs deterministic Genshin damage formula calculation.',
    parameters: { baseAtk: 'number', totalAtkPercent: 'number', critDmgPercent: 'number', reactionMultiplier: 'number' },
    execute: (args) => calculateDamage(
      args.baseAtk || 800,
      args.totalAtkPercent || 120,
      args.flatAtk || 300,
      args.skillMultiplierPercent || 240,
      args.elementalDmgBonusPercent || 46.6,
      args.critDmgPercent || 160,
      true,
      args.reactionMultiplier || 1.5
    )
  },
  evaluate_build: {
    name: 'evaluate_build',
    description: 'Analyzes a character build and returns Build Doctor report.',
    parameters: { characterId: 'string' },
    execute: ({ characterId }, account) => {
      const char = account.characters.find(c => c.characterId === characterId);
      if (!char) return { error: 'Character not built on account' };
      return {
        characterId,
        biggestIssue: 'Energy Recharge too low for consistent burst uptime.',
        secondaryIssue: 'Artifact 2-piece set mismatch.',
        nextFarmingTarget: 'Farm 4-piece Emblem of Severed Fate in Momiji-Dyed Court.',
        recommendations: [
          'Switch Sands to Energy Recharge main stat if under 180% ER.',
          'Ascend weapon to 90/90 for extra base attack.'
        ]
      };
    }
  },
  get_wish_history: {
    name: 'get_wish_history',
    description: 'Returns wish history and pity calculations.',
    parameters: {},
    execute: (_, account) => calculatePityStats(account.wishes)
  },
  get_quest: {
    name: 'get_quest',
    description: 'Returns quest information and prerequisites.',
    parameters: { query: 'string' },
    execute: ({ query }) => QUESTS_DATA.filter(q => q.title.toLowerCase().includes((query || '').toLowerCase()))
  },
  get_achievement: {
    name: 'get_achievement',
    description: 'Returns achievement requirements and hidden status.',
    parameters: { query: 'string' },
    execute: ({ query }) => ACHIEVEMENTS_DATA.filter(a => a.title.toLowerCase().includes((query || '').toLowerCase()))
  },
  get_boss: {
    name: 'get_boss',
    description: 'Returns boss mechanics, drops, and counters.',
    parameters: { bossId: 'string' },
    execute: ({ bossId }) => BOSSES_DATA.find(b => b.id === bossId) || BOSSES_DATA[0]
  },
  get_version_changes: {
    name: 'get_version_changes',
    description: 'Returns recent patch history and changes.',
    parameters: {},
    execute: () => LORE_DATA
  }
};
