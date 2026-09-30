import { calculateFarmingRequirements, calculatePityStats, calculateDamage, evaluateArtifact } from '../services/engines';
import { INITIAL_USER_ACCOUNT } from '../services/mockAccount';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

export function runTestSuite() {
  console.log('Running TEYVAT AI Engine Test Suite...');

  // Test 1: Farming Requirements
  const farmingResult = calculateFarmingRequirements(INITIAL_USER_ACCOUNT, 'hu_tao');
  assert(farmingResult.characterId === 'hu_tao', 'Character ID should be hu_tao');
  assert(farmingResult.neededMaterials.length === 3, 'Should have 3 materials needed for Hu Tao');

  const silk = farmingResult.neededMaterials.find(m => m.materialId === 'silk_flower');
  assert(silk?.owned === 150, 'Owned silk flowers should be 150');
  assert(silk?.required === 168, 'Required silk flowers should be 168');
  assert(silk?.missing === 18, 'Missing silk flowers should be 18');

  // Test 2: Pity Stats
  const pityStats = calculatePityStats(INITIAL_USER_ACCOUNT.wishes);
  assert(pityStats.characterBanner.currentPity === 76, 'Current pity should be 76');

  // Test 3: Damage Calculator
  const dmg = calculateDamage(714, 120, 311, 242, 46.6, 210, true, 1.5);
  assert(dmg.totalAtk > 0, 'Total ATK should be greater than 0');
  assert(dmg.critDamage > dmg.nonCritDamage, 'CRIT damage should exceed non-CRIT damage');
  assert(dmg.reactionDamage > dmg.critDamage, 'Reaction damage should exceed CRIT damage');

  // Test 4: Artifact Evaluator
  const art = INITIAL_USER_ACCOUNT.artifacts[0];
  const evalResult = evaluateArtifact(art, 'hu_tao');
  assert(evalResult.score >= 70, 'Flower score should be >= 70');
  assert(evalResult.recommendation !== undefined, 'Recommendation should be defined');

  console.log('✅ All 4 engine test suites passed successfully!');
}

// Auto-execute during node testing
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  try {
    runTestSuite();
  } catch (e) {
    console.error(e);
  }
}
