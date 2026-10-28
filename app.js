/* ============================================================
   PackAI — AI-Based Intelligent Food Packaging Recommendation
   Front-end logic · recommendation engine · rendering
   ============================================================ */
'use strict';

/* ============================================================
   1. KNOWLEDGE BASE — Food Commodities
   ============================================================ */
const COMMODITY_DB = {
  'fresh-fruits': {
    label: 'Fresh Fruits',
    icon: '🍓',
    commodities: [
      { name: 'Strawberries', resp: 55, temp: 4, moisture: 92, oil: 0.3, pH: 3.5, baseLife: 7 },
      { name: 'Apples', resp: 12, temp: 2, moisture: 84, oil: 0.4, pH: 3.5, baseLife: 60 },
      { name: 'Bananas', resp: 40, temp: 13, moisture: 75, oil: 0.3, pH: 5.0, baseLife: 9 },
      { name: 'Grapes', resp: 15, temp: 0, moisture: 81, oil: 0.4, pH: 3.5, baseLife: 21 },
      { name: 'Mangoes', resp: 60, temp: 12, moisture: 83, oil: 0.3, pH: 4.0, baseLife: 12 },
      { name: 'Oranges', resp: 10, temp: 6, moisture: 86, oil: 0.2, pH: 3.7, baseLife: 45 },
      { name: 'Tomatoes', resp: 25, temp: 12, moisture: 94, oil: 0.2, pH: 4.5, baseLife: 14 },
    ],
    humidity: 90, storage: 'chilled', mapSuitable: true,
  },
  'vegetables': {
    label: 'Vegetables',
    icon: '🥦',
    commodities: [
      { name: 'Leafy Greens (Spinach)', resp: 60, temp: 1, moisture: 92, oil: 0.4, pH: 6.0, baseLife: 7 },
      { name: 'Broccoli', resp: 45, temp: 1, moisture: 89, oil: 0.4, pH: 6.5, baseLife: 12 },
      { name: 'Carrots', resp: 18, temp: 0, moisture: 88, oil: 0.2, pH: 6.3, baseLife: 60 },
      { name: 'Cucumbers', resp: 20, temp: 10, moisture: 96, oil: 0.1, pH: 5.8, baseLife: 12 },
      { name: 'Potatoes', resp: 10, temp: 8, moisture: 79, oil: 0.1, pH: 5.8, baseLife: 90 },
      { name: 'Bell Peppers', resp: 22, temp: 8, moisture: 92, oil: 0.3, pH: 5.0, baseLife: 16 },
      { name: 'Onions', resp: 8, temp: 2, moisture: 89, oil: 0.1, pH: 5.5, baseLife: 90 },
    ],
    humidity: 92, storage: 'chilled', mapSuitable: true,
  },
  'dairy': {
    label: 'Dairy Products',
    icon: '🥛',
    commodities: [
      { name: 'Milk (Pasteurized)', resp: 0, temp: 4, moisture: 88, oil: 3.3, pH: 6.6, baseLife: 7 },
      { name: 'Yogurt', resp: 0, temp: 4, moisture: 85, oil: 3.5, pH: 4.4, baseLife: 21 },
      { name: 'Cheese (Hard)', resp: 0, temp: 5, moisture: 35, oil: 32, pH: 5.3, baseLife: 180 },
      { name: 'Butter', resp: 0, temp: 4, moisture: 16, oil: 81, pH: 4.7, baseLife: 120 },
      { name: 'Paneer / Fresh Cheese', resp: 0, temp: 4, moisture: 55, oil: 20, pH: 5.0, baseLife: 10 },
    ],
    humidity: 85, storage: 'chilled', mapSuitable: false,
  },
  'meat': {
    label: 'Meat & Poultry',
    icon: '🍗',
    commodities: [
      { name: 'Chicken (Fresh)', resp: 0, temp: 1, moisture: 75, oil: 5, pH: 6.2, baseLife: 8 },
      { name: 'Beef (Fresh)', resp: 0, temp: 1, moisture: 72, oil: 12, pH: 5.6, baseLife: 10 },
      { name: 'Pork (Fresh)', resp: 0, temp: 1, moisture: 68, oil: 15, pH: 5.7, baseLife: 8 },
      { name: 'Processed Meat / Sausages', resp: 0, temp: 4, moisture: 60, oil: 25, pH: 6.0, baseLife: 45 },
      { name: 'Cooked / RTE Meats', resp: 0, temp: 4, moisture: 65, oil: 10, pH: 6.1, baseLife: 20 },
    ],
    humidity: 85, storage: 'chilled', mapSuitable: true,
  },
  'seafood': {
    label: 'Seafood',
    icon: '🐟',
    commodities: [
      { name: 'Fresh Fish', resp: 0, temp: 0, moisture: 78, oil: 4, pH: 6.5, baseLife: 5 },
      { name: 'Shrimp / Prawns', resp: 0, temp: 0, moisture: 75, oil: 1, pH: 6.8, baseLife: 6 },
      { name: 'Smoked Fish', resp: 0, temp: 2, moisture: 55, oil: 6, pH: 6.0, baseLife: 21 },
    ],
    humidity: 90, storage: 'chilled', mapSuitable: true,
  },
  'bakery': {
    label: 'Bakery & Confectionery',
    icon: '🍞',
    commodities: [
      { name: 'Bread (Sliced)', resp: 0, temp: 22, moisture: 38, oil: 4, pH: 5.5, baseLife: 7 },
      { name: 'Cakes & Pastries', resp: 0, temp: 22, moisture: 30, oil: 20, pH: 6.5, baseLife: 7 },
      { name: 'Biscuits / Cookies', resp: 0, temp: 22, moisture: 4, oil: 18, pH: 7.0, baseLife: 120 },
      { name: 'Bakery Snacks / Rusk', resp: 0, temp: 22, moisture: 3, oil: 15, pH: 7.0, baseLife: 150 },
    ],
    humidity: 60, storage: 'ambient', mapSuitable: false,
  },
  'snacks': {
    label: 'Snacks & Ready-to-Eat',
    icon: '🍿',
    commodities: [
      { name: 'Potato Chips', resp: 0, temp: 22, moisture: 2, oil: 38, pH: 6.0, baseLife: 90 },
      { name: 'Namkeen / Mixture', resp: 0, temp: 22, moisture: 3, oil: 30, pH: 6.5, baseLife: 120 },
      { name: 'Nuts (Roasted)', resp: 0, temp: 22, moisture: 4, oil: 50, pH: 6.2, baseLife: 180 },
      { name: 'Puffed Snacks', resp: 0, temp: 22, moisture: 2, oil: 15, pH: 6.5, baseLife: 60 },
      { name: 'Instant Noodles (RTE)', resp: 0, temp: 22, moisture: 5, oil: 20, pH: 6.0, baseLife: 180 },
    ],
    humidity: 50, storage: 'ambient', mapSuitable: false,
  },
  'dry': {
    label: 'Dry Powders, Spices & Grains',
    icon: '🌾',
    commodities: [
      { name: 'Spices (Turmeric / Chilli)', resp: 0, temp: 22, moisture: 8, oil: 8, pH: 5.5, baseLife: 365 },
      { name: 'Flour / Atta', resp: 0, temp: 22, moisture: 11, oil: 2, pH: 6.0, baseLife: 180 },
      { name: 'Rice / Pulses', resp: 0, temp: 22, moisture: 12, oil: 1, pH: 6.0, baseLife: 365 },
      { name: 'Tea / Coffee Powder', resp: 0, temp: 22, moisture: 5, oil: 2, pH: 5.0, baseLife: 240 },
      { name: 'Dried Fruits', resp: 0, temp: 18, moisture: 18, oil: 1, pH: 4.2, baseLife: 180 },
    ],
    humidity: 45, storage: 'ambient', mapSuitable: false,
  },
  'beverages': {
    label: 'Beverages & Juices',
    icon: '🧃',
    commodities: [
      { name: 'Fruit Juice (Ambient)', resp: 0, temp: 22, moisture: 88, oil: 0.2, pH: 3.5, baseLife: 180 },
      { name: 'Carbonated Drinks', resp: 0, temp: 22, moisture: 90, oil: 0, pH: 3.0, baseLife: 270 },
      { name: 'Milk-Based Beverages', resp: 0, temp: 4, moisture: 85, oil: 3, pH: 6.5, baseLife: 14 },
      { name: 'Energy / RTD Tea', resp: 0, temp: 22, moisture: 88, oil: 0, pH: 3.6, baseLife: 240 },
    ],
    humidity: 55, storage: 'ambient', mapSuitable: true,
  },
  'oils': {
    label: 'Edible Oils & Fats',
    icon: '🫒',
    commodities: [
      { name: 'Vegetable Oil', resp: 0, temp: 22, moisture: 0.1, oil: 100, pH: 5.0, baseLife: 270 },
      { name: 'Olive Oil', resp: 0, temp: 22, moisture: 0.1, oil: 100, pH: 5.0, baseLife: 365 },
      { name: 'Ghee / Clarified Butter', resp: 0, temp: 22, moisture: 0.3, oil: 99, pH: 5.0, baseLife: 365 },
    ],
    humidity: 40, storage: 'ambient', mapSuitable: false,
  },
  'frozen': {
    label: 'Frozen Foods',
    icon: '🧊',
    commodities: [
      { name: 'Frozen Vegetables', resp: 0, temp: -18, moisture: 85, oil: 0.5, pH: 6.0, baseLife: 365 },
      { name: 'Frozen Meat / Seafood', resp: 0, temp: -18, moisture: 70, oil: 8, pH: 6.3, baseLife: 365 },
      { name: 'Frozen Ready Meals', resp: 0, temp: -18, moisture: 75, oil: 12, pH: 6.0, baseLife: 270 },
      { name: 'Ice Cream / Desserts', resp: 0, temp: -25, moisture: 62, oil: 12, pH: 6.5, baseLife: 240 },
    ],
    humidity: 75, storage: 'frozen', mapSuitable: false,
  },
};

