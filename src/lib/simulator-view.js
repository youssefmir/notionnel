import { evaluatePosition, initialScenario, scenarioSeries } from './payoff.js';

const euro = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const money = (value) => euro.format(value);
export const signed = (value) => (value > 0 ? '+' + money(value) : money(value));

function equilibrium({ kind, price, from, to }) {
  if (kind === 'point') return money(price);
  if (kind === 'none') return 'Aucun cours possible';
  if (to === Infinity) return 'Dès ' + money(from);
  return 'De 0 à ' + money(to);
}

export function scenarioCopy(scenario, result) {
  const { type, side, spot, strike, premium } = scenario;
  const buyer = side === 'long';
  const isCall = type === 'call';
  const right = isCall ? 'acheter' : 'vendre';
  const transfer = buyer ? 'vous payez' : 'vous recevez';
  let explanation = '';
  if (result.intrinsic > 0) {
    explanation = `L’acheteur peut ${right} l’action à ${money(strike)} alors qu’elle vaut ${money(spot)}. Ce droit vaut donc ${money(result.intrinsic)} à l’échéance.`;
  } else if (spot === strike) {
    explanation = `Le prix convenu et le cours final coïncident. Exercer ou laisser le droit expirer donne la même valeur de 0 €.`;
  } else {
    explanation = `L’acheteur peut ${right} l’action à un meilleur prix sur le marché. Il laisse expirer son droit, qui vaut alors 0 €.`;
  }

  const position = (buyer ? 'Achat' : 'Vente') + ' d’un ' + type;
  const contract = buyer
    ? `Vous pouvez ${right} une action au prix convenu. En échange de ce droit, ${transfer} une prime de ${money(premium)} au départ.`
    : `Vous recevez une prime de ${money(premium)} au départ. Si l’acheteur exerce son droit, vous devez lui ${isCall ? 'vendre' : 'acheter'} l’action au prix convenu.`;
  const risk =
    !buyer && isCall
      ? 'Une action peut monter sans plafond. Le vendeur du call à découvert peut donc perdre bien plus que la prime reçue.'
      : type === 'put'
        ? 'Le cours de cette action peut tomber jusqu’à zéro. C’est à ce cours que le droit de la vendre au prix convenu vaut le plus.'
        : 'Si l’action monte, le droit de l’acheter au prix convenu peut prendre de la valeur sans plafond. Si le droit expire sans valeur, la perte se limite à la prime.';

  if (result.breakEven.kind === 'none') {
    explanation += ` Cette prime hypothétique dépasse même la valeur maximale du put, qui est de ${money(strike)}. L’acheteur perd de l’argent quel que soit le cours final.`;
  }
  return {
    position,
    contract,
    explanation,
    risk,
    outcome: signed(result.net),
    spot: money(spot),
    intrinsic: money(result.intrinsic),
    calculation: `${signed(result.exerciseCashflow)} à l’exercice ${result.premiumCashflow >= 0 ? '+' : '−'} ${money(premium)} de prime = ${signed(result.net)}.`,
    equilibrium: equilibrium(result.breakEven),
    maxLoss:
      result.maxLoss === Infinity
        ? 'Sans plafond'
        : result.maxLoss === 0
          ? 'Aucune perte'
          : money(result.maxLoss),
    maxGain:
      result.maxGain === Infinity
        ? 'Sans plafond'
        : result.maxGain === 0
          ? 'Aucun gain'
          : money(result.maxGain),
    announcement: `${position}. À ${money(spot)} par action, votre résultat net à l’échéance est de ${signed(result.net)}.`,
  };
}

function segment(name, legend, items, checked) {
  return `<fieldset class="sim-field"><legend>${legend}</legend><div class="sim-segment">${items
    .map(
      ([value, title]) =>
        `<label><input type="radio" name="${name}" value="${value}"${value === checked ? ' checked' : ''}><span>${title}</span></label>`,
    )
    .join('')}</div></fieldset>`;
}

function slider(key, label, min, max, value) {
  return `<div class="sim-slider">
    <div class="sim-slider-title"><label for="sim-${key}">${label}</label><output for="sim-${key}" id="sim-out-${key}">${money(value)}</output></div>
    <input id="sim-${key}" type="range" name="${key}" min="${min}" max="${max}" step="1" value="${value}" aria-valuetext="${money(value)}" style="--range-fill:${(100 * (value - min)) / (max - min)}%">
    <div class="sim-slider-bounds" aria-hidden="true"><span>${money(min)}</span><span>${money(max)}</span></div>
  </div>`;
}

export function scenarioRows(points, scenario) {
  return points
    .map(
      ({ price, intrinsic, net }) => `<tr${price === scenario.spot ? ' class="sim-selected-row"' : ''}>
    <th scope="row">${money(price)}${price === scenario.spot ? ' <small>(choisi)</small>' : ''}</th>
    <td>${money(intrinsic)}</td><td>${signed(net)}</td></tr>`,
    )
    .join('');
}

export function chartScale(points) {
  const values = points.map((point) => point.net);
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const extent = Math.max(4, max - min);
  const magnitude = 10 ** Math.floor(Math.log10(extent / 4));
  const step = [1, 2, 2.5, 5, 10].map((x) => x * magnitude).find((x) => x >= extent / 4);
  const low = Math.floor((min - extent * 0.04) / step) * step;
  const high = Math.ceil((max + extent * 0.04) / step) * step;
  const ticks = Array.from({ length: Math.round((high - low) / step) + 1 }, (_, i) => low + i * step);
  return { domain: [low, high], ticks };
}

