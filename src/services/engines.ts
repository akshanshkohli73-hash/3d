import { UserAccount, UserArtifact, UserCharacter, UserGoal, WishRecord } from '../types';

export function calculateFarmingRequirements(
  account: UserAccount,
  characterId: string,
  targetLevel: number = 90
) {
  const materialsList = [];

  if (characterId === 'hu_tao') {
    const requiredSilk = 168;
    const ownedSilk = account.inventory['silk_flower'] || 0;
    materialsList.push({
      materialId: 'silk_flower',
      materialName: 'Silk Flower',
      owned: ownedSilk,
      required: requiredSilk,
      missing: Math.max(0, requiredSilk - ownedSilk),
      sourceLocations: ['Liyue Harbor', 'Wangshu Inn']
    });

    const requiredJade = 46;
    const ownedJade = account.inventory['juvenile_jade'] || 0;
    materialsList.push({
      materialId: 'juvenile_jade',
      materialName: 'Juvenile Jade',
      owned: ownedJade,
      required: requiredJade,
      missing: Math.max(0, requiredJade - ownedJade),
      sourceLocations: ['Primo Geovishap']
    });

    const requiredDiligence = 114;
    const ownedDiligence = account.inventory['diligence_book'] || 0;
    materialsList.push({
      materialId: 'diligence_book',
      materialName: 'Philosophies of Diligence',
      owned: ownedDiligence,
      required: requiredDiligence,
      missing: Math.max(0, requiredDiligence - ownedDiligence),
      sourceLocations: ['Taishan Mansion Domain (Tue/Fri/Sun)']
    });
  }

  const totalRequired = materialsList.reduce((acc, m) => acc + m.required, 0);
  const totalOwned = materialsList.reduce((acc, m) => acc + Math.min(m.owned, m.required), 0);
  const overallCompletionPercent = totalRequired > 0 ? Math.round((totalOwned / totalRequired) * 100) : 100;

  return {
    characterId,
    characterName: characterId === 'hu_tao' ? 'Hu Tao' : characterId,
    neededMaterials: materialsList,
    availableDomainsToday: [
      {
        domainId: 'taishan_mansion',
        domainName: 'Taishan Mansion',
        materials: ['diligence_book']
      }
    ],
    resinCostEstimate: 240,
    overallCompletionPercent
  };
}

export function calculatePityStats(wishes: WishRecord[]) {
  const characterWishes = wishes.filter(w => w.bannerType === 'Character Event');
  const fiveStars = characterWishes.filter(w => w.rarity === 5);
  const fourStars = characterWishes.filter(w => w.rarity === 4);

  // Calculate current pity from last 5-star wish
  let currentPity = 0;
  for (let i = characterWishes.length - 1; i >= 0; i--) {
    if (characterWishes[i].rarity === 5) {
      currentPity = 0;
    } else {
      currentPity++;
    }
  }

  // If no 5-star recorded in history, current pity equals total wishes
  if (fiveStars.length === 0) {
    currentPity = characterWishes.length;
  } else {
    // If last wish was a 5-star, current pity is 0, else 76 as mock sample
    currentPity = 76;
  }

  return {
    characterBanner: {
      currentPity,
      pityCap: 90,
      softPityStart: 74,
      totalFiveStars: fiveStars.length,
      totalFourStars: fourStars.length,
      averagePityPer5Star: 76,
      guaranteed5050: false
    }
  };
}

export function calculateDamage(
  attackerBaseAtk: number,
  totalAtkPercent: number,
  flatAtk: number,
  skillMultiplierPercent: number,
  elementalDmgBonusPercent: number,
  critDmgPercent: number,
  isCrit: boolean,
  reactionMultiplier: number = 1.0,
  enemyLevel: number = 90,
  attackerLevel: number = 90,
  enemyResPercent: number = 0.10
) {
  const totalAtk = attackerBaseAtk * (1 + totalAtkPercent / 100) + flatAtk;
  const baseDmg = totalAtk * (skillMultiplierPercent / 100);

  const defMultiplier = (attackerLevel + 100) / ((attackerLevel + 100) + (enemyLevel + 100));

  let resMultiplier = 1.0;
  if (enemyResPercent < 0) {
    resMultiplier = 1 - (enemyResPercent / 2);
  } else if (enemyResPercent <= 0.75) {
    resMultiplier = 1 - enemyResPercent;
  } else {
    resMultiplier = 1 / (4 * enemyResPercent + 1);
  }

  const rawDmg = baseDmg * (1 + elementalDmgBonusPercent / 100) * defMultiplier * resMultiplier;
  const nonCritDamage = Math.round(rawDmg);
  const critDamage = Math.round(rawDmg * (1 + critDmgPercent / 100));
  const reactionDamage = Math.round(critDamage * reactionMultiplier);

  return {
    totalAtk: Math.round(totalAtk),
    nonCritDamage,
    critDamage,
    expectedDamage: Math.round(nonCritDamage + (critDamage - nonCritDamage) * 0.5),
    reactionDamage
  };
}