/* ============================================================
   2. KNOWLEDGE BASE — Packaging Materials
   ============================================================ */
const MATERIAL_DB = [
  {
    id: 'mpe', name: 'LDPE', full: 'Low-Density Polyethylene', cat: 'flexible', catLabel: 'Flexible Film',
    props: { oxygen: 2, moisture: 7, light: 1, strength: 5, flexibility: 9, sealability: 8, clarity: 4, cold: 8, heat: 4, cost: 9, eco: 6 },
    otr: 6500, wvtr: 16, density: 0.92, tempRange: '-60 to 80°C', price: 1.35,
    recyclable: true, compostable: false, foodSafe: true, printability: 'Good',
    notes: 'Excellent moisture barrier & heat-seal layer; poor oxygen barrier. Ideal as sealant web in laminates.',
  },
  {
    id: 'hdpe', name: 'HDPE', full: 'High-Density Polyethylene', cat: 'rigid', catLabel: 'Rigid Packaging',
    props: { oxygen: 2, moisture: 9, light: 1, strength: 8, flexibility: 4, sealability: 5, clarity: 2, cold: 9, heat: 6, cost: 8, eco: 6 },
    otr: 2500, wvtr: 4, density: 0.95, tempRange: '-70 to 110°C', price: 1.25,
    recyclable: true, compostable: false, foodSafe: true, printability: 'Poor (treated)',
    notes: 'Stiff, strong, outstanding moisture barrier. Common for bottles, jars, and heavy-duty pouches.',
  },
  {
    id: 'pp', name: 'BOPP / PP', full: 'Biaxially-Oriented Polypropylene', cat: 'flexible', catLabel: 'Flexible Film',
    props: { oxygen: 3, moisture: 8, light: 1, strength: 7, flexibility: 7, sealability: 7, clarity: 8, cold: 6, heat: 7, cost: 8, eco: 6 },
    otr: 2200, wvtr: 9, density: 0.90, tempRange: '-30 to 130°C', price: 1.5,
    recyclable: true, compostable: false, foodSafe: true, printability: 'Excellent',
    notes: 'Crisp, glossy, good clarity & moisture barrier; excellent print surface. Workhorse of snack packaging.',
  },
  {
    id: 'pet', name: 'PET', full: 'Polyethylene Terephthalate', cat: 'rigid', catLabel: 'Rigid Packaging',
    props: { oxygen: 7, moisture: 5, light: 2, strength: 8, flexibility: 3, sealability: 3, clarity: 9, cold: 9, heat: 5, cost: 6, eco: 7 },
    otr: 90, wvtr: 18, density: 1.38, tempRange: '-70 to 150°C', price: 1.8,
    recyclable: true, compostable: false, foodSafe: true, printability: 'Excellent',
    notes: 'Strong, crystal-clear, good oxygen barrier. Widely recycled (#1). Base for high-barrier laminates.',
  },
  {
    id: 'mpet', name: 'Metalized PET', full: 'Metalized Polyester / PET-Al', cat: 'laminates', catLabel: 'Laminates & Foils',
    props: { oxygen: 9, moisture: 9, light: 9, strength: 7, flexibility: 6, sealability: 4, clarity: 1, cold: 8, heat: 5, cost: 4, eco: 5 },
    otr: 2, wvtr: 1.2, density: 1.42, tempRange: '-60 to 150°C', price: 2.6,
    recyclable: 'partial', compostable: false, foodSafe: true, printability: 'Good',
    notes: 'Near-opaque, excellent O₂, moisture & light barrier. Premium look for coffee, snacks & pharma-adjacent foods.',
  },
  {
    id: 'alo', name: 'Alu Foil Laminate', full: 'Aluminum Foil Laminate', cat: 'laminates', catLabel: 'Laminates & Foils',
    props: { oxygen: 10, moisture: 10, light: 10, strength: 6, flexibility: 4, sealability: 5, clarity: 0, cold: 8, heat: 7, cost: 3, eco: 4 },
    otr: 0.2, wvtr: 0.3, density: 2.7, tempRange: '-70 to 250°C', price: 3.4,
    recyclable: 'hard', compostable: false, foodSafe: true, printability: 'Good',
    notes: 'The ultimate barrier — O₂, moisture, light, aroma. Essential for long-life liquids, pharma and high-value foods.',
  },
  {
    id: 'evoh', name: 'EVOH Coex', full: 'EVOH Coextrusion Laminate', cat: 'flexible', catLabel: 'Flexible Film',
    props: { oxygen: 10, moisture: 3, light: 2, strength: 6, flexibility: 5, sealability: 6, clarity: 8, cold: 7, heat: 6, cost: 3, eco: 5 },
    otr: 0.5, wvtr: 40, density: 1.19, tempRange: '-60 to 180°C', price: 3.1,
    recyclable: 'partial', compostable: false, foodSafe: true, printability: 'Good',
    notes: 'Superb oxygen barrier but moisture-sensitive — always sandwiched between PP/PE layers in multi-web structures.',
  },
  {
    id: 'pla', name: 'PLA / Biodegradable', full: 'PLA-PBAT Biodegradable Film', cat: 'eco', catLabel: 'Biodegradable / Eco',
    props: { oxygen: 4, moisture: 4, light: 2, strength: 5, flexibility: 6, sealability: 6, clarity: 7, cold: 4, heat: 3, cost: 4, eco: 10 },
    otr: 550, wvtr: 320, density: 1.24, tempRange: '-20 to 60°C', price: 2.9,
    recyclable: false, compostable: true, foodSafe: true, printability: 'Good (corona treated)',
    notes: 'Compostable bio-polymer. Suitable for short-life, low-barrier produce & bakery where compostability wins.',
  },
  {
    id: 'brth', name: 'Micro-Perforated', full: 'Breathable Micro-Perforated Film', cat: 'breathable', catLabel: 'Breathable / MAP',
    props: { oxygen: 10, moisture: 6, light: 2, strength: 5, flexibility: 8, sealability: 7, clarity: 3, cold: 7, heat: 4, cost: 6, eco: 5 },
    otr: 9000, wvtr: 40, density: 0.92, tempRange: '-40 to 80°C', price: 2.0,
    recyclable: true, compostable: false, foodSafe: true, printability: 'Good',
    notes: 'Laser micro-perforations tune O₂/CO₂ exchange to match respiration — prevents fogging, keeps fresh produce crisp.',
  },
  {
    id: 'nylon', name: 'Nylon (PA) Laminate', full: 'Nylon / Polyamide Laminate', cat: 'laminates', catLabel: 'Laminates & Foils',
    props: { oxygen: 7, moisture: 2, light: 2, strength: 9, flexibility: 7, sealability: 5, clarity: 7, cold: 9, heat: 5, cost: 4, eco: 5 },
    otr: 60, wvtr: 350, density: 1.14, tempRange: '-70 to 140°C', price: 3.0,
    recyclable: 'partial', compostable: false, foodSafe: true, printability: 'Good',
    notes: 'Tough, puncture-resistant, low-temp flexible. Used with PE for meat, cheese & vacuum packaging.',
  },
  {
    id: 'board', name: 'Coated Paperboard', full: 'Laminated / Coated Paperboard', cat: 'rigid', catLabel: 'Rigid Packaging',
    props: { oxygen: 4, moisture: 6, light: 6, strength: 7, flexibility: 2, sealability: 3, clarity: 1, cold: 6, heat: 6, cost: 8, eco: 8 },
    otr: 3000, wvtr: 120, density: 0.8, tempRange: '-20 to 120°C', price: 1.6,
    recyclable: true, compostable: true, foodSafe: true, printability: 'Excellent',
    notes: 'Renewable, recyclable, great for print & branding. Barrier from PE/PET extrusion coating; dry-goods sweet spot.',
  },
  {
    id: 'pvdc', name: 'PVDC Coated', full: 'PVDC Coated Films', cat: 'flexible', catLabel: 'Flexible Film',
    props: { oxygen: 9, moisture: 9, light: 2, strength: 5, flexibility: 6, sealability: 6, clarity: 8, cold: 6, heat: 6, cost: 4, eco: 3 },
    otr: 10, wvtr: 6, density: 1.66, tempRange: '-30 to 120°C', price: 2.8,
    recyclable: 'partial', compostable: false, foodSafe: true, printability: 'Good',
    notes: 'Single-web high barrier to O₂ & moisture. Note: halogen content raises sustainability concerns.',
  },
];

