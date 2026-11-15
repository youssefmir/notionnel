import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePosition, initialScenario, scenarioSeries } from '../src/lib/payoff.js';

const calc = (changes) => evaluatePosition({ ...initialScenario, ...changes });

test('Les quatre positions donnent les résultats attendus sous, au et au-dessus du strike', () => {
  const cases = [
    ['call', 'long', [-8, -8, 12]],
    ['call', 'short', [8, 8, -12]],
    ['put', 'long', [12, -8, -8]],
    ['put', 'short', [-12, 8, 8]],
  ];
  for (const [type, side, expected] of cases) {
    assert.deepEqual(
      [80, 100, 120].map((spot) => calc({ type, side, spot }).net),
      expected,
    );
  }
});

test('Exercer peut réduire la perte sans rembourser toute la prime', () => {
  assert.equal(calc({ spot: 103 }).intrinsic, 3);
  assert.equal(calc({ spot: 103 }).net, -5);
  const writer = calc({ spot: 103, side: 'short' });
  assert.equal(writer.exerciseCashflow, -3);
  assert.equal(writer.premiumCashflow, 8);
  assert.equal(writer.net, 5);
});

test('Seuils en centimes, prime nulle et put à prime supérieure au strike', () => {
  for (const side of ['short', 'long']) {
    for (const [type, spot] of [
      ['call', 105.11],
      ['put', 95.09],
    ]) {
      const result = calc({ type, side, strike: 100.1, premium: 5.01, spot });
      assert.deepEqual(result.breakEven, { kind: 'point', price: spot });
      assert.equal(result.net, 0);
    }
    assert.deepEqual(calc({ side, premium: 0 }).breakEven, { kind: 'interval', from: 0, to: 100 });
    assert.deepEqual(calc({ side, type: 'put', premium: 0 }).breakEven, {
      kind: 'interval',
      from: 100,
      to: Infinity,
    });
    assert.deepEqual(calc({ side, type: 'put', premium: 101 }).breakEven, { kind: 'none' });
    assert.deepEqual(calc({ side, type: 'put', premium: 100 }).breakEven, { kind: 'point', price: 0 });
  }
});

test('Les bornes de gain et de perte tiennent compte du plancher zéro de l’action', () => {
  for (const [type, side, maxLoss, maxGain] of [
    ['call', 'long', 8, Infinity],
    ['call', 'short', Infinity, 8],
    ['put', 'long', 8, 92],
    ['put', 'short', 92, 8],
  ]) {
    const result = calc({ type, side });
    assert.equal(result.maxLoss, maxLoss);
    assert.equal(result.maxGain, maxGain);
  }
  assert.equal(calc({ type: 'put', premium: 101, side: 'long' }).maxGain, 0);
  assert.equal(calc({ type: 'put', premium: 101, side: 'short' }).maxLoss, 0);
});

test('Chaque courbe passe par le prix choisi, le strike et le seuil atteignable', () => {
  for (const type of ['call', 'put']) {
    const scenario = { ...initialScenario, type, spot: 177, strike: 101, premium: 21 };
    const { points, ticks, max } = scenarioSeries(scenario);
    assert.ok(points.some((p) => p.price === scenario.strike));
    assert.ok(points.some((p) => p.price === scenario.spot && p.net === calc(scenario).net));
    assert.ok(points.some((p) => p.net === 0));
    assert.equal(ticks.at(-1), max);
    assert.equal(points.at(-1).price, max);
    assert.deepEqual(
      points.map((p) => p.price),
      points.map((p) => p.price).sort((a, b) => a - b),
    );
  }
});

test('Les paramètres financiers invalides sont rejetés', () => {
  for (const changes of [
    { spot: -1 },
    { strike: NaN },
    { premium: Infinity },
    { type: 'future' },
    { side: '' },
  ]) {
    assert.throws(() => calc(changes), RangeError);
  }
});
