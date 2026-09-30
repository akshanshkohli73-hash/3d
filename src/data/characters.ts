import { Character } from '../types';

export const CHARACTERS_DATA: Character[] = [
  {
    id: 'hu_tao',
    name: 'Hu Tao',
    element: 'Pyro',
    weaponType: 'Polearm',
    rarity: 5,
    region: 'Liyue',
    releaseVersion: '1.3',
    releaseDate: '2021-03-02',
    birthday: '07-15',
    description: 'The 77th Director of the Wangsheng Funeral Parlor, taking over the business at a young age.',
    baseStats: {
      hp: 15552,
      atk: 106,
      def: 876,
      critRate: 0.05,
      critDmg: 0.884,
      specialStat: 'CRIT DMG',
      specialStatValue: 0.384
    },
    skills: {
      normalAttack: {
        name: 'Secret Spear of Wangsheng',
        description: 'Performs up to 6 consecutive spear strikes. Charged Attack consumes stamina to lunge forward, dealing damage to opponents along the way.'
      },
      elementalSkill: {
        name: 'Guide to Afterlife',
        description: 'Consumes a portion of Hu Tao\'s HP to knock back nearby enemies and enter the Paramita Papilio state. Converts Attack DMG to Pyro DMG and boosts ATK based on Max HP.',
        cd: 16
      },
      elementalBurst: {
        name: 'Spirit Soother',
        description: 'Commands a blazing spirit to attack, dealing Pyro DMG in a large AoE. Regenerates HP upon hitting enemies (higher below 50% HP).',
        energyCost: 60,
        cd: 15
      }
    },
    passives: [
      { name: 'Flutter By', description: 'When a Paramita Papilio state ends, all allies in the party (excluding Hu Tao) have their CRIT Rate increased by 12% for 8s.', unlockLevel: 1 },
      { name: 'Sanguine Rogue', description: 'When Hu Tao\'s HP is equal to or less than 50%, her Pyro DMG Bonus is increased by 33%.', unlockLevel: 70 },
      { name: 'The More the Merrier', description: 'When Hu Tao cooks a dish perfectly, she has a 18% chance to receive an additional "Suspicious" dish of the same type.', unlockLevel: 0 }
    ],
    constellations: [
      { level: 1, name: 'Crimson Bouquet', description: 'While in a Paramita Papilio state, Hu Tao\'s Charged Attacks do not consume Stamina.' },
      { level: 2, name: 'Ominous Rainfall', description: 'Increases Blood Blossom DMG by an amount equal to 10% of Hu Tao\'s Max HP at the time the effect is applied.' },
      { level: 3, name: 'Lingering Carmine', description: 'Increases Elemental Skill Level by 3.' },
      { level: 4, name: 'Garden of Eternal Rest', description: 'Upon defeating an opponent affected by Blood Blossom, all nearby party members\' CRIT Rate is increased by 12% for 15s.' },
      { level: 5, name: 'Floral Incense', description: 'Increases Elemental Burst Level by 3.' },
      { level: 6, name: 'Butterfly\'s Embrace', description: 'Triggers when Hu Tao\'s HP drops below 25% or when she suffers a lethal strike: prevents death, boosts All Elemental/Physical RES by 200%, and increases CRIT Rate by 100% for 10s.' }
    ],
    ascensionMaterials: [
      { materialId: 'silk_flower', amount: 168, minLevel: 20 },
      { materialId: 'juvenile_jade', amount: 46, minLevel: 40 },
      { materialId: 'nectar', amount: 36, minLevel: 20 }
    ],
    talentMaterials: [
      { materialId: 'diligence_book', amount: 114, levelReq: 2, domainDays: ['Tuesday', 'Friday', 'Sunday'] },
      { materialId: 'foul_legacy_shard', amount: 18, levelReq: 7, domainDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }
    ],
    recommendedRoles: ['Main DPS'],
    recommendedWeapons: ['staff_of_homa', 'dragon_spine_spear', 'ballad_of_the_fjords', 'deathmatch'],
    recommendedArtifactSets: {
      fourPiece: 'crimson_witch_of_flames',
      twoPieceCombo: ['crimson_witch_of_flames', 'tenacity_of_the_millelith'],
      mainStats: {
        sands: ['HP%', 'Elemental Mastery'],
        goblet: ['Pyro DMG Bonus'],
        circlet: ['CRIT Rate', 'CRIT DMG']
      },
      substatsPriority: ['CRIT Rate', 'CRIT DMG', 'Elemental Mastery', 'HP%', 'ATK%']
    },
    source: 'Official Genshin Records',
    version: '1.3',
    lastUpdated: '2026-02-15'
  },
  {
    id: 'raiden_shogun',
    name: 'Raiden Shogun',
    element: 'Electro',
    weaponType: 'Polearm',
    rarity: 5,
    region: 'Inazuma',
    releaseVersion: '2.1',
    releaseDate: '2021-09-01',
    birthday: '06-26',
    description: 'The Almighty Narukami Ogosho, who promised the people of Inazuma an unchanging Eternity.',
    baseStats: {
      hp: 12907,
      atk: 337,
      def: 789,
      critRate: 0.05,
      critDmg: 0.50,
      specialStat: 'Energy Recharge',
      specialStatValue: 0.32
    },
    skills: {
      normalAttack: {
        name: 'Origin',
        description: 'Performs up to 5 consecutive spear strikes.'
      },
      elementalSkill: {
        name: 'Transcendence: Baleful Omen',
        description: 'Unleashes a segment of her Euthymia, dealing Electro DMG to nearby opponents and granting party members Eye of Stormy Judgment.',
        cd: 10
      },
      elementalBurst: {
        name: 'Secret Art: Musou Shinsetsu',
        description: 'Gathers Chakra Desiderata and unleashes Musou no Hitotachi, entering the Musou Isshin state using her tachi to deal Electro DMG and restore party Energy.',
        energyCost: 90,
        cd: 18
      }
    },
    passives: [
      { name: 'Wishes Unnumbered', description: 'When nearby party members gain Elemental Orbs/Particles, Chakra Desiderata gains 2 Resolve stack.', unlockLevel: 1 },
      { name: 'Enlightened One', description: 'Each 1% above 100% Energy Recharge grants 0.6% Energy Restoration during Musou Isshin and 0.4% Electro DMG Bonus.', unlockLevel: 70 },
      { name: 'All-Preserver', description: 'Mora expended when ascending Swords and Polearms is decreased by 50%.', unlockLevel: 0 }
    ],
    constellations: [
      { level: 1, name: 'Ominous Integrity', description: 'Chakra Desiderata gathers Resolve even faster. Electro elemental burst resolve gained +80%, others +20%.' },
      { level: 2, name: 'Steelbreaker', description: 'While using Musou no Hitotachi and in the Musou Isshin state, the Raiden Shogun\'s attacks ignore 60% of opponents\' DEF.' },
      { level: 3, name: 'Shinkyo Lore', description: 'Increases Elemental Burst Level by 3.' }
    ],
    ascensionMaterials: [
      { materialId: 'tenkumo_fruit', amount: 168, minLevel: 20 },
      { materialId: 'storm_beads', amount: 46, minLevel: 40 },
      { materialId: 'handguard', amount: 36, minLevel: 20 }
    ],
    talentMaterials: [
      { materialId: 'light_book', amount: 114, levelReq: 2, domainDays: ['Wednesday', 'Saturday', 'Sunday'] },
      { materialId: 'molten_moment', amount: 18, levelReq: 7, domainDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }
    ],
    recommendedRoles: ['Main DPS', 'Sub-DPS', 'Support'],
    recommendedWeapons: ['engulfing_lightning', 'the_catch', 'skyward_spine'],
    recommendedArtifactSets: {
      fourPiece: 'emblem_of_severed_fate',
      mainStats: {
        sands: ['Energy Recharge', 'ATK%'],
        goblet: ['Electro DMG Bonus', 'ATK%'],
        circlet: ['CRIT Rate', 'CRIT DMG']
      },
      substatsPriority: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%']
    },
    source: 'Official Genshin Records',
    version: '2.1',
    lastUpdated: '2026-02-15'
  },
  {
    id: 'furina',
    name: 'Furina',
    element: 'Hydro',
    weaponType: 'Sword',
    rarity: 5,
    region: 'Fontaine',
    releaseVersion: '4.2',
    releaseDate: '2023-11-08',
    birthday: '10-13',
    description: 'The absolute focus of stage lights until the curtain falls, former Archon Focalors of Fontaine.',
    baseStats: {
      hp: 15307,
      atk: 244,
      def: 696,
      critRate: 0.242,
      critDmg: 0.50,
      specialStat: 'CRIT Rate',
      specialStatValue: 0.192
    },
    skills: {
      normalAttack: { name: 'Soloist\'s Solicitation', description: 'Performs up to 4 consecutive strikes.' },
      elementalSkill: { name: 'Salon Solitaire', description: 'Invokes either the Salon Members (Ousia) or Singer of Many Waters (Pneuma) to deal Hydro DMG / heal party based on HP changes.', cd: 20 },
      elementalBurst: { name: 'Let the People Rejoice', description: 'Rouses a impulse to revel, dealing AoE Hydro DMG and entering Universal Revelry state (Fanfare points boost party DMG and Healing).', energyCost: 60, cd: 15 }
    },
    passives: [
      { name: 'Endless Waltz', description: 'When active character receives overheal, Furina heals another party member by 2% Max HP every 2s for 4s.', unlockLevel: 1 },
      { name: 'Unheard Confession', description: 'Every 1,000 HP increases Salon Members DMG by 0.7% and reduces Singer healing interval.', unlockLevel: 70 }
    ],
    constellations: [
      { level: 1, name: 'Love Is a Rebellious Bird', description: 'Furina gains 150 Fanfare instantly upon using Burst, increasing Fanfare limit by 100.' },
      { level: 2, name: 'A Woman Adapts Like a Duck in Water', description: 'Fanfare gain increased by 250%. Each point above cap increases Furina\'s Max HP by 0.35%.' }
    ],
    ascensionMaterials: [
      { materialId: 'lakelight_lily', amount: 168, minLevel: 20 },
      { materialId: 'water_drop', amount: 46, minLevel: 40 }
    ],
    talentMaterials: [
      { materialId: 'justice_book', amount: 114, levelReq: 2, domainDays: ['Tuesday', 'Friday', 'Sunday'] }
    ],
    recommendedRoles: ['Sub-DPS', 'Support', 'Healer'],
    recommendedWeapons: ['splendor_of_tranquil_waters', 'fleuve_cendre_ferryman', 'favonius_sword'],
    recommendedArtifactSets: {
      fourPiece: 'golden_troupe',
      mainStats: {
        sands: ['HP%', 'Energy Recharge'],
        goblet: ['HP%', 'Hydro DMG Bonus'],
        circlet: ['CRIT Rate', 'CRIT DMG', 'HP%']
      },
      substatsPriority: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'HP%']
    },
    source: 'Official Genshin Records',
    version: '4.2',
    lastUpdated: '2026-02-15'
  },
  {
    id: 'neuvillette',
    name: 'Neuvillette',
    element: 'Hydro',
    weaponType: 'Catalyst',
    rarity: 5,
    region: 'Fontaine',
    releaseVersion: '4.1',
    releaseDate: '2023-09-27',
    birthday: '11-03',
    description: 'The Chief Justice of Fontaine, known as the Iudex, and the Hydro Dragon Sovereign.',
    baseStats: {
      hp: 14695,
      atk: 208,
      def: 576,
      critRate: 0.05,
      critDmg: 0.884,
      specialStat: 'CRIT DMG',
      specialStatValue: 0.384
    },
    skills: {
      normalAttack: { name: 'As Water Seeks Equilibrium', description: 'Performs Charged Attack: Equitable Judgment, firing a continuous torrent dealing AoE Hydro DMG based on Max HP.' },
      elementalSkill: { name: 'O Tears, I Shall Repay', description: 'Unleashes a Raging Waterfall dealing AoE Hydro DMG and generating 3 Sourcewater Droplets.', cd: 12 },
      elementalBurst: { name: 'O Tides, I Have Returned', description: 'Unleashes waves dealing AoE Hydro DMG and generating 6 Sourcewater Droplets.', energyCost: 70, cd: 18 }
    },
    passives: [
      { name: 'Heir to the Ancient Sea\'s Authority', description: 'Triggers Hydro reactions to gain stacks of Past Draconic Glory, boosting Charged Attack DMG up to 160%.', unlockLevel: 1 },
      { name: 'Discipline of the Supreme Arbitration', description: 'Gain 0.6% Hydro DMG bonus per 1% HP above 30% Max HP (max 30%).', unlockLevel: 70 }
    ],
    constellations: [
      { level: 1, name: 'Venerable Institution', description: 'Gains 1 stack of Past Draconic Glory upon taking the field and increases interruption resistance while charging.' }
    ],
    ascensionMaterials: [
      { materialId: 'lumitoile', amount: 168, minLevel: 20 },
      { materialId: 'fontemer_horn', amount: 46, minLevel: 40 }
    ],
    talentMaterials: [
      { materialId: 'equity_book', amount: 114, levelReq: 2, domainDays: ['Monday', 'Thursday', 'Sunday'] }
    ],
    recommendedRoles: ['Main DPS'],
    recommendedWeapons: ['tome_of_the_eternal_flow', 'sacrificial_jade', 'prototype_amber'],
    recommendedArtifactSets: {
      fourPiece: 'marechaussee_hunter',
      mainStats: {
        sands: ['HP%'],
        goblet: ['Hydro DMG Bonus', 'HP%'],
        circlet: ['CRIT DMG', 'HP%']
      },
      substatsPriority: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
    },
    source: 'Official Genshin Records',
    version: '4.1',
    lastUpdated: '2026-02-15'
  },
  {
    id: 'kazuha',
    name: 'Kaedehara Kazuha',
    element: 'Anemo',
    weaponType: 'Sword',
    rarity: 5,
    region: 'Inazuma',
    releaseVersion: '1.6',
    releaseDate: '2021-06-29',
    birthday: '10-29',
    description: 'A wandering samurai from Inazuma who is currently with the Crux Fleet in Liyue.',
    baseStats: {
      hp: 13348,
      atk: 297,
      def: 807,
      critRate: 0.05,
      critDmg: 0.50,
      specialStat: 'Elemental Mastery',
      specialStatValue: 115.2
    },
    skills: {
      normalAttack: { name: 'Garyu Bladetwork', description: 'Performs up to 5 rapid strikes.' },
      elementalSkill: { name: 'Chihayaburu', description: 'Unleashes a secret technique that pulls objects and opponents toward Kazuha before launching him airborne.', cd: 6 },
      elementalBurst: { name: 'Kazuha Slash', description: 'Unleashes the Autumn Whirlwind field that deals Anemo DMG and absorbs Hydro/Pyro/Cryo/Electro.', energyCost: 60, cd: 15 }
    },
    passives: [
      { name: 'Poetics of Fuubutsu', description: 'Upon triggering Swirl, Kazuha grants party members 0.04% Elemental DMG Bonus per point of EM for 8s.', unlockLevel: 70 }
    ],
    constellations: [
      { level: 1, name: 'Scarlet Hills', description: 'Decreases Chihayaburu CD by 10%. Using Kazuha Slash resets Chihayaburu CD.' }
    ],
    ascensionMaterials: [
      { materialId: 'sea_ganoderma', amount: 168, minLevel: 20 },
      { materialId: 'marionette_core', amount: 46, minLevel: 40 }
    ],
    talentMaterials: [
      { materialId: 'diligence_book', amount: 114, levelReq: 2, domainDays: ['Tuesday', 'Friday', 'Sunday'] }
    ],
    recommendedRoles: ['Support', 'Sub-DPS'],
    recommendedWeapons: ['freedom_sworn', 'iron_sting', 'xiphos_moonlight', 'favonius_sword'],
    recommendedArtifactSets: {
      fourPiece: 'viridescent_venerer',
      mainStats: {
        sands: ['Elemental Mastery', 'Energy Recharge'],
        goblet: ['Elemental Mastery'],
        circlet: ['Elemental Mastery']
      },
      substatsPriority: ['Elemental Mastery', 'Energy Recharge', 'CRIT Rate']
    },
    source: 'Official Genshin Records',
    version: '1.6',
    lastUpdated: '2026-02-15'
  },
  {
    id: 'xiangling',
    name: 'Xiangling',
    element: 'Pyro',
    weaponType: 'Polearm',
    rarity: 4,
    region: 'Liyue',
    releaseVersion: '1.0',
    releaseDate: '2020-09-28',
    birthday: '11-02',
    description: 'A renowned chef from Liyue who is extremely passionate about cooking exotic culinary delicacies.',
    baseStats: {
      hp: 10875,
      atk: 225,
      def: 669,
      critRate: 0.05,
      critDmg: 0.50,
      specialStat: 'Elemental Mastery',
      specialStatValue: 96
    },
    skills: {
      normalAttack: { name: 'Dough-Fu', description: 'Performs up to 5 consecutive spear strikes.' },
      elementalSkill: { name: 'Guoba Attack', description: 'Summons Guoba, who breathes fire continuously dealing Pyro DMG.', cd: 12 },
      elementalBurst: { name: 'Pyronado', description: 'Summons a Pyronado that whirls around the active character dealing Pyro DMG without ICD constraints.', energyCost: 80, cd: 20 }
    },
    passives: [
      { name: 'Beware, It\'s Super Hot!', description: 'Guoba leaving the field drops a chili pepper that increases ATK by 10% for 10s.', unlockLevel: 70 }
    ],
    constellations: [
      { level: 4, name: 'Condensed Pyronado', description: 'Pyronado\'s duration is increased by 40%.' }
    ],
    ascensionMaterials: [{ materialId: 'jueyun_chili', amount: 168, minLevel: 20 }],
    talentMaterials: [{ materialId: 'diligence_book', amount: 114, levelReq: 2, domainDays: ['Tuesday', 'Friday', 'Sunday'] }],
    recommendedRoles: ['Sub-DPS'],
    recommendedWeapons: ['the_catch', 'engulfing_lightning', 'wavebreaker_fin'],
    recommendedArtifactSets: {
      fourPiece: 'emblem_of_severed_fate',
      mainStats: {
        sands: ['Energy Recharge', 'Elemental Mastery', 'ATK%'],
        goblet: ['Pyro DMG Bonus'],
        circlet: ['CRIT Rate', 'CRIT DMG']
      },
      substatsPriority: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'Elemental Mastery', 'ATK%']
    },
    source: 'Official Genshin Records',
    version: '1.0',
    lastUpdated: '2026-02-15'
  },
  {
    id: 'bennett',
    name: 'Bennett',
    element: 'Pyro',
    weaponType: 'Sword',
    rarity: 4,
    region: 'Mondstadt',
    releaseVersion: '1.0',
    releaseDate: '2020-09-28',
    birthday: '02-29',
    description: 'A good-natured adventurer from Mondstadt who is plagued by notoriously terrible bad luck.',
    baseStats: {
      hp: 12397,
      atk: 191,
      def: 771,
      critRate: 0.05,
      critDmg: 0.50,
      specialStat: 'Energy Recharge',
      specialStatValue: 0.267
    },
    skills: {
      normalAttack: { name: 'Strike of Fortune', description: 'Performs up to 5 rapid sword strikes.' },
      elementalSkill: { name: 'Passion Overload', description: 'Concentrates Pyro energy to strike forward.', cd: 5 },
      elementalBurst: { name: 'Fantastic Voyage', description: 'Leaps and slams down dealing Pyro DMG, creating an Inspiration Field that heals up to 70% HP and buffs ATK based on Bennett\'s Base ATK.', energyCost: 60, cd: 15 }
    },
    passives: [
      { name: 'Rekindle', description: 'Decreases Passion Overload CD by 20%.', unlockLevel: 1 }
    ],
    constellations: [
      { level: 1, name: 'Grand Expectation', description: 'Fantastic Voyage\'s ATK boost no longer has HP restriction and gains an additional 20% of Bennett\'s Base ATK.' },
      { level: 6, name: 'Fire Ventures With Me', description: 'Sword, Claymore, or Polearm characters inside Fantastic Voyage gain 15% Pyro DMG and Pyro Infusion.' }
    ],
    ascensionMaterials: [{ materialId: 'windwheel_aster', amount: 168, minLevel: 20 }],
    talentMaterials: [{ materialId: 'resistance_book', amount: 114, levelReq: 2, domainDays: ['Tuesday', 'Friday', 'Sunday'] }],
    recommendedRoles: ['Support', 'Healer'],
    recommendedWeapons: ['aquila_favonia', 'sapwood_blade', 'favonius_sword'],
    recommendedArtifactSets: {
      fourPiece: 'noblesse_oblige',
      mainStats: {
        sands: ['Energy Recharge', 'HP%'],
        goblet: ['HP%'],
        circlet: ['Healing Bonus', 'HP%']
      },
      substatsPriority: ['Energy Recharge', 'HP%', 'CRIT Rate']
    },
    source: 'Official Genshin Records',
    version: '1.0',
    lastUpdated: '2026-02-15'
  },
  {
    id: 'xingqiu',
    name: 'Xingqiu',
    element: 'Hydro',
    weaponType: 'Sword',
    rarity: 4,
    region: 'Liyue',
    releaseVersion: '1.0',
    releaseDate: '2020-09-28',
    birthday: '10-09',
    description: 'The second son of the Feiyun Commerce Guild, a practitioner of the Guhua Martial Arts.',
    baseStats: {
      hp: 10222,
      atk: 202,
      def: 758,
      critRate: 0.05,
      critDmg: 0.50,
      specialStat: 'ATK%',
      specialStatValue: 0.24
    },
    skills: {
      normalAttack: { name: 'Guhua Style', description: 'Performs up to 5 rapid strikes.' },
      elementalSkill: { name: 'Guhua Sword: Fatal Rainscreen', description: 'Performs twin strikes dealing Hydro DMG and creating Rain Swords that reduce damage taken.', cd: 21 },
      elementalBurst: { name: 'Guhua Sword: Raincutter', description: 'Initiates Rainbow Sword attacks alongside normal attacks dealing Hydro DMG continuously.', energyCost: 80, cd: 20 }
    },
    passives: [
      { name: 'Hydropathic', description: 'When a Rain Sword is shattered or expires, heals the active character based on 6% Max HP.', unlockLevel: 1 }
    ],
    constellations: [
      { level: 6, name: 'Hence, Call Them Myriad', description: 'Every 2 Rainsword sword surges greatly enhances the 3rd, restoring 3 Energy to Xingqiu.' }
    ],
    ascensionMaterials: [{ materialId: 'silk_flower', amount: 168, minLevel: 20 }],
    talentMaterials: [{ materialId: 'gold_book', amount: 114, levelReq: 2, domainDays: ['Wednesday', 'Saturday', 'Sunday'] }],
    recommendedRoles: ['Sub-DPS', 'Support'],
    recommendedWeapons: ['sacrificial_sword', 'favonius_sword'],
    recommendedArtifactSets: {
      fourPiece: 'emblem_of_severed_fate',
      mainStats: {
        sands: ['Energy Recharge', 'ATK%'],
        goblet: ['Hydro DMG Bonus'],
        circlet: ['CRIT Rate', 'CRIT DMG']
      },
      substatsPriority: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%']
    },
    source: 'Official Genshin Records',
    version: '1.0',
    lastUpdated: '2026-02-15'
  },
  {
    id: 'nahida',
    name: 'Nahida',
    element: 'Dendro',
    weaponType: 'Catalyst',
    rarity: 5,
    region: 'Sumeru',
    releaseVersion: '3.2',
    releaseDate: '2022-11-02',
    birthday: '10-27',
    description: 'Lesser Lord Kusanali, the Dendro Archon who dwells deep in the Sanctuary of Surasthana.',
    baseStats: {
      hp: 10360,
      atk: 299,
      def: 630,
      critRate: 0.05,
      critDmg: 0.50,
      specialStat: 'Elemental Mastery',
      specialStatValue: 115.2
    },
    skills: {
      normalAttack: { name: 'Akara', description: 'Performs up to 4 attacks dealing Dendro DMG.' },
      elementalSkill: { name: 'All Schemes Unknowable', description: 'Marks up to 8 enemies with Seed of Skandha, unleashing Tri-Karma Purification dealing Dendro DMG when reactions trigger.', cd: 6 },
      elementalBurst: { name: 'Illusionary Heart', description: 'Manifests the Court of Dreams, granting buffs to Seed of Skandha based on party Pyro/Electro/Hydro members.', energyCost: 50, cd: 13.5 }
    },
    passives: [
      { name: 'Compassion Illuminated', description: 'Burst increases active character EM by 25% of highest party member EM (max 250 EM).', unlockLevel: 1 },
      { name: 'Awakening Elucidated', description: 'Each point of EM above 200 grants 0.1% DMG bonus and 0.03% CRIT Rate to Tri-Karma Purification.', unlockLevel: 70 }
    ],
    constellations: [
      { level: 2, name: 'The Root of All Fullness', description: 'Opponents marked by Seed of Skandha undergo Bloom/Hyperbloom/Burgeon with 20% CRIT Rate and 100% CRIT DMG, and Quicken reduces DEF by 30%.' }
    ],
    ascensionMaterials: [{ materialId: 'kalpalata_lotus', amount: 168, minLevel: 20 }],
    talentMaterials: [{ materialId: 'ingenuity_book', amount: 114, levelReq: 2, domainDays: ['Tuesday', 'Friday', 'Sunday'] }],
    recommendedRoles: ['Sub-DPS', 'Support'],
    recommendedWeapons: ['a_thousand_floating_dreams', 'sacrificial_fragments', 'magic_guide'],
    recommendedArtifactSets: {
      fourPiece: 'deepwood_memories',
      mainStats: {
        sands: ['Elemental Mastery'],
        goblet: ['Elemental Mastery', 'Dendro DMG Bonus'],
        circlet: ['Elemental Mastery', 'CRIT Rate']
      },
      substatsPriority: ['Elemental Mastery', 'CRIT Rate', 'CRIT DMG', 'Energy Recharge']
    },
    source: 'Official Genshin Records',
    version: '3.2',
    lastUpdated: '2026-02-15'
  }
];