/* ============================================================
   3. DOM refs
   ============================================================ */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const form = $('#analyzerForm');
const formPanel = $('#formPanel');
const loadingPanel = $('#loadingPanel');
const resultsPanel = $('#resultsPanel');

/* ============================================================
   4. Populate dropdowns
   ============================================================ */
const categorySelect = $('#commodityCategory');
const commoditySelect = $('#commodityName');
const respGroup = $('#respGroupHead');
const respRow = $('#respRow');

function populateCategories() {
  for (const [key, val] of Object.entries(COMMODITY_DB)) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = `${val.icon}  ${val.label}`;
    categorySelect.appendChild(opt);
  }
}

function populateCommodities(catKey) {
  commoditySelect.innerHTML = '<option value="">— Select commodity —</option>';
  const cat = COMMODITY_DB[catKey];
  if (!cat) return;
  cat.commodities.forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = c.name;
    commoditySelect.appendChild(opt);
  });
  // Auto-select the first commodity so the form is analysis-ready
  if (commoditySelect.options.length > 1) commoditySelect.selectedIndex = 1;
}

categorySelect.addEventListener('change', () => {
  const cat = COMMODITY_DB[categorySelect.value];
  populateCommodities(categorySelect.value);
  if (cat) {
    const isFresh = !!cat.mapSuitable && cat.commodities.some((c) => c.resp > 0);
    toggleRespiration(isFresh);
    if (isFresh) setVal('respiration', cat.commodities[0].resp, 1, 300);
    setVal('temperature', cat.commodities[0].temp, -40, 45);
    setVal('humidity', cat.humidity, 0, 100);
    setVal('moisture', cat.commodities[0].moisture, 0, 100);
    setVal('oil', cat.commodities[0].oil, 0, 100);
    setVal('pH', cat.commodities[0].pH, 0, 14);
    $('#storageType').value = cat.storage;
    validateStorageTemp();
  }
});

commoditySelect.addEventListener('change', () => {
  const cat = COMMODITY_DB[categorySelect.value];
  if (!cat) return;
  const item = cat.commodities.find((c) => c.name === commoditySelect.value);
  if (!item) return;
  setVal('temperature', item.temp, -40, 45);
  setVal('moisture', item.moisture, 0, 100);
  setVal('oil', item.oil, 0, 100);
  setVal('pH', item.pH, 0, 14);
  if (COMMODITY_DB[categorySelect.value].mapSuitable && item.resp > 0) setVal('respiration', item.resp, 1, 300);
});

function toggleRespiration(show) {
  respGroup.classList.toggle('hidden', !show);
  respRow.classList.toggle('hidden', !show);
}

/* Range ↔ number sync */
function wireRange(id) {
  const range = $(`#${id}Range`);
  const num = $(`#${id}`);
  if (!range || !num) return;
  const paint = () => {
    const min = +range.min, max = +range.max, v = +num.value;
    range.style.setProperty('--fill', ((v - min) / (max - min)) * 100 + '%');
  };
  range.addEventListener('input', () => { num.value = range.value; paint(); validateField(num); });
  num.addEventListener('input', () => { range.value = num.value; paint(); validateField(num); });
  paint();
}

function setVal(id, val, min, max) {
  const num = $(`#${id}`);
  if (!num) return;
  num.value = val;
  const range = $(`#${id}Range`);
  if (range) range.value = val;
  const e = id === 'respiration' ? $('#respirationRange') : range;
  if (e) {
    const v = +num.value, mn = +e.min, mx = +e.max;
    e.style.setProperty('--fill', ((v - mn) / (mx - mn)) * 100 + '%');
  }
}

/* ============================================================
   5. Validation
   ============================================================ */
const storageRanges = {
  ambient: [-10, 45],
  chilled: [0, 8],
  frozen: [-40, -18],
};

function validateField(el) {
  const min = +el.min, max = +el.max, v = +el.value;
  const ok = el.value !== '' && !isNaN(v) && v >= min && v <= max;
  el.classList.toggle('invalid', !ok);
  return ok;
}

function validateStorageTemp() {
  const t = $('#temperature');
  const type = $('#storageType').value;
  const [lo, hi] = storageRanges[type];
  const v = +t.value;
  const ok = v >= lo && v <= hi;
  t.classList.toggle('invalid', !ok);
  return ok;
}

