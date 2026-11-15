import { createElement as h } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { evaluatePosition, scenarioSeries } from '../lib/payoff.js';
import { chartScale, money, scenarioCopy, scenarioRows } from '../lib/simulator-view.js';

function chart(scenario, result, series) {
  const scale = chartScale(series.points);
  const axis = {
    tickLine: false,
    axisLine: false,
    tickMargin: 8,
    tick: { fill: 'var(--muted)', fontSize: 11 },
    tickFormatter: (value) => value.toLocaleString('fr-FR'),
  };
  return h(
    ResponsiveContainer,
    { width: '100%', height: '100%', minWidth: 0 },
    h(
      LineChart,
      {
        data: series.points,
        accessibilityLayer: false,
        margin: { top: 8, bottom: 2, right: 20, left: 0 },
      },
      h(CartesianGrid, { stroke: 'var(--line)', strokeDasharray: '3 4' }),
      h(XAxis, {
        ...axis,
        type: 'number',
        dataKey: 'price',
        domain: [0, series.max],
        ticks: series.ticks,
        height: 26,
      }),
      h(YAxis, { ...axis, type: 'number', domain: scale.domain, ticks: scale.ticks, width: 37 }),
      h(ReferenceLine, { y: 0, stroke: 'var(--muted)', strokeWidth: 1.2 }),
      h(ReferenceLine, { x: scenario.spot, stroke: 'var(--muted)', strokeDasharray: '4 4' }),
      h(Line, {
        type: 'linear',
        dataKey: 'net',
        name: 'Résultat net',
        stroke: 'var(--blue)',
        strokeWidth: 3,
        isAnimationActive: false,
        dot: false,
        activeDot: false,
      }),
      h(ReferenceDot, {
        x: scenario.spot,
        y: result.net,
        r: 5.5,
        fill: 'var(--blue)',
        stroke: 'var(--surface)',
        strokeWidth: 2,
        isFront: true,
      }),
    ),
  );
}

const lab = document.querySelector('[data-simulator]');
if (lab) {
  const form = lab.querySelector('form');
  const fields = form.elements;
  const values = [...lab.querySelectorAll('[data-value]')];
  const table = lab.querySelector('[data-sim-table]');
  const root = createRoot(lab.querySelector('[data-sim-plot]'));

  function update() {
    const scenario = {
      type: fields.type.value,
      side: fields.side.value,
      strike: fields.strike.valueAsNumber,
      premium: fields.premium.valueAsNumber,
      spot: fields.spot.valueAsNumber,
    };
    for (const key of ['strike', 'premium', 'spot']) {
      const input = fields[key];
      const label = money(scenario[key]);
      form.querySelector('#sim-out-' + key).textContent = label;
      input.setAttribute('aria-valuetext', label);
      const fraction = (scenario[key] - Number(input.min)) / (Number(input.max) - Number(input.min));
      input.style.setProperty('--range-fill', fraction * 100 + '%');
    }
    const result = evaluatePosition(scenario);
    const copy = scenarioCopy(scenario, result);
    for (const node of values) {
      const value = copy[node.dataset.value];
      if (node.textContent !== value) node.textContent = value;
    }
    const series = scenarioSeries(scenario);
    table.innerHTML = scenarioRows(series.points, scenario);
    root.render(chart(scenario, result, series));
  }

  form.querySelector('.sim-editable').disabled = false;
  form.querySelector('.sim-reset').disabled = false;
  form.addEventListener('input', update);
  form.addEventListener('reset', (event) => {
    event.preventDefault();
    for (const input of form.querySelectorAll('input[type="radio"]')) {
      input.checked = input.defaultChecked;
    }
    for (const input of form.querySelectorAll('input[type="range"]')) {
      input.value = input.defaultValue;
    }
    update();
  });
  form.addEventListener('submit', (event) => event.preventDefault());
  update();
}
