// TEYVAT AI Core Type Definitions

export type ElementType = 'Pyro' | 'Hydro' | 'Anemo' | 'Electro' | 'Dendro' | 'Cryo' | 'Geo';
export type WeaponType = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type RegionType = 'Mondstadt' | 'Liyue' | 'Inazuma' | 'Sumeru' | 'Fontaine' | 'Natlan' | 'Snezhnaya' | 'Khaenri\'ah';
export type RarityType = 4 | 5;

// --- GAME DATA TYPES ---

export interface Character {
  id: string;
  name: string;
  element: ElementType;
  weaponType: WeaponType;
  rarity: RarityType;
  region: RegionType;
  releaseVersion: string;
  releaseDate: string;
  birthday: string; // e.g. "07-15"
  description: string;
  baseStats: {
    hp: number;
    atk: number;
    def: number;
    critRate: number; // e.g. 0.05
    critDmg: number;  // e.g. 0.50
    specialStat: string; // e.g. "CRIT DMG" or "Elemental Mastery"
    specialStatValue: number;
  };
  skills: {
    normalAttack: { name: string; description: string };
    elementalSkill: { name: string; description: string; cd: number };
    elementalBurst: { name: string; description: string; energyCost: number; cd: number };
  };
  passives: Array<{ name: string; description: string; unlockLevel: number }>;
  constellations: Array<{ level: number; name: string; description: string }>;
  ascensionMaterials: Array<{ materialId: string; amount: number; minLevel: number }>;
  talentMaterials: Array<{ materialId: string; amount: number; levelReq: number; domainDays: string[] }>;
  recommendedRoles: ('Main DPS' | 'Sub-DPS' | 'Support' | 'Shielder' | 'Healer')[];
  recommendedWeapons: string[]; // weaponIds
  recommendedArtifactSets: {
    fourPiece?: string;
    twoPieceCombo?: [string, string];
    mainStats: {
      sands: string[];
      goblet: string[];
      circlet: string[];
    };
    substatsPriority: string[];
  };
  source: string;
  version: string;
  lastUpdated: string;
}

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  rarity: RarityType;
  baseAtk: number;
  secondaryStat: string;
  secondaryStatValue: string;
  passiveName: string;
  passiveDescription: string;
  ascensionMaterials: Array<{ materialId: string; amount: number }>;
  recommendedCharacters: string[]; // characterIds
  releaseVersion: string;
}

export interface ArtifactSet {
  id: string;
  name: string;
  rarity: RarityType[];
  twoPieceBonus: string;
  fourPieceBonus: string;
  recommendedRoles: string[];
  pieces: {
    flower: string;
    plume: string;
    sands: string;
    goblet: string;
    circlet: string;
  };
}

export interface Material {
  id: string;
  name: string;
  category: 'Local Specialty' | 'Boss Drop' | 'Talent Book' | 'Weapon Material' | 'Common Drop' | 'Weekly Boss Drop' | 'Currency' | 'EXP';
  rarity: number;
  region?: RegionType;
  sourceLocations: string[];
  domainDays?: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
  description: string;
  icon?: string;
}

export interface Domain {
  id: string;
  name: string;
  type: 'Talent' | 'Weapon Ascension' | 'Artifact';
  region: RegionType;
  location: [number, number]; // map coords [x, y]
  drops: {
    days: Record<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday', string[]>; // materialIds
  };
}

export interface Boss {
  id: string;
  name: string;
  type: 'World Boss' | 'Weekly Boss';
  region: RegionType;
  location: [number, number];
  drops: string[]; // materialIds
  mechanics: string[];
  recommendedElements: ElementType[];
}

export interface Quest {
  id: string;
  title: string;
  category: 'Archon' | 'Story' | 'World' | 'Hangout' | 'Event' | 'Hidden';
  region: RegionType;
  prerequisites: string[]; // questIds
  unlocks: string[];
  rewards: { primogems: number; exp: number; mora: number; items?: string[] };
  description: string;
  isCompleted?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  description: string;
  primogems: number;
  hidden: boolean;
  version: string;
  isCompleted?: boolean;
}

export interface MapMarker {
  id: string;
  title: string;
  category: 'Statue' | 'Teleport' | 'Domain' | 'Boss' | 'LocalSpecialty' | 'Oculi' | 'Chest' | 'Puzzle' | 'WorldQuest';
  region: RegionType;
  location: [number, number]; // canvas / leaflet percentage coordinates [x, y]
  description?: string;
  relatedMaterialId?: string;
  relatedCharacterId?: string;
}

