import { UserAccount } from '../../../types';
import { AI_TOOLS } from '../tools';

export interface AIResponse {
  text: string;
  toolCallsPerformed?: Array<{ name: string; result: any }>;
  structured?: {
    answer: string;
    reasoning?: string;
    dataUsed?: string[];
    nextSteps?: string[];
  };
}

export interface AIProvider {
  chat(prompt: string, context: { account: UserAccount; mode?: string }): Promise<AIResponse>;
}

export class MockAIProvider implements AIProvider {
  async chat(prompt: string, context: { account: UserAccount; mode?: string }): Promise<AIResponse> {
    const query = prompt.toLowerCase();
    const account = context.account;
    const toolCallsPerformed: Array<{ name: string; result: any }> = [];

    if (query.includes('what should i do') || query.includes('plan') || query.includes('today')) {
      const farmingData = AI_TOOLS.get_farming_requirements.execute({ characterId: 'hu_tao' }, account);
      toolCallsPerformed.push({ name: 'get_farming_requirements', result: farmingData });

      return {
        text: `### ANSWER\nBased on your active goal (**Build Hu Tao**) and your current Resin (${account.resin.current}/${account.resin.max}), here is your prioritized daily plan:\n\n1. **Farm Taishan Mansion Domain** for *Philosophies of Diligence* (Today's Rotation).\n2. **Defeat Primo Geovishap** twice for *Juvenile Jades* (You have ${account.inventory['juvenile_jade'] || 0}/46).\n3. **Gather 18 Silk Flowers** around Yujing Terrace.\n\n### WHY\nTaishan Mansion has Diligence books available today. Finishing these materials will advance your Hu Tao build from 78% to 92% completion!`,
        toolCallsPerformed,
        structured: {
          answer: "Farm Diligence Talent Books at Taishan Mansion, defeat Primo Geovishap twice, and gather 18 Silk Flowers.",
          reasoning: "Diligence books are in rotation today. Resin efficiency is highest when focusing on active build blockers.",
          dataUsed: ["Resin: 120/200", "Goal: Build Hu Tao (78%)", "Inventory: 38/46 Juvenile Jades"],
          nextSteps: ["Open Map to Taishan Mansion", "Spend 40 Resin on Domain", "Spend 80 Resin on Primo Geovishap"]
        }
      };
    }

    if (query.includes('hu tao') || query.includes('weak') || query.includes('build')) {
      const buildReport = AI_TOOLS.evaluate_build.execute({ characterId: 'hu_tao' }, account);
      toolCallsPerformed.push({ name: 'evaluate_build', result: buildReport });

      return {
        text: `### ANSWER\nYour Hu Tao is currently Level 80/80 with Level 8/8/6 talents. Here is your **Build Doctor** analysis:\n\n- **BIGGEST ISSUE:** ${buildReport.biggestIssue}\n- **SECONDARY ISSUE:** ${buildReport.secondaryIssue}\n- **RECOMMENDED ACTION:** ${buildReport.nextFarmingTarget}`,
        toolCallsPerformed,
        structured: {
          answer: "Upgrade Hu Tao to Level 90/90, increase Burst talent, and replace Sands with higher Energy Recharge / CRIT DMG.",
          reasoning: "Hu Tao scales immensely with Max HP from Level 90 ascension, and higher ER guarantees rotation fluidity.",
          dataUsed: ["Level: 80/80", "Talents: 8/8/6", "Weapon: Staff of Homa R1"],
          nextSteps: ["Ascend Hu Tao to Phase 6", "Crown Normal Attack to Level 10"]
        }
      };
    }

    if (query.includes('damage') || query.includes('calculate') || query.includes('dps')) {
      const dmgResult = AI_TOOLS.calculate_damage.execute({ baseAtk: 714, totalAtkPercent: 120, critDmgPercent: 210, reactionMultiplier: 1.5 }, account);
      toolCallsPerformed.push({ name: 'calculate_damage', result: dmgResult });

      return {
        text: `### DAMAGE LAB COMPUTATION RESULT\n- **Total Calculated ATK:** ${dmgResult.totalAtk}\n- **Non-CRIT Hit:** ${dmgResult.nonCritDamage}\n- **CRIT Hit:** ${dmgResult.critDamage}\n- **Vaporize Reaction CRIT:** ${dmgResult.reactionDamage}\n\n*Note: Calculation assumes Enemy Level 90 with 10% base resistance.*`,
        toolCallsPerformed
      };
    }

    // Default general query response
    const accStats = AI_TOOLS.get_account.execute({}, account);
    toolCallsPerformed.push({ name: 'get_account', result: accStats });

    return {
      text: `Greetings Traveler! I have analyzed your account (**UID: ${account.uid}**, AR ${account.adventureRank}, ${account.primogems} Primogems, ${account.resin.current} Resin).\n\nHow can I assist your journey across Teyvat today? You can ask about farming routes, build evaluations, damage calculations, or pity stats!`,
      toolCallsPerformed
    };
  }
}
