/** One European option on one share, held to maturity. Currency in euros. */
export const initialScenario = Object.freeze({
  type: 'call',
  side: 'long',
  strike: 100,
  premium: 8,
  spot: 120,
});

function cents(value) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError('Un montant doit être un nombre positif ou nul.');
  }
  const amount = Math.round(value * 100);
  if (!Number.isSafeInteger(amount) || amount > Number.MAX_SAFE_INTEGER / 2) {
    throw new RangeError('Ce montant dépasse la précision du calcul.');
  }
  return amount;
}

export function evaluatePosition({ type, side, strike, premium, spot }) {
  if (!['call', 'put'].includes(type) || !['long', 'short'].includes(side)) {
    throw new RangeError('Type d’option ou sens de la position inconnu.');
  }
  const k = cents(strike);
  const p = cents(premium);
  const s = cents(spot);
  const isCall = type === 'call';
  const buyer = side === 'long';
  const intrinsic = Math.max(0, isCall ? s - k : k - s);
  const exerciseCashflow = buyer ? intrinsic : -intrinsic;
  const premiumCashflow = buyer ? -p : p;
  const lowestBuyerResult = -p;
  const highestBuyerResult = isCall ? Infinity : k - p;

  // At zero premium the flat part of the curve is an entire break-even interval.
  let breakEven;
  if (p === 0) {
    breakEven = isCall
      ? { kind: 'interval', from: 0, to: k / 100 }
      : { kind: 'interval', from: k / 100, to: Infinity };
  } else if (!isCall && p > k) {
    breakEven = { kind: 'none' };
  } else {
    breakEven = { kind: 'point', price: (isCall ? k + p : k - p) / 100 };
  }

  const smallest = buyer ? lowestBuyerResult : -highestBuyerResult;
  const largest = buyer ? highestBuyerResult : -lowestBuyerResult;
  return {
    intrinsic: intrinsic / 100,
    exerciseCashflow: exerciseCashflow / 100 || 0,
    premiumCashflow: premiumCashflow / 100 || 0,
    net: (exerciseCashflow + premiumCashflow) / 100 || 0,
    maxLoss: Math.max(0, -smallest) / 100,
    maxGain: Math.max(0, largest) / 100,
    breakEven,
  };
}

/** Include the kink, break-even and selected price exactly in the chart data. */
export function scenarioSeries(scenario) {
  const { strike, premium, spot } = scenario;
  const { breakEven } = evaluatePosition(scenario);
  const upperBound = Math.max(10, strike * 1.6, strike + premium * 1.5, spot * 1.06);
  const magnitude = 10 ** Math.floor(Math.log10(upperBound / 4));
  const step = [1, 2, 2.5, 5, 10].map((n) => n * magnitude).find((n) => n >= upperBound / 4);
  const max = Math.ceil(upperBound / step) * step;
  const prices = new Set([0, strike, spot, max]);
  if (breakEven.kind === 'point') prices.add(breakEven.price);
  return {
    max,
    ticks: Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step),
    points: [...prices]
      .sort((a, b) => a - b)
      .map((price) => {
        const { intrinsic, net } = evaluatePosition({ ...scenario, spot: price });
        return { price, intrinsic, net };
      }),
  };
}