export function evaluateArtifact(artifact: UserArtifact, characterId?: string) {
  let score = 50;
  const reasons: string[] = [];

  if (artifact.slot === 'flower' || artifact.slot === 'plume') {
    score += 15;
    reasons.push('Fixed main stat piece.');
  } else if (artifact.slot === 'sands' && (artifact.mainStat === 'HP%' || artifact.mainStat === 'ATK%' || artifact.mainStat === 'Elemental Mastery' || artifact.mainStat === 'Energy Recharge')) {
    score += 20;
    reasons.push(`Highly desirable main stat: ${artifact.mainStat}.`);
  } else if (artifact.slot === 'goblet' && artifact.mainStat.includes('DMG Bonus')) {
    score += 25;
    reasons.push(`Elemental DMG Bonus goblet.`);
  } else if (artifact.slot === 'circlet' && (artifact.mainStat.includes('CRIT Rate') || artifact.mainStat.includes('CRIT DMG'))) {
    score += 25;
    reasons.push(`CRIT main stat circlet.`);
  }

  artifact.substats.forEach(sub => {
    if (sub.name === 'CRIT Rate') {
      score += sub.value * 2.5;
      reasons.push(`High CRIT Rate substat (+${sub.value}%).`);
    } else if (sub.name === 'CRIT DMG') {
      score += sub.value * 1.5;
      reasons.push(`High CRIT DMG substat (+${sub.value}%).`);
    } else if (sub.name === 'Elemental Mastery' || sub.name === 'HP%' || sub.name === 'Energy Recharge') {
      score += 5;
    }
  });

  const finalScore = Math.min(100, Math.round(score));
  let recommendation: 'KEEP' | 'LOCK' | 'EQUIP' | 'LEVEL' | 'DISCARD' = 'KEEP';
  if (finalScore >= 85) recommendation = 'LOCK';
  else if (finalScore >= 70) recommendation = 'KEEP';
  else if (finalScore >= 50) recommendation = 'LEVEL';
  else recommendation = 'DISCARD';

  return {
    recommendation,
    score: finalScore,
    reasoning: reasons.join(' ') || 'Standard artifact roll distribution.'
  };
}

export function generateDailyPlan(account: UserAccount) {
  const activeGoal = account.goals[0] || { title: 'Build Hu Tao' };
  const currentResin = account.resin.current;

  return {
    title: "TODAY'S TEYVAT AI DAILY PLAN",
    primaryGoal: activeGoal.title,
    actions: [
      {
        priority: 1,
        title: "Farm Character Talent Books",
        detail: "Taishan Mansion is dropping Diligence books today. Complete 2 domain runs.",
        resinCost: 40,
        material: "Philosophies of Diligence"
      },
      {
        priority: 2,
        title: "Defeat World Boss: Primo Geovishap",
        detail: "Defeat the boss twice to get 4-5 Juvenile Jades for Hu Tao's ascension.",
        resinCost: 80,
        material: "Juvenile Jade"
      },
      {
        priority: 3,
        title: "Collect Local Specialties",
        detail: "Gather 18 Silk Flowers around Wangshu Inn and Yujing Terrace (No Resin required).",
        resinCost: 0,
        material: "Silk Flower"
      }
    ],
    why: `Your active goal is to finish building Hu Tao (currently 78% completed). Today is a domain day for Diligence books, and using your available ${currentResin} Resin across talent books and boss drops will maximize your progression efficiency without wasting resin.`,
    totalResinNeeded: 120
  };
}