$('#storageType').addEventListener('change', validateStorageTemp);
$('#temperature').addEventListener('input', validateStorageTemp);

function collectForm() {
  const errors = [];
  const required = ['commodityCategory', 'commodityName', 'moisture', 'oil', 'pH', 'temperature', 'humidity', 'shelfLife'];
  const get = (id) => {
    const el = $(`#${id}`);
    if (!el) return null;
    const v = el.value;
    if (required.includes(id) && (v === '' || v === null || v === undefined)) {
      errors.push(`${el.labels && el.labels[0] ? el.labels[0].textContent.replace(' *', '').trim() : id} is required.`);
      el.classList.add('invalid');
      return null;
    }
    if (['moisture', 'oil', 'pH', 'temperature', 'humidity', 'shelfLife'].includes(id) && !validateField(el)) {
      errors.push(`${el.labels && el.labels[0] ? el.labels[0].textContent.replace(' *', '').trim() : id} must be within ${el.min}–${el.max}.`);
    }
    return el.value;
  };

  const data = {
    category: get('commodityCategory'),
    commodity: get('commodityName'),
    moisture: +get('moisture'),
    oil: +get('oil'),
    pH: +get('pH'),
    oxygenSensitivity: $('#oxygenSensitivity').value,
    temperature: +get('temperature'),
    humidity: +get('humidity'),
    shelfLife: +get('shelfLife'),
    transportMode: $('#transportMode').value,
    storageType: $('#storageType').value,
    sustainabilityPref: $('#sustainabilityPref').value,
  };

  const catKey = data.category;
  const isFresh = catKey && COMMODITY_DB[catKey].mapSuitable &&
    COMMODITY_DB[catKey].commodities.some((c) => c.resp > 0);
  if (isFresh) {
    data.respiration = +get('respiration');
    if (!validateField($('#respiration'))) {
      errors.push('Respiration rate must be within 1–300 mg CO₂/kg·h.');
    }
  } else {
    data.respiration = 0;
  }

  if (!validateStorageTemp()) {
    errors.push(`Storage temperature must be within ${storageRanges[data.storageType].join('–')}°C for "${$('#storageType').selectedOptions[0].textContent}".`);
  }
  // pH constraint
  if (data.pH < 0 || data.pH > 14) errors.push('pH must be between 0 and 14.');
  // moisture + oil sanity
  if (data.moisture + data.oil > 105) errors.push('Moisture + fat content seems unrealistic (>105%).');

  return { data, errors };
}

/* ============================================================
   6. RECOMMENDATION ENGINE
   ============================================================ */
function computeRequirements(d) {
  const cat = COMMODITY_DB[d.category];
  const isFresh = cat.mapSuitable && d.respiration > 0;

  const temp = d.temperature;
  const frozen = temp <= -10;
  const shelfFactor = Math.min(1.6, Math.max(0.3, Math.log10(Math.max(2, d.shelfLife)) / Math.log10(60)));

  // Barrier needs (0–10)
  const needO2 = Math.min(10,
    2 + d.oil / 20 + (d.oxygenSensitivity === 'high' ? 4 : d.oxygenSensitivity === 'medium' ? 2 : 0.5)
    + (d.shelfLife > 90 ? 2.5 : d.shelfLife > 30 ? 1.5 : 0.5) + shelfFactor * 1.2);
  const needMoisture = Math.min(10,
    2 + d.moisture / 14 + (d.humidity > 75 ? 2.5 : d.humidity > 50 ? 1.4 : 0.4) + shelfFactor * 1.3);
  const needLight = Math.min(10, d.oil > 15 ? 7 : d.oil > 5 ? 4.5 : 2) + (d.shelfLife > 120 ? 2 : 0);
  const needStrength = d.transportMode === 'air' ? 8 : d.transportMode === 'sea' ? 7 : d.transportMode === 'road-long' || d.transportMode === 'multimodal' ? 6 : 4;
  const needSeal = Math.min(10, 5 + (d.moisture > 50 ? 1.5 : 0) + shelfFactor);
  const needFlex = isFresh ? 8 : d.moisture > 60 ? 5 : 4.5;
  const needCold = frozen ? 10 : d.temperature < 6 ? 8 : 6.5;
  const needHeat = d.shelfLife > 150 && !frozen ? 6 : 4;
  const needEco = d.sustainabilityPref === 'eco' ? 9 : d.sustainabilityPref === 'cost' ? 5 : 6.5;
  const needCost = d.sustainabilityPref === 'cost' ? 9 : 6.5;
  const needBreath = isFresh ? Math.min(10, 4 + d.respiration / 25) : 0;
  const needClarity = isFresh ? 5 : 4;

  return {
    needO2: +needO2.toFixed(1), needMoisture: +needMoisture.toFixed(1), needLight: +needLight.toFixed(1),
    needStrength: +needStrength.toFixed(1), needSeal: +needSeal.toFixed(1), needFlex: +needFlex.toFixed(1),
    needCold: +needCold.toFixed(1), needHeat: +needHeat.toFixed(1), needEco: +needEco.toFixed(1),
    needCost: +needCost.toFixed(1), needBreath: +needBreath.toFixed(1), needClarity: +needClarity.toFixed(1),
    isFresh, frozen,
  };
}

function scoreMaterial(m, req) {
  // Breathable films only offer "oxygen capability" when respiration control is actually needed;
  // for barrier-driven foods their perforations are a liability, so their effective O2/moisture drop.
  const breathControl = m.id === 'brth' && req.needBreath <= 1;
  const effO2 = breathControl ? 2 : m.props.oxygen;
  const effMoist = breathControl ? 5 : m.props.moisture;
  const effLight = breathControl ? 2 : m.props.light;

  // Property alignment: how the material satisfies the need (0–10)
  const align = {
    oxygen: Math.min(effO2, req.needO2) / Math.max(req.needO2, 0.1) * 10,
    moisture: Math.min(effMoist, req.needMoisture) / Math.max(req.needMoisture, 0.1) * 10,
    light: Math.min(effLight, req.needLight) / Math.max(req.needLight, 0.1) * 10,
    strength: Math.min(m.props.strength, req.needStrength) / Math.max(req.needStrength, 0.1) * 10,
    sealability: Math.min(m.props.sealability, req.needSeal) / Math.max(req.needSeal, 0.1) * 10,
    flexibility: Math.min(m.props.flexibility, req.needFlex) / Math.max(req.needFlex, 0.1) * 10,
    clarity: Math.min(m.props.clarity, req.needClarity) / Math.max(req.needClarity, 0.1) * 10,
  };

  // Cold/heat tolerance as pass/fail modifiers
  const coldOK = m.props.cold >= req.needCold * 0.75;
  const heatOK = m.props.heat >= req.needHeat * 0.7;
  const ecoMat = m.recyclable === true || m.recyclable === 'partial' ? m.props.eco : m.props.eco * 0.7;
  const ecoScore = Math.min(ecoMat, req.needEco) / Math.max(req.needEco, 0.1) * 10;
  const costScore = Math.min(m.props.cost, req.needCost) / Math.max(req.needCost, 0.1) * 10;

  // Breathability requirement — only breathable-type films satisfy; others penalized if needed
  let breathScore = 10;
  if (req.needBreath > 1) {
    breathScore = m.id === 'brth' ? 10 : (req.needBreath * (m.props.oxygen > 8 ? 2 : 1)) > 12 ? 3 : 6;
  }

  const weights = {
    oxygen: 1.15, moisture: 1.15, light: 0.65, strength: 0.8, sealability: 0.6,
    flexibility: 0.35, clarity: 0.25, eco: 0.5, cost: 0.45, breath: req.needBreath > 1 ? 1.6 : 0.2, cold: 0.3, heat: 0.15,
  };

  const parts = {
    oxygen: align.oxygen * weights.oxygen,
    moisture: align.moisture * weights.moisture,
    light: align.light * weights.light,
    strength: align.strength * weights.strength,
    sealability: align.sealability * weights.sealability,
    breath: breathScore * weights.breath,
  };
  const extras = {
    eco: ecoScore * weights.eco,
    cost: costScore * weights.cost,
    cold: (coldOK ? 10 : 4) * weights.cold,
    heat: (heatOK ? 10 : 6) * weights.heat,
  };

  let total = 0, wSum = 0, details = {};
  for (const [k, v] of Object.entries(parts)) { total += v; wSum += weights[k]; details[k] = +v.toFixed(1); }
  for (const [k, v] of Object.entries(extras)) { total += v; wSum += weights[k]; details[k] = +v.toFixed(1); }

  const score = Math.min(99, Math.max(1, Math.round((total / Math.max(wSum, 0.001)) * 10)));
  return { score, align, parts, extras, details, coldOK, heatOK };
}

