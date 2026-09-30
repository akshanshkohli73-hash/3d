import { Weapon, ArtifactSet, Material, Domain, Boss, Quest, Achievement, MapMarker, GameVersion, LoreEntry } from '../types';

export const WEAPONS_DATA: Weapon[] = [
  {
    id: 'staff_of_homa',
    name: 'Staff of Homa',
    type: 'Polearm',
    rarity: 5,
    baseAtk: 608,
    secondaryStat: 'CRIT DMG',
    secondaryStatValue: '66.2%',
    passiveName: 'Reckless Cinnabar',
    passiveDescription: 'HP increased by 20%. Additionally, provides an ATK Bonus based on 0.8% of the wielder\'s Max HP. When HP is less than 50%, this ATK bonus is increased by an additional 1% of Max HP.',
    ascensionMaterials: [{ materialId: 'grain_of_aerosiderite', amount: 5 }],
    recommendedCharacters: ['hu_tao', 'zhongli', 'xiangling'],
    releaseVersion: '1.3'
  },
  {
    id: 'engulfing_lightning',
    name: 'Engulfing Lightning',
    type: 'Polearm',
    rarity: 5,
    baseAtk: 608,
    secondaryStat: 'Energy Recharge',
    secondaryStatValue: '55.1%',
    passiveName: 'Timeless Dream: Eternal Stove',
    passiveDescription: 'ATK increased by 28% of Energy Recharge over the base 100%. Gain 30% Energy Recharge for 12s after using an Elemental Burst.',
    ascensionMaterials: [{ materialId: 'mask_of_the_wicked_lieutenant', amount: 5 }],
    recommendedCharacters: ['raiden_shogun', 'xiangling'],
    releaseVersion: '2.1'
  },
  {
    id: 'the_catch',
    name: 'The Catch',
    type: 'Polearm',
    rarity: 4,
    baseAtk: 510,
    secondaryStat: 'Energy Recharge',
    secondaryStatValue: '45.9%',
    passiveName: 'Shanty',
    passiveDescription: 'Increases Elemental Burst DMG by 16% and Elemental Burst CRIT Rate by 6%.',
    ascensionMaterials: [{ materialId: 'mask_of_the_wicked_lieutenant', amount: 3 }],
    recommendedCharacters: ['raiden_shogun', 'xiangling'],
    releaseVersion: '2.1'
  },
  {
    id: 'aquila_favonia',
    name: 'Aquila Favonia',
    type: 'Sword',
    rarity: 5,
    baseAtk: 674,
    secondaryStat: 'Physical DMG Bonus',
    secondaryStatValue: '41.3%',
    passiveName: 'Falcon\'s Defiance',
    passiveDescription: 'ATK is increased by 20%. Triggers on taking DMG: soul of the Falcon awakens, restoring HP equal to 100% of ATK and dealing 200% ATK as DMG.',
    ascensionMaterials: [],
    recommendedCharacters: ['bennett'],
    releaseVersion: '1.0'
  },
  {
    id: 'sacrificial_sword',
    name: 'Sacrificial Sword',
    type: 'Sword',
    rarity: 4,
    baseAtk: 454,
    secondaryStat: 'Energy Recharge',
    secondaryStatValue: '61.3%',
    passiveName: 'Composed',
    passiveDescription: 'After dealing damage to an opponent with an Elemental Skill, the skill has a 40% chance to end its own CD.',
    ascensionMaterials: [],
    recommendedCharacters: ['xingqiu', 'kazuha'],
    releaseVersion: '1.0'
  }
];

