import { UserAccount, UserArtifact, UserCharacter, UserGoal } from '../types';

export const INITIAL_USER_ACCOUNT: UserAccount = {
  uid: '700123456',
  server: 'NA',
  adventureRank: 56,
  worldLevel: 8,
  resin: {
    current: 120,
    max: 200,
    lastUpdated: new Date().toISOString()
  },
  primogems: 14200,
  intertwinedFates: 24,
  acquaintFates: 8,
  characters: [
    {
      characterId: 'hu_tao',
      level: 80,
      ascension: 5,
      constellation: 1,
      talents: { normal: 8, skill: 8, burst: 6 },
      equippedWeaponId: 'staff_homa_1',
      equippedArtifactIds: ['art_1', 'art_2', 'art_3'],
      isBuilt: false,
      notes: 'Needs 80+ ascension materials and better Crit DMG Circlet'
    },
    {
      characterId: 'raiden_shogun',
      level: 90,
      ascension: 6,
      constellation: 2,
      talents: { normal: 6, skill: 9, burst: 10 },
      equippedWeaponId: 'engulfing_1',
      equippedArtifactIds: [],
      isBuilt: true
    },
    {
      characterId: 'furina',
      level: 90,
      ascension: 6,
      constellation: 0,
      talents: { normal: 1, skill: 10, burst: 10 },
      equippedWeaponId: '',
      equippedArtifactIds: [],
      isBuilt: true
    },
    {
      characterId: 'kazuha',
      level: 90,
      ascension: 6,
      constellation: 0,
      talents: { normal: 1, skill: 8, burst: 8 },
      equippedWeaponId: '',
      equippedArtifactIds: [],
      isBuilt: true
    },
    {
      characterId: 'bennett',
      level: 80,
      ascension: 5,
      constellation: 5,
      talents: { normal: 1, skill: 6, burst: 10 },
      equippedWeaponId: 'aquila_1',
      equippedArtifactIds: [],
      isBuilt: true
    },
    {
      characterId: 'xiangling',
      level: 80,
      ascension: 5,
      constellation: 6,
      talents: { normal: 1, skill: 6, burst: 8 },
      equippedWeaponId: 'catch_1',
      equippedArtifactIds: [],
      isBuilt: false
    },
    {
      characterId: 'xingqiu',
      level: 80,
      ascension: 5,
      constellation: 6,
      talents: { normal: 1, skill: 8, burst: 8 },
      equippedWeaponId: 'sac_1',
      equippedArtifactIds: [],
      isBuilt: true
    }
  ],
  weapons: [
    { id: 'staff_homa_1', weaponId: 'staff_of_homa', level: 90, refinement: 1, equippedCharacterId: 'hu_tao', locked: true },
    { id: 'engulfing_1', weaponId: 'engulfing_lightning', level: 90, refinement: 1, equippedCharacterId: 'raiden_shogun', locked: true },
    { id: 'catch_1', weaponId: 'the_catch', level: 80, refinement: 5, equippedCharacterId: 'xiangling', locked: true },
    { id: 'aquila_1', weaponId: 'aquila_favonia', level: 90, refinement: 1, equippedCharacterId: 'bennett', locked: true },
    { id: 'sac_1', weaponId: 'sacrificial_sword', level: 80, refinement: 4, equippedCharacterId: 'xingqiu', locked: true }
  ],
  artifacts: [
    {
      id: 'art_1',
      setId: 'crimson_witch_of_flames',
      slot: 'flower',
      mainStat: 'HP',
      mainStatValue: 4780,
      substats: [
        { name: 'CRIT Rate', value: 7.0 },
        { name: 'CRIT DMG', value: 21.0 },
        { name: 'HP%', value: 9.3 },
        { name: 'Elemental Mastery', value: 23 }
      ],
      level: 20,
      rarity: 5,
      equippedCharacterId: 'hu_tao',
      locked: true,
      evaluation: { recommendation: 'KEEP', score: 94, reasoning: 'God tier rolls for Hu Tao with CRIT Rate, CRIT DMG, and EM.' }
    },
    {
      id: 'art_2',
      setId: 'crimson_witch_of_flames',
      slot: 'sands',
      mainStat: 'HP%',
      mainStatValue: 46.6,
      substats: [
        { name: 'CRIT Rate', value: 3.9 },
        { name: 'CRIT DMG', value: 14.8 },
        { name: 'DEF', value: 39 },
        { name: 'ATK', value: 18 }
      ],
      level: 20,
      rarity: 5,
      equippedCharacterId: 'hu_tao',
      locked: true,
      evaluation: { recommendation: 'EQUIP', score: 78, reasoning: 'Correct main stat with decent crit substats.' }
    },
    {
      id: 'art_3',
      setId: 'crimson_witch_of_flames',
      slot: 'goblet',
      mainStat: 'Pyro DMG Bonus',
      mainStatValue: 46.6,
      substats: [
        { name: 'CRIT Rate', value: 6.2 },
        { name: 'Energy Recharge', value: 11.0 },
        { name: 'HP', value: 508 },
        { name: 'DEF%', value: 12.4 }
      ],
      level: 20,
      rarity: 5,
      equippedCharacterId: 'hu_tao',
      locked: true,
      evaluation: { recommendation: 'KEEP', score: 72, reasoning: 'On-set Pyro goblet with moderate Crit Rate.' }
    }
  ],
  inventory: {
    silk_flower: 150, // needs 168 (missing 18)
    juvenile_jade: 38, // needs 46 (missing 8)
    nectar: 80,
    diligence_book: 42, // needs 114
    foul_legacy_shard: 12,
    mora: 1240000,
    hero_wit: 180
  },
  goals: [
    {
      id: 'goal_hu_tao_max',
      title: 'Build Hu Tao',
      characterId: 'hu_tao',
      type: 'Build Character',
      targetLevel: 90,
      progressPercent: 78,
      isBlocked: true,
      blockedBy: ['18 Silk Flowers', '8 Juvenile Jades', '72 Philosophies of Diligence'],
      priority: 'High',
      createdDate: '2026-02-10'
    }
  ],
  wishes: [
    { id: 'w_101', timestamp: '2026-02-01', bannerType: 'Character Event', itemType: 'Character', itemName: 'Hu Tao', rarity: 5, pullNumber: 76, isPity5Star: true },
    { id: 'w_102', timestamp: '2026-02-02', bannerType: 'Character Event', itemType: 'Weapon', itemName: 'Favonius Lance', rarity: 4, pullNumber: 4, isPity5Star: false },
    { id: 'w_103', timestamp: '2026-02-05', bannerType: 'Character Event', itemType: 'Character', itemName: 'Xiangling', rarity: 4, pullNumber: 14, isPity5Star: false }
  ],
  completedQuestIds: ['archon_prologue_1'],
  completedAchievementIds: ['ach_1'],
  collectedMapMarkerIds: [],
  savedRoutes: [
    {
      id: 'route_hu_tao_1',
      title: 'Liyue Silk Flower Efficient Route',
      markerIds: ['marker_silk_1'],
      materialId: 'silk_flower'
    }
  ],
  aiMemories: [
    { id: 'mem_1', key: 'favorite_character', value: 'Hu Tao', createdAt: '2026-02-01' },
    { id: 'mem_2', key: 'playstyle', value: 'Vaporize Hypercarry', createdAt: '2026-02-01' }
  ],
  preferences: {
    mainGoal: 'Build Hu Tao to 90/90 and 10/10/10 talents',
    playstyle: 'Optimized',
    explanationLevel: 'Normal',
    preferredAiProvider: 'Mock',
    publicProfile: false
  }
};