/* ---- MAP gas recommendation ---- */
function recommendMAP(respirationRate) {
  // Heuristic blend based on respiration (high resp → more N2 balance, low O2)
  let o2, co2, n2;
  if (respirationRate > 50) { o2 = 3; co2 = 12; }
  else if (respirationRate > 25) { o2 = 5; co2 = 10; }
  else if (respirationRate > 10) { o2 = 8; co2 = 8; }
  else { o2 = 10; co2 = 5; }
  n2 = 100 - o2 - co2;
  return {
    o2, co2, n2,
    perforation: respirationRate > 30 ? 'Laser micro-perforated (2–4 holes à 40–60 µm) or breathable patch' :
      respirationRate > 12 ? 'Light micro-perforation or highly breathable film' :
      'Low-permeation MAP film (balanced OTR for equilibrium MAP)',
  };
}

/* ---- Shelf life prediction ---- */
const STORAGE_REF_TEMP = { ambient: 22, chilled: 4, frozen: -18 };

function predictShelfLife(d, req, mat) {
  const cat = COMMODITY_DB[d.category];
  const item = cat.commodities.find((c) => c.name === d.commodity) || cat.commodities[0];
  let base = item ? item.baseLife : 14;

  // Temperature factor vs. the commodity's own ideal storage temperature (Q10 = 2)
  const refTemp = STORAGE_REF_TEMP[d.storageType] || 22;
  const tempFactor = Math.pow(2, (refTemp - d.temperature) / 10);
  let predicted = base * tempFactor;

  // Barrier uplift
  const o2Cap = mat.props.oxygen >= req.needO2 * 0.9 ? 1 : mat.props.oxygen / Math.max(0.1, req.needO2) * 0.9;
  const mCap = mat.props.moisture >= req.needMoisture * 0.9 ? 1 : mat.props.moisture / Math.max(0.1, req.needMoisture) * 0.9;
  const barrier = Math.min(1, (o2Cap + mCap) / 2);
  predicted = predicted * (0.55 + 0.9 * barrier);

  // Fresh produce: respiration management multiplier
  let freshFactor = 1;
  if (req.isFresh) {
    freshFactor = mat.id === 'brth' ? 1.6 : mat.props.oxygen >= 8 ? 1.3 : 0.85;
  }

  predicted = predicted * freshFactor;

  return { base, predicted: Math.max(1, Math.round(predicted)), tempFactor: +tempFactor.toFixed(2) };
}

/* ---- Sustainability ---- */
function sustainabilityReport(mat) {
  const recyclablePct = mat.recyclable === true ? 86 : mat.recyclable === 'partial' ? 55 : 22;
  const carbon = (mat.price * 0.9 * 1.6 + (mat.props.eco < 6 ? 1.2 : 0)).toFixed(1);
  const ecoScore = Math.round(mat.props.eco * 10);
  return { recyclablePct, compostable: mat.compostable, carbon, ecoScore };
}

/* ---- Cost estimate ---- */
function computeThickness(d, mat, req) {
  let t = mat.cat === 'rigid' ? 350 : mat.cat === 'laminates' ? 60 : 50; // µm
  if (mat.id === 'alo') t = 75;
  if (mat.id === 'mpe') t = 65;
  if (mat.id === 'pp') t = 40;
  if (req.needStrength > 6.5) t = Math.round(t * 1.35);
  if (d.shelfLife > 120) t = Math.round(t * 1.2);
  if (req.frozen) t = Math.round(t * 1.5);
  return Math.min(800, Math.max(15, t));
}

function costEstimate(d, mat, req) {
  const thickness = computeThickness(d, mat, req);
  const filmDensity = mat.density; // g/cc
  const areaPerPack = 600; // cm² (approx. typical 20x15cm pouch, both sides)
  const volumePerPack = (areaPerPack * thickness) / 10000; // cc
  const gramsPerPack = volumePerPack * filmDensity;
  const resinCost = gramsPerPack * mat.price / 100; // ₹ per g
  const conversion = 0.55 + (mat.cat === 'laminates' ? 0.9 : mat.cat === 'rigid' ? 1.4 : 0.4);
  const printing = d.category === 'snacks' || d.category === 'bakery' ? 0.6 : 0.35;
  const total = resinCost + conversion + printing;
  return { gramsPerPack: +gramsPerPack.toFixed(1), resinCost: +resinCost.toFixed(2), conversion: +conversion.toFixed(2), printing: +printing.toFixed(2), total: +total.toFixed(2) };
}

/* ============================================================
   7. RUN ANALYSIS
   ============================================================ */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  const { data, errors } = collectForm();
  if (errors.length) { showErrors(errors); return; }
  runAnalysis(data);
});

const AI_STEPS = [
  'Parsing commodity profile & parameters',
  'Extracting composition chemistry (moisture · fat · pH)',
  'Estimating storage & logistics load',
  'Computing barrier requirements (OTR · WVTR · strength)',
  'Scoring 12+ materials against requirements',
  'Optimizing structure, thickness & MAP blend',
  'Forecasting shelf life, cost & sustainability',
];