export interface GameVersion {
  version: string;
  releaseDate: string;
  title: string;
  highlights: string[];
  newCharacters: string[];
  newWeapons: string[];
  patchNotes: string;
}

export interface LoreEntry {
  id: string;
  title: string;
  category: 'Characters' | 'Regions' | 'Factions' | 'Historical Events' | 'Artifact Lore' | 'Books';
  summary: string;
  details: string;
  canonStatus: 'Canon' | 'In-Game Speculation' | 'Developer Note';
  relatedIds: string[];
}

// --- ACCOUNT STATE TYPES ---

export interface UserArtifact {
  id: string;
  setId: string;
  slot: 'flower' | 'plume' | 'sands' | 'goblet' | 'circlet';
  mainStat: string;
  mainStatValue: number;
  substats: Array<{ name: string; value: number }>;
  level: number; // 0 - 20
  rarity: 4 | 5;
  equippedCharacterId?: string;
  locked: boolean;
  evaluation?: {
    recommendation: 'KEEP' | 'LOCK' | 'EQUIP' | 'LEVEL' | 'DISCARD';
    score: number; // 0 - 100
    reasoning: string;
  };
}

export interface UserCharacter {
  characterId: string;
  level: number; // 1-90
  ascension: number; // 0-6
  constellation: number; // 0-6
  talents: { normal: number; skill: number; burst: number };
  equippedWeaponId?: string;
  equippedArtifactIds: string[]; // array of userArtifact ids
  notes?: string;
  isBuilt: boolean;
}

export interface UserWeapon {
  id: string;
  weaponId: string;
  level: number;
  refinement: number; // 1-5
  equippedCharacterId?: string;
  locked: boolean;
}

export interface UserGoal {
  id: string;
  title: string;
  characterId?: string;
  type: 'Build Character' | 'Level Weapon' | 'Farm Artifacts' | 'Triple Crown' | 'Explore Region' | 'Save Primogems';
  targetLevel?: number;
  progressPercent: number; // 0-100
  isBlocked: boolean;
  blockedBy?: string[];
  priority: 'High' | 'Medium' | 'Low';
  createdDate: string;
}

export interface WishRecord {
  id: string;
  timestamp: string;
  bannerType: 'Character Event' | 'Weapon Event' | 'Standard' | 'Beginner';
  itemType: 'Character' | 'Weapon';
  itemName: string;
  rarity: 3 | 4 | 5;
  pullNumber: number; // pity counter at pull
  isPity5Star: boolean;
}

export interface UserAccount {
  uid: string;
  server: 'NA' | 'EU' | 'ASIA' | 'SAR';
  adventureRank: number;
  worldLevel: number;
  resin: { current: number; max: number; lastUpdated: string };
  primogems: number;
  intertwinedFates: number;
  acquaintFates: number;
  characters: UserCharacter[];
  weapons: UserWeapon[];
  artifacts: UserArtifact[];
  inventory: Record<string, number>; // materialId -> amount
  goals: UserGoal[];
  wishes: WishRecord[];
  completedQuestIds: string[];
  completedAchievementIds: string[];
  collectedMapMarkerIds: string[];
  savedRoutes: Array<{
    id: string;
    title: string;
    markerIds: string[];
    materialId?: string;
  }>;
  aiMemories: Array<{
    id: string;
    key: string;
    value: string;
    createdAt: string;
  }>;
  preferences: {
    mainGoal?: string;
    playstyle: 'Casual' | 'Optimized' | 'Theorycraft';
    explanationLevel: 'Quick' | 'Normal' | 'Deep' | 'Teacher' | 'Technical';
    preferredAiProvider: 'OpenRouter' | 'Inception' | 'Gemini' | 'Mock';
    publicProfile: boolean;
  };
}

// --- AI & TOOL TYPES ---

export type AIMode = 'ACCOUNT' | 'BUILDS' | 'TEAMS' | 'FARMING' | 'MAP' | 'QUESTS' | 'BOSSES' | 'ARTIFACTS' | 'WISHES' | 'LORE' | 'MECHANICS' | 'GENERAL';

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system' | 'tool';
  text: string;
  timestamp: string;
  mode?: AIMode;
  toolCalls?: Array<{
    name: string;
    args: Record<string, any>;
    result?: any;
  }>;
  structuredResponse?: {
    answer?: string;
    recommendation?: string;
    reason?: string;
    dataUsed?: string[];
    nextSteps?: string[];
    calculation?: any;
  };
}