// The unenhanced page keeps an annotated chart and the same data in a table.
function staticPlot(scenario, result, series) {
  const {
    domain: [low, high],
    ticks,
  } = chartScale(series.points);
  const x = (value) => 42 + (value * 412) / series.max;
  const y = (value) => 18 + ((high - value) * 148) / (high - low);
  const line = series.points.map(({ price, net }) => x(price) + ',' + y(net)).join(' ');
  return `<svg aria-hidden="true" viewBox="0 0 475 197" class="sim-static">
    <g fill="var(--muted)" font-size="11">
    ${series.ticks.map((t) => `<text x="${x(t)}" y="188" text-anchor="middle">${t}</text>`).join('')}
    ${ticks.map((t) => `<path stroke="var(--line)" stroke-dasharray="3 4" d="M42 ${y(t)}H454"/><text x="34" y="${y(t) + 4}" text-anchor="end">${t}</text>`).join('')}
    </g>
    <path d="M42 ${y(0)}H454" stroke="var(--muted)"/>
    <path d="M${x(scenario.spot)} 18V166" stroke="var(--muted)" stroke-dasharray="3 4"/>
    <polyline points="${line}" fill="none" stroke="var(--blue)" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="${x(scenario.spot)}" cy="${y(result.net)}" r="5" fill="var(--blue)" stroke="var(--surface)" stroke-width="2"/>
  </svg>`;
}

export function renderSimulator() {
  const s = initialScenario;
  const r = evaluatePosition(s);
  const c = scenarioCopy(s, r);
  const series = scenarioSeries(s);
  return `<div class="sim-lab" data-simulator>
    <noscript><p>Activez JavaScript pour modifier cet exemple. Le calcul et les scénarios ci-dessous restent consultables.</p></noscript>
    <div class="sim-workbench">
      <form class="sim-controls" aria-labelledby="sim-controls-title">
        <div class="sim-panel-heading"><h2 id="sim-controls-title">Votre contrat</h2><button type="reset" class="sim-reset" disabled>Réinitialiser</button></div>
        <fieldset class="sim-editable" disabled>
          <legend class="sim-sr">Paramètres du scénario</legend>
          ${segment(
            'type',
            'Droit négocié',
            [
              ['call', 'Call · acheter'],
              ['put', 'Put · vendre'],
            ],
            s.type,
          )}
          ${segment(
            'side',
            'Votre position',
            [
              ['long', 'Acheteur'],
              ['short', 'Vendeur'],
            ],
            s.side,
          )}
          <div class="sim-sliders">
            ${slider('strike', 'Prix d’exercice', 10, 200, s.strike)}
            ${slider('premium', 'Prime par action', 0, 50, s.premium)}
            ${slider('spot', 'Cours final de l’action', 0, 300, s.spot)}
          </div>
        </fieldset>
      </form>
      <section class="sim-results" aria-labelledby="sim-result-title">
        <div class="sim-plot-heading">
          <div><p class="sim-overline" data-value="position">${c.position}</p><h2 id="sim-result-title">Résultat à l’échéance</h2></div>
          <strong class="sim-result-number" data-value="outcome">${c.outcome}</strong>
        </div>
        <p class="sim-axis-caption">Résultat net par action (€)</p>
        <div class="sim-plot" data-sim-plot aria-hidden="true">${staticPlot(s, r, series)}</div>
        <p class="sim-axis-x">Cours de l’action à l’échéance (€)</p>
        <div class="sim-legend"><span>Résultat net</span><span>Cours choisi · <b data-value="spot">${c.spot}</b></span></div>
        <dl class="sim-stats">
          <div><dt>Équilibre</dt><dd data-value="equilibrium">${c.equilibrium}</dd></div>
          <div><dt>Gain maximal</dt><dd data-value="maxGain">${c.maxGain}</dd></div>
          <div><dt>Perte maximale</dt><dd data-value="maxLoss">${c.maxLoss}</dd></div>
        </dl>
      </section>
    </div>
    <div class="sim-reading">
      <h2>Lire ce scénario</h2>
      <p data-value="contract">${c.contract}</p>
      <p data-value="explanation">${c.explanation}</p>
      <p class="sim-equation" data-value="calculation">${c.calculation}</p>
      <p data-value="risk">${c.risk}</p>
      <details class="sim-table"><summary>Consulter les valeurs de la courbe</summary>
        <table><caption>Montants par action à l’échéance</caption>
        <thead><tr><th scope="col">Cours final</th><th scope="col">Valeur du droit</th><th scope="col">Résultat net</th></tr></thead>
        <tbody data-sim-table>${scenarioRows(series.points, s)}</tbody></table>
      </details>
      <p class="sim-assumptions">Une option sur une seule action, conservée jusqu’à l’échéance. Les montants excluent les frais, les impôts et les intérêts sur la prime. Le modèle suppose une position isolée et un cours de l’action positif ou nul.</p>
    </div>
    <p class="sim-sr" role="status" aria-atomic="true" data-value="announcement"></p>
  </div>`;
}