function runAnalysis(data) {
  formPanel.classList.add('hidden');
  resultsPanel.classList.add('hidden');
  loadingPanel.classList.remove('hidden');
  window.scrollTo({ top: $('#analyzer').offsetTop - 90, behavior: 'smooth' });

  const list = $('#aiSteps');
  list.innerHTML = '';
  AI_STEPS.forEach((s) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="step-ic"></span>${s}`;
    list.appendChild(li);
  });

  const bar = $('#aiBarFill');
  const items = [...list.children];
  let i = 0;
  const timer = setInterval(() => {
    if (i > 0) items[i - 1].classList.remove('active');
    if (i < items.length) {
      items[i].classList.add('active');
      bar.style.width = (i + 1) / items.length * 100 + '%';
      i++;
    } else {
      clearInterval(timer);
      items[items.length - 1].classList.remove('active');
      items.forEach((li) => { li.classList.remove('active'); li.classList.add('done'); });
      bar.style.width = '100%';
      setTimeout(() => showResults(data), 420);
    }
  }, 420);
}

/* ============================================================
   8. RENDER RESULTS
   ============================================================ */
let lastResult = null;

function showResults(d) {
  loadingPanel.classList.add('hidden');
  resultsPanel.classList.remove('hidden');
  window.scrollTo({ top: $('#analyzer').offsetTop - 90, behavior: 'smooth' });

  const req = computeRequirements(d);
  const cat = COMMODITY_DB[d.category];

  let scored = MATERIAL_DB.map((m) => ({ mat: m, ...scoreMaterial(m, req) }));
  scored.sort((a, b) => b.score - a.score);
  const top = scored[0];
  const top3 = scored.slice(0, 3);
  lastResult = { d, req, scored, top, top3, cat };

  // ---- Banner
  $('#recMaterialName').textContent = `${top.mat.name}${top.mat.full ? ' · ' + top.mat.full : ''}`;
  $('#recMaterialDesc').textContent = top.mat.notes;
  $('#recConfidence').textContent = top.score + '%';
  $('#scoreRingVal').textContent = top.score;
  $('#scoreRing').style.setProperty('--pc', top.score + '%');
  $('#recTitle').textContent = `Recommendation for ${d.commodity} (${cat.label})`;

  renderCandidates(top3, d, req);
  const topMat = top3[0].mat;
  renderRadar(topMat, req);
  renderSpecBars(top3[0], req, d);
  renderSpecTable(d, req, topMat);
  renderMAP(d, req, top3);
  renderShelf(d, req, topMat);
  renderSustainability(topMat);
  renderCost(d, req, topMat);
  renderQR(d, topMat);
}

/* ---- Candidates ---- */
function renderCandidates(cands, d, req) {
  const list = $('#candidateList');
  list.innerHTML = '';
  cands.forEach((c, idx) => {
    const div = document.createElement('div');
    div.className = 'candidate' + (idx === 0 ? ' selected' : '');
    div.innerHTML = `
      <span class="cand-rank">${idx + 1}</span>
      <div class="cand-info">
        <div class="cand-name">${c.mat.name}
          ${idx === 0 ? '<span class="cand-badge">AI TOP PICK</span>' : ''}
          <span>${c.mat.full || ''}</span>
        </div>
        <div class="cand-sub">${c.mat.catLabel} · ${c.mat.notes.slice(0, 72)}…</div>
      </div>
      <div class="cand-score">
        <strong>${c.score}</strong><small>/100</small>
        <div class="cand-bar"><span style="width:${c.score}%"></span></div>
      </div>`;
    div.addEventListener('click', () => selectCandidate(c.mat.id, d, req));
    div.dataset.matId = c.mat.id;
    list.appendChild(div);
  });
}

function selectCandidate(id, d, req) {
  const mat = MATERIAL_DB.find((m) => m.id === id);
  renderRadar(mat, req);
  renderSpecTable(d, req, mat);
  renderShelf(d, req, mat);
  renderSustainability(mat);
  renderCost(d, req, mat);
  renderQR(d, mat);
  $$('#candidateList .candidate').forEach((el) => el.classList.toggle('selected', el.dataset.matId === id));
}

/* ---- Radar ---- */
function renderRadar(mat, req) {
  const canvas = $('#radarChart');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2 + 6, R = Math.min(W, H) / 2 - 34;
  const labels = ['O₂ Barrier', 'Moisture', 'Strength', 'Flexibility', 'Sealability', 'Cost', 'Eco'];
  const materialVals = [
    mat.props.oxygen, mat.props.moisture, mat.props.strength,
    mat.props.flexibility, mat.props.sealability, Math.min(10, mat.props.cost), Math.min(10, mat.props.eco),
  ];
  const reqVals = [
    req.needO2, req.needMoisture, req.needStrength,
    req.needFlex, req.needSeal, req.needCost, req.needEco,
  ];

  ctx.clearRect(0, 0, W, H);
  for (let ring = 1; ring <= 5; ring++) {
    ctx.beginPath();
    for (let i = 0; i <= labels.length; i++) {
      const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
      const r = R * ring / 5;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke();
  }
  labels.forEach((lbl, i) => {
    const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
    ctx.strokeStyle = '#e2e8f0'; ctx.stroke();
    const tx = cx + Math.cos(a) * (R + 16), ty = cy + Math.sin(a) * (R + 14);
    ctx.fillStyle = '#64748b'; ctx.font = '600 10px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(lbl, tx, ty);
  });

  const drawPoly = (vals, color, fill) => {
    ctx.beginPath();
    vals.forEach((v, i) => {
      const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
      const r = Math.min(10, Math.max(0, v)) / 10 * R;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
    vals.forEach((v, i) => {
      const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
      const r = Math.min(10, v) / 10 * R;
      ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
    });
  };

  drawPoly(reqVals, '#94a3b8', 'rgba(148,163,184,.12)');
  drawPoly(materialVals, '#10b981', 'rgba(16,185,129,.16)');

  ctx.font = '600 11px Inter, sans-serif'; ctx.textAlign = 'center';
  ctx.fillStyle = '#059669'; ctx.fillText('■ Recommended material', cx - 70, H - 12);
  ctx.fillStyle = '#94a3b8'; ctx.fillText('□ Required profile', cx + 60, H - 12);
}

/* ---- Spec bars ---- */
function renderSpecBars(cand, req, d) {
  const wrap = $('#specBars');
  wrap.innerHTML = '';
  const rows = [
    { label: 'Oxygen barrier vs. required', val: Math.round(Math.min(cand.mat.props.oxygen, req.needO2 * 1.3) / Math.max(req.needO2 * 1.3, 0.1) * 100) },
    { label: 'Moisture barrier vs. required', val: Math.round(Math.min(cand.mat.props.moisture, req.needMoisture * 1.3) / Math.max(req.needMoisture * 1.3, 0.1) * 100) },
    { label: 'Strength vs. transport load', val: Math.round(Math.min(cand.mat.props.strength, req.needStrength * 1.3) / Math.max(req.needStrength * 1.3, 0.1) * 100) },
    { label: 'Seal integrity', val: Math.round(cand.mat.props.sealability * 10) },
    { label: 'Cold-chain tolerance', val: Math.round(Math.min(100, cand.mat.props.cold * 10 + 10)) },
    { label: 'Cost efficiency', val: Math.round(cand.mat.props.cost * 10) },
  ];
  rows.forEach((r, i) => {
    const v = Math.min(100, r.val);
    const row = document.createElement('div');
    row.className = 'spec-bar-row';
    row.innerHTML = `
      <div class="sb-top"><span>${r.label}</span><span>${v}%</span></div>
      <div class="sb-track"><div class="sb-fill" style="width:0%" data-w="${v}"></div></div>`;
    wrap.appendChild(row);
    setTimeout(() => { row.querySelector('.sb-fill').style.width = v + '%'; }, 120 + i * 140);
  });
}

/* ---- Spec table ---- */
function renderSpecTable(d, req, mat) {
  const tbody = $('#specTable tbody');
  const thickness = computeThickness(d, mat, req);
  const mapSuitable = req.isFresh ? 'Yes — see MAP panel' : mat.id === 'brth' ? 'Yes' : (mat.props.oxygen > 7 ? 'Possible' : 'Limited');
  const rows = [
    ['Oxygen Transmission Rate (OTR)', formatOTR(mat, req), 'cc/m²·day @23°C·50%RH'],
    ['Water Vapor Transmission Rate (WVTR)', formatWVTR(mat, req), 'g/m²·day @38°C·90%RH'],
    ['Recommended film thickness', `${thickness} µm`, mat.cat === 'rigid' ? 'rigid wall' : 'flexible web'],
    ['Sealability', rating(mat.props.sealability, 'poor', 'good'), 'heat-seal layer'],
    ['Gas permeability', rating((mat.props.oxygen + mat.props.moisture) / 2, 'high', 'low'), 'O₂ + moisture combined'],
    ['Mechanical strength', rating(mat.props.strength, 'low', 'high'), 'tensile / puncture'],
    ['MAP suitability', mapSuitable, 'modified atmosphere'],
    ['Temperature range', mat.tempRange || '—', 'storage & transport'],
    ['Food-contact safe', mat.foodSafe ? '✅ Yes' : '⚠️ Verify', 'FSSAI / FDA / EU'],
  ];
  tbody.innerHTML = rows.map((r) =>
    `<tr><td>${r[0]}</td><td class="spec-val">${r[1]}</td><td class="spec-note">${r[2]}</td></tr>`).join('');
}

function formatOTR(mat, req) {
  let val = mat.otr;
  if (req.needO2 > 8) val = Math.min(val, 5);
  else if (req.needO2 > 6) val = Math.min(val, 60);
  else if (req.needO2 < 3) val = Math.max(val, 1500);
  return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val;
}

function formatWVTR(mat, req) {
  let val = mat.wvtr;
  if (req.needMoisture > 8) val = Math.min(val, 2);
  else if (req.needMoisture > 6) val = Math.min(val, 12);
  else if (req.needMoisture < 3) val = 120;
  return val >= 100 ? Math.round(val) : val.toFixed(1);
}

function rating(val, low, high) {
  return val >= 7.5 ? `${high} (${val}/10)` : val >= 5 ? `Moderate (${val}/10)` : `${low} (${val}/10)`;
}

/* ---- MAP ---- */
function renderMAP(d, req, cands) {
  const panel = $('#mapPanel');
  if (!req.isFresh) { panel.hidden = true; return; }
  panel.hidden = false;
  const map = recommendMAP(d.respiration);
  const gas = $('#gasBlend');
  gas.innerHTML = `
    <div class="gas-pill o2"><div class="g-val">${map.o2}%</div><div class="g-name">Oxygen (O₂)</div></div>
    <div class="gas-pill co2"><div class="g-val">${map.co2}%</div><div class="g-name">Carbon Dioxide (CO₂)</div></div>
    <div class="gas-pill n2"><div class="g-val">${map.n2}%</div><div class="g-name">Nitrogen (N₂)</div></div>`;
  $('#mapNote').innerHTML = `<b>Film strategy:</b> ${map.perforation}. Respiration ${d.respiration} mg CO₂/kg·h ·
    recommended OTR range ${Math.round(d.respiration * 0.7)} – ${Math.round(d.respiration * 1.6)}k cc/m²·day to maintain equilibrium atmosphere.`;
}

/* ---- Shelf life ---- */
function renderShelf(d, req, mat) {
  const pred = predictShelfLife(d, req, mat);
  const pct = Math.min(100, Math.round((pred.predicted / Math.max(1, d.shelfLife)) * 100));
  drawGauge($('#shelfGauge'), pct, pred.predicted, d.shelfLife);
  const pass = pred.predicted >= d.shelfLife;
  $('#shelfText').innerHTML = pass
    ? `✅ <b>${pred.predicted} days</b> achievable vs. ${d.shelfLife} days target — requirement met with ${pct - 100}% headroom.`
    : `⚠️ Predicted <b>${pred.predicted} days</b> vs. ${d.shelfLife} days target — consider barrier upgrade (PET/foil laminate) or colder storage.`;
}

function drawGauge(canvas, pct, achieved, target) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H - 22, R = 74;
  const start = Math.PI, end = 0;
  const p = Math.max(0.02, Math.min(1, pct / 100));

  ctx.lineWidth = 16; ctx.lineCap = 'round';
  ctx.strokeStyle = '#e2e8f0';
  ctx.beginPath(); ctx.arc(cx, cy, R, start, end); ctx.stroke();

  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#f59e0b'); grad.addColorStop(pct >= 100 ? 0.5 : 0.9, pct >= 100 ? '#10b981' : '#f59e0b'); grad.addColorStop(1, '#10b981');
  ctx.strokeStyle = grad;
  ctx.beginPath(); ctx.arc(cx, cy, R, start, start + p * Math.PI); ctx.stroke();

  ctx.fillStyle = '#0f172a'; ctx.font = '800 30px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(`${achieved} d`, cx, cy - 8);
  ctx.fillStyle = '#64748b'; ctx.font = '600 11px Inter, sans-serif';
  ctx.fillText(`target ${target} days`, cx, cy + 16);
}

/* ---- Sustainability ---- */
function renderSustainability(mat) {
  const s = sustainabilityReport(mat);
  const rows = [
    ['Recyclability', s.recyclablePct, 'green'],
    ['Eco-friendliness index', s.ecoScore, 'blue'],
    ['Circularity / compostability', mat.compostable ? 85 : mat.recyclable === 'hard' ? 35 : 55, 'amber'],
  ];
  $('#sustainabilityMeters').innerHTML = rows.map((r, i) => `
    <div class="sustain-row">
      <div class="sus-top"><span>${r[0]}</span><span>${r[1]}%</span></div>
      <div class="sus-track"><div class="sus-fill ${r[2]}" style="width:0%" data-w="${r[1]}"></div></div>
    </div>`).join('');
  setTimeout(() => { $$('#sustainabilityMeters .sus-fill').forEach((f) => f.style.width = f.dataset.w + '%'); }, 150);

  $('#ecoAlt').innerHTML = mat.compostable
    ? `🌱 <b>Compostable option:</b> ${mat.name} is certified compostable — ideal if your supply chain supports industrial composting.`
    : `♻️ <b>Eco alternative:</b> ${mat.recyclable === false ? 'PLA/PBAT biodegradable film' : 'Coated paperboard or mono-material recyclable structure'} scores higher on circularity — ask suppliers for ${mat.name} in mono-material recyclable format. Carbon footprint ≈ <b>${s.carbon} kg CO₂e/kg</b>.`;
}

/* ---- Cost ---- */
function renderCost(d, req, mat) {
  const c = costEstimate(d, mat, req);
  $('#costRows').innerHTML = `
    <div class="cost-row"><span>Resin weight (${c.gramsPerPack} g/pack)</span><strong>₹${c.resinCost}</strong></div>
    <div class="cost-row"><span>Conversion & lamination</span><strong>₹${c.conversion}</strong></div>
    <div class="cost-row"><span>Printing & finishing</span><strong>₹${c.printing}</strong></div>
    <div class="cost-row total"><span>Estimated pack cost</span><strong>₹${c.total}</strong></div>`;
}

/* ---- QR ---- */
function renderQR(d, mat) {
  const canvas = $('#qrCanvas');
  const ctx = canvas.getContext('2d');
  const payload = JSON.stringify({
    app: 'PackAI', vid: 1, id: 'PK-' + Date.now().toString(36).toUpperCase(),
    commodity: d.commodity, category: d.category, material: mat.id,
    storage: d.storageType + '@' + d.temperature + 'C', shelf: d.shelfLife + 'd',
    moisture: d.moisture + '%', oil: d.oil + '%', pH: d.pH,
  });
  $('#qrPayload').textContent = payload;
  drawQR(canvas, payload);
}

function drawQR(canvas, text) {
  const ctx = canvas.getContext('2d');
  const N = 21;
  const size = canvas.width;
  const cell = size / N;
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size);

  // deterministic hash
  let seed = 0;
  for (let i = 0; i < text.length; i++) seed = (seed * 31 + text.charCodeAt(i)) >>> 0;
  const rnd = () => { seed = (seed * 1103515245 + 12345) >>> 0; return seed / 4294967296; };

  ctx.fillStyle = '#0f172a';
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const inFinder = (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7);
      if (inFinder) continue;
      if (rnd() > 0.52) ctx.fillRect(c * cell + 0.4, r * cell + 0.4, cell - 0.8, cell - 0.8);
    }
  }
  const finder = (x, y) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x * cell, y * cell, 7 * cell, 7 * cell);
    ctx.fillStyle = '#fff';
    ctx.fillRect((x + 1) * cell, (y + 1) * cell, 5 * cell, 5 * cell);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect((x + 2) * cell, (y + 2) * cell, 3 * cell, 3 * cell);
  };
  finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
}

/* ============================================================
   9. REPORT DOWNLOAD
   ============================================================ */
$('#downloadBtn').addEventListener('click', () => {
  if (!lastResult) return;
  const { d, top } = lastResult;
  const req = lastResult.req;
  const map = req.isFresh ? recommendMAP(d.respiration) : null;
  const pred = predictShelfLife(d, req, top.mat);
  const rows = $$('#specTable tbody tr');
  let specText = '';
  rows.forEach((r) => { const tds = r.querySelectorAll('td'); specText += `  • ${tds[0].textContent}: ${tds[1].textContent} (${tds[2].textContent})\n`; });

  const report = `PACKAI — PACKAGING RECOMMENDATION REPORT
=============================================
Generated: ${new Date().toLocaleString()}

COMMODITY
  Category         : ${d.category} (${COMMODITY_DB[d.category].label})
  Commodity        : ${d.commodity}
  Moisture         : ${d.moisture} %
  Oil / Fat        : ${d.oil} %
  pH               : ${d.pH}
  Respiration      : ${d.respiration} mg CO2/kg·h
  Oxygen sensitivity: ${d.oxygenSensitivity}

STORAGE & DISTRIBUTION
  Storage type     : ${d.storageType}
  Temperature      : ${d.temperature} °C
  Relative humidity: ${d.humidity} %
  Transport        : ${d.transportMode}
  Target shelf life: ${d.shelfLife} days

AI RECOMMENDATION
  Top material     : ${top.mat.name} (${top.mat.full}) — AI score ${top.score}/100
  Ranked list      : ${lastResult.top3.map((c) => c.mat.name + ' (' + c.score + ')').join(' > ')}

PACKAGING SPECIFICATIONS
${specText}
${map ? `MAP GAS COMPOSITION
  O2  : ${map.o2} %
  CO2 : ${map.co2} %
  N2  : ${map.n2} %
  Strategy: ${map.perforation}

` : ''}SHELF-LIFE FORECAST
  Predicted        : ${pred.predicted} days (target ${d.shelfLife} days)

SUSTAINABILITY
  Material is ${top.mat.recyclable === true ? 'recyclable' : top.mat.recyclable === 'partial' ? 'partially recyclable' : 'not readily recyclable'}${top.mat.compostable ? ' and compostable' : ''}.

Disclaimer: Decision-support estimate. Validate with physical trials and regulatory compliance before commercialization.
`;
  const blob = new Blob([report], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `PackAI_report_${d.commodity.replace(/\s+/g, '_')}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
});