export const ARTIFACT_SETS_DATA: ArtifactSet[] = [
  {
    id: 'crimson_witch_of_flames',
    name: 'Crimson Witch of Flames',
    rarity: [4, 5],
    twoPieceBonus: 'Pyro DMG Bonus +15%',
    fourPieceBonus: 'Increases Overloaded and Burning DMG by 40%. Increases Vaporize and Melt DMG by 15%. Using Elemental Skill increases 2-Piece Set Effects by 50% for 10s (max 3 stacks).',
    recommendedRoles: ['Pyro Main DPS'],
    pieces: {
      flower: 'Witch\'s Flower of Blaze',
      plume: 'Witch\'s Ever-Burning Feather',
      sands: 'Witch\'s End Time',
      goblet: 'Witch\'s Heart Flames',
      circlet: 'Witch\'s Scorching Hat'
    }
  },
  {
    id: 'emblem_of_severed_fate',
    name: 'Emblem of Severed Fate',
    rarity: [4, 5],
    twoPieceBonus: 'Energy Recharge +20%',
    fourPieceBonus: 'Increases Elemental Burst DMG by 25% of Energy Recharge. A maximum of 75% bonus DMG can be obtained in this way.',
    recommendedRoles: ['Sub-DPS', 'Burst DPS'],
    pieces: {
      flower: 'Magnificent Tsuba',
      plume: 'Sundered Feather',
      sands: 'Storm Cage',
      goblet: 'Scarlet Vessel',
      circlet: 'Ornate Kabuto'
    }
  },
  {
    id: 'viridescent_venerer',
    name: 'Viridescent Venerer',
    rarity: [4, 5],
    twoPieceBonus: 'Anemo DMG Bonus +15%',
    fourPieceBonus: 'Increases Swirl DMG by 60%. Decreases opponent\'s Elemental RES to the element infused in the Swirl by 40% for 10s.',
    recommendedRoles: ['Anemo Support'],
    pieces: {
      flower: 'In Remembrance of Viridescent Fields',
      plume: 'Viridescent Arrow Feather',
      sands: 'Viridescent Venerer\'s Determination',
      goblet: 'Viridescent Vessel',
      circlet: 'Viridescent Venerer\'s Diadem'
    }
  },
  {
    id: 'golden_troupe',
    name: 'Golden Troupe',
    rarity: [4, 5],
    twoPieceBonus: 'Increases Elemental Skill DMG by 20%.',
    fourPieceBonus: 'Increases Elemental Skill DMG by 25%. Additionally, when not on the field, Elemental Skill DMG is increased by a further 25%.',
    recommendedRoles: ['Off-field Sub-DPS'],
    pieces: {
      flower: 'Golden Song\'s Variation',
      plume: 'Golden Bird\'s Shed Feathers',
      sands: 'Golden Era\'s Hourglass',
      goblet: 'Golden Night\'s Goblet',
      circlet: 'Golden Troupe\'s Crown'
    }
  }
];

export const MATERIALS_DATA: Material[] = [
  { id: 'silk_flower', name: 'Silk Flower', category: 'Local Specialty', rarity: 1, region: 'Liyue', sourceLocations: ['Liyue Harbor', 'Wangshu Inn'], description: 'A crimson flower that blooms like silk clouds in Liyue.' },
  { id: 'jueyun_chili', name: 'Jueyun Chili', category: 'Local Specialty', rarity: 1, region: 'Liyue', sourceLocations: ['Qingce Village', 'Jueyun Karst'], description: 'A spicy plant native to Liyue.' },
  { id: 'tenkumo_fruit', name: 'Tenkumo Fruit', category: 'Local Specialty', rarity: 1, region: 'Inazuma', sourceLocations: ['Seirai Island'], description: 'Fruit of the Tenkumo Grass growing on Seirai Island.' },
  { id: 'diligence_book', name: 'Philosophies of Diligence', category: 'Talent Book', rarity: 4, region: 'Liyue', domainDays: ['Tuesday', 'Friday', 'Sunday'], sourceLocations: ['Taishan Mansion Domain'], description: 'Talent level-up material for Liyue characters.' },
  { id: 'juvenile_jade', name: 'Juvenile Jade', category: 'Boss Drop', rarity: 4, region: 'Liyue', sourceLocations: ['Primo Geovishap'], description: 'A piece of elemental jade taken from the Primo Geovishap.' },
  { id: 'storm_beads', name: 'Storm Beads', category: 'Boss Drop', rarity: 4, region: 'Inazuma', sourceLocations: ['Thunder Manifestation'], description: 'A bead dropped by Thunder Manifestation.' },
  { id: 'foul_legacy_shard', name: 'Shard of a Foul Legacy', category: 'Weekly Boss Drop', rarity: 5, region: 'Liyue', sourceLocations: ['Enter the Golden House (Childe)'], description: 'A power shard from Childe\'s Foul Legacy.' },
  { id: 'mora', name: 'Mora', category: 'Currency', rarity: 3, sourceLocations: ['Blossom of Wealth', 'Quests'], description: 'The universal currency of Teyvat.' },
  { id: 'hero_wit', name: 'Hero\'s Wit', category: 'EXP', rarity: 4, sourceLocations: ['Blossom of Revelation', 'Events'], description: 'Grants 20,000 Character EXP.' }
];

export const DOMAINS_DATA: Domain[] = [
  {
    id: 'taishan_mansion',
    name: 'Taishan Mansion',
    type: 'Talent',
    region: 'Liyue',
    location: [45, 62],
    drops: {
      days: {
        Monday: ['prosperous_book'],
        Tuesday: ['diligence_book'],
        Wednesday: ['gold_book'],
        Thursday: ['prosperous_book'],
        Friday: ['diligence_book'],
        Saturday: ['gold_book'],
        Sunday: ['prosperous_book', 'diligence_book', 'gold_book']
      }
    }
  },
  {
    id: 'momiji_dyed_court',
    name: 'Momiji-Dyed Court',
    type: 'Artifact',
    region: 'Inazuma',
    location: [72, 45],
    drops: {
      days: {
        Monday: ['emblem_of_severed_fate', 'shimenawa_reminiscence'],
        Tuesday: ['emblem_of_severed_fate', 'shimenawa_reminiscence'],
        Wednesday: ['emblem_of_severed_fate', 'shimenawa_reminiscence'],
        Thursday: ['emblem_of_severed_fate', 'shimenawa_reminiscence'],
        Friday: ['emblem_of_severed_fate', 'shimenawa_reminiscence'],
        Saturday: ['emblem_of_severed_fate', 'shimenawa_reminiscence'],
        Sunday: ['emblem_of_severed_fate', 'shimenawa_reminiscence']
      }
    }
  }
];