$('#newAnalysisBtn').addEventListener('click', () => {
  resultsPanel.classList.add('hidden');
  formPanel.classList.remove('hidden');
  window.scrollTo({ top: $('#analyzer').offsetTop - 90, behavior: 'smooth' });
});

/* ============================================================
   10. Material database section
   ============================================================ */
function renderDB() {
  const grid = $('#dbGrid');
  grid.innerHTML = '';
  const q = $('#dbSearch').value.trim().toLowerCase();
  const f = $('#dbFilter').value;
  MATERIAL_DB.filter((m) => (f === 'all' || m.cat === f))
    .filter((m) => !q || m.name.toLowerCase().includes(q) || m.full.toLowerCase().includes(q) ||
      m.notes.toLowerCase().includes(q) || m.catLabel.toLowerCase().includes(q))
    .forEach((m) => {
      const s = sustainabilityReport(m);
      const el = document.createElement('div');
      el.className = 'db-card';
      el.innerHTML = `
        <div class="db-card-head">
          <div><h4>${m.name}</h4><small>${m.full}</small></div>
          <span class="db-cat ${m.cat}">${m.catLabel}</span>
        </div>
        <div class="db-specs">
          <div><span>OTR</span><b>${m.otr >= 1000 ? (m.otr / 1000).toFixed(1) + 'k' : m.otr} cc/m²·d</b></div>
          <div><span>WVTR</span><b>${m.wvtr} g/m²·d</b></div>
          <div><span>Density</span><b>${m.density} g/cc</b></div>
          <div><span>Temp range</span><b>${m.tempRange}</b></div>
          <div><span>Est. cost</span><b>₹${m.price}/g</b></div>
          <div><span>Eco index</span><b>${s.ecoScore}/100</b></div>
        </div>
        <div class="db-meta">
          <span class="db-chip ${m.recyclable ? 'yes' : 'no'}">♻ ${m.recyclable === true ? 'Recyclable' : m.recyclable === 'partial' ? 'Partially' : 'Not recycled'}</span>
          <span class="db-chip ${m.compostable ? 'yes' : 'no'}">🌱 ${m.compostable ? 'Compostable' : 'Not compostable'}</span>
          <span class="db-chip yes">✓ Food-safe</span>
        </div>`;
      grid.appendChild(el);
    });
  if (!grid.children.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:2rem;">No materials match your search. Try another term.</p>';
  }
}

$('#dbSearch').addEventListener('input', renderDB);
$('#dbFilter').addEventListener('change', renderDB);

/* ============================================================
   11. UI behaviours
   ============================================================ */
// errors
function showErrors(errors) {
  const box = $('#formErrors');
  box.innerHTML = errors.map((e) => `<div class="form-error-item">⚠ ${e}</div>`).join('');
  $('#analyzeBtn').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function clearErrors() { $('#formErrors').innerHTML = ''; }

// reset
$('#resetBtn').addEventListener('click', () => {
  clearErrors();
  setTimeout(() => {
    ['moisture', 'oil', 'pH', 'temperature', 'humidity', 'shelfLife', 'respiration'].forEach((id) => {
      const r = $(`#${id}Range`), n = $(`#${id}`);
      if (r && n) { const v = n.value, mn = +r.min, mx = +r.max; r.style.setProperty('--fill', ((v - mn) / (mx - mn)) * 100 + '%'); }
    });
  }, 0);
});

// navbar scroll + toggle
const navbar = $('#navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
  $('#scrollProgress').style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
});
$('#navToggle').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
$$('#navLinks a').forEach((a) => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

// reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('visible'); revealObserver.unobserve(en.target); } });
}, { threshold: 0.12 });
$$('.reveal').forEach((el) => revealObserver.observe(el));

// FAQ accordion
$$('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const open = item.classList.contains('open');
    $$('.faq-item').forEach((i) => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
    if (!open) {
      item.classList.add('open');
      item.querySelector('.faq-a').style.maxHeight = item.querySelector('.faq-a').scrollHeight + 'px';
    }
  });
});

/* ============================================================
   12. Init
   ============================================================ */
populateCategories();
['moisture', 'oil', 'pH', 'respiration', 'temperature', 'humidity', 'shelfLife'].forEach(wireRange);
// default state
categorySelect.value = 'fresh-fruits';
populateCommodities('fresh-fruits');
setVal('respiration', 55, 1, 300);
setVal('temperature', 4, -40, 45);
setVal('moisture', 92, 0, 100);
setVal('oil', 0.3, 0, 100);
setVal('pH', 3.5, 0, 14);
setVal('humidity', 90, 0, 100);
renderDB();