export const BOSSES_DATA: Boss[] = [
  {
    id: 'primo_geovishap',
    name: 'Primo Geovishap',
    type: 'World Boss',
    region: 'Liyue',
    location: [42, 68],
    drops: ['juvenile_jade'],
    mechanics: ['Elemental Shield Reflection', 'Primordial Shower'],
    recommendedElements: ['Geo', 'Anemo']
  },
  {
    id: 'childe_golden_house',
    name: 'Enter the Golden House',
    type: 'Weekly Boss',
    region: 'Liyue',
    location: [50, 75],
    drops: ['foul_legacy_shard', 'shadow_of_the_devourer'],
    mechanics: ['3 Phases: Hydro, Electro, Foul Legacy', 'Riptide status application'],
    recommendedElements: ['Pyro', 'Dendro', 'Cryo']
  }
];

export const QUESTS_DATA: Quest[] = [
  { id: 'archon_ prologue_1', title: 'The Outlander Who Caught the Wind', category: 'Archon', region: 'Mondstadt', prerequisites: [], unlocks: ['archon_prologue_2'], rewards: { primogems: 60, exp: 500, mora: 30000 }, description: 'Arrive in Mondstadt and encounter the Anemo Dragon Dvalin.' },
  { id: 'archon_liyue_1', title: 'Of the Land Amidst Monoliths', category: 'Archon', region: 'Liyue', prerequisites: ['archon_prologue_1'], unlocks: [], rewards: { primogems: 60, exp: 600, mora: 40000 }, description: 'Attend the Rite of Descension in Liyue Harbor.' }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: 'ach_1', title: 'Continental Explorer: Liyue', category: 'Exploration', description: 'Uncover all teleport waypoints in Liyue.', primogems: 10, hidden: false, version: '1.0' },
  { id: 'ach_2', title: 'The Secret of the Harbor', category: 'Wangsheng', description: 'Complete Hu Tao\'s story quest.', primogems: 5, hidden: true, version: '1.3' }
];

export const MAP_MARKERS_DATA: MapMarker[] = [
  { id: 'marker_silk_1', title: 'Silk Flower Node 1', category: 'LocalSpecialty', region: 'Liyue', location: [48.2, 73.1], description: 'Near Yujing Terrace', relatedMaterialId: 'silk_flower', relatedCharacterId: 'hu_tao' },
  { id: 'marker_primo_1', title: 'Primo Geovishap Lair', category: 'Boss', region: 'Liyue', location: [42.1, 68.4], description: 'Underground cavern in Tianqiu Valley', relatedMaterialId: 'juvenile_jade', relatedCharacterId: 'hu_tao' },
  { id: 'marker_taishan_1', title: 'Taishan Mansion', category: 'Domain', region: 'Liyue', location: [45.0, 62.2], description: 'Talent Material Domain', relatedMaterialId: 'diligence_book', relatedCharacterId: 'hu_tao' }
];

export const GAME_VERSIONS_DATA: GameVersion[] = [
  { version: '5.2', releaseDate: '2024-11-20', title: 'Tapestry of Spirit and Flame', highlights: ['Natlan Chasca release', 'Ororon release', 'Natlan exploration expansion'], newCharacters: ['Chasca', 'Ororon'], newWeapons: ['Astral Vulture\'s Crimson Plumage'], patchNotes: 'Optimized domain artifact filtering and resin cap adjustments.' },
  { version: '5.0', releaseDate: '2024-08-28', title: 'Flowers Resplendent on the Sun-Scorched Sojourn', highlights: ['Natlan Region Release', 'Mualani, Kinich, Kachina releases', 'Saurian transformation mechanics'], newCharacters: ['Mualani', 'Kinich', 'Kachina'], newWeapons: ['Surf\'s Up', 'Fang of the Mountain King'], patchNotes: 'Major UI overhaul, world level 9 added, artifact transmuter introduced.' }
];

export const LORE_DATA: LoreEntry[] = [
  { id: 'lore_wang_sheng', title: 'Wangsheng Funeral Parlor', category: 'Factions', summary: 'The ancient funeral parlor of Liyue, maintaining the balance between life and death for 77 generations.', details: 'Founded during the Archon War to cleanse divine plague corpses. Currently led by Hu Tao.', canonStatus: 'Canon', relatedIds: ['hu_tao', 'zhongli'] },
  { id: 'lore_guoba', title: 'Guoba & Marchosius', category: 'Historical Events', summary: 'The God of the Stove who sacrificed his wisdom and power to calm natural disasters in Liyue.', details: 'Marchosius shrunk and became the adorable Guoba who travels alongside Xiangling.', canonStatus: 'Canon', relatedIds: ['xiangling'] }
];
