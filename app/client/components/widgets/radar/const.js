export const LEGEND_COLORS = {
  IMPORTANCE: '#0075B7',
  SATISFACTION: '#33BCDB'
};

const CLEAR = 'Clear';
const CREATIVE = 'Creative';
const CONVENIENT = 'Convenient';
const CARING = 'Caring';
const COURTEGIOUS = 'Courtegious';
const CONFIDENT = 'Confident';
const COMPENSATING = 'Compensating';
const COST_CONSCIOUS = 'Cost conscious';

const RATIONAL = 'Rational';
const PROCESS = 'Process';
const FEELING = 'Feeling';
const RESULT = 'Result';

export const FEATURES = {
  ID_NAME: {
    1: CARING,
    2: CONVENIENT,
    3: CREATIVE,
    4: CLEAR,
    5: COST_CONSCIOUS,
    6: COMPENSATING,
    7: CONFIDENT,
    8: COURTEGIOUS
  },
  NAME_ID: {
    [CARING]: 1,
    [CONVENIENT]: 2,
    [CREATIVE]: 3,
    [CLEAR]: 4,
    [COST_CONSCIOUS]: 5,
    [COMPENSATING]: 6,
    [CONFIDENT]: 7,
    [COURTEGIOUS]: 8
  },
  NAMES: {
    CLEAR,
    CREATIVE,
    CONVENIENT,
    CARING,
    COURTEGIOUS,
    CONFIDENT,
    COMPENSATING,
    COST_CONSCIOUS
  },
  COLORS: {
    [CLEAR]: '#EF6363',
    [CREATIVE]: '#F07E68',
    [CONVENIENT]: '#FFAF5F',
    [CARING]: '#69BE60',
    [COURTEGIOUS]: '#13BE99',
    [CONFIDENT]: '#4CB1E9',
    [COMPENSATING]: '#8E97F1',
    [COST_CONSCIOUS]: '#B96E9F'
  },
  ICONS: {
    [CLEAR]: '/assets/svg/features/clear.svg',
    [CREATIVE]: '/assets/svg/features/creative.svg',
    [CONVENIENT]: '/assets/svg/features/convenient.svg',
    [CARING]: '/assets/svg/features/care.svg',
    [COURTEGIOUS]: '/assets/svg/features/courtegious.svg',
    [CONFIDENT]: '/assets/svg/features/confident.svg',
    [COMPENSATING]: '/assets/svg/features/compensating.svg',
    [COST_CONSCIOUS]: '/assets/svg/features/cost.svg'
  },
  BACKGROUND: {
    [CLEAR]: 'linear-gradient(135deg, #ec5858, #ff9898)',
    [CREATIVE]: 'linear-gradient(to right, #f27872, #ee8e4c)',
    [CONVENIENT]: 'linear-gradient(316deg, #ffcd87, #ffa24d)',
    [CARING]: 'linear-gradient(115deg, #5ebb6b, #c2d201)',
    [COURTEGIOUS]: 'linear-gradient(123deg, #14bc97, #14d6ab)',
    [CONFIDENT]: 'linear-gradient(322deg, #33bcdb, #1974b2)',
    [COMPENSATING]: 'linear-gradient(135deg, #8166e9, #95b2f5)',
    [COST_CONSCIOUS]: 'linear-gradient(to left, #df879a, #b068a0)'
  }
};

export const CATEGORIES = {
  ID_NAME: {
    1: PROCESS,
    2: RATIONAL,
    3: RESULT,
    4: FEELING
  },
  NAME_ID: {
    [PROCESS]: 1,
    [RATIONAL]: 2,
    [RESULT]: 3,
    [FEELING]: 4
  },
  NAMES: {
    RATIONAL,
    PROCESS,
    FEELING,
    RESULT
  },
  COLORS: {
    [RATIONAL]: '#F57575',
    [PROCESS]: '#FACF55',
    [FEELING]: '#5EBB6B',
    [RESULT]: '#B96CE3'
  },
  ICONS: {
    [RATIONAL]: '/assets/svg/categories/puzzle.svg',
    [PROCESS]: '/assets/svg/categories/cogs.svg',
    [FEELING]: '/assets/svg/categories/hand-heart.svg',
    [RESULT]: '/assets/svg/categories/bullseye-arrow.svg'
  },
  BACKGROUND: {
    [RESULT]: '#B96CE3',
    [FEELING]: '#5EBB6B',
    [PROCESS]: '#FACF55',
    [RATIONAL]: '#F57575'
  },
  FEATURES: {
    [RATIONAL]: [CREATIVE, CLEAR, COST_CONSCIOUS],
    [PROCESS]: [CARING, CONVENIENT, CREATIVE],
    [FEELING]: [CARING, COURTEGIOUS, CONFIDENT],
    [RESULT]: [CONFIDENT, COMPENSATING, COST_CONSCIOUS]
  }
};
0;
const a = 600;
const factor = 0.4; // For categories bars that overflow chart

const emptyArr = Object.values(FEATURES.NAMES).map((x) => ({ x, y: null }));
const emptyData = {
  featuresDetails: null,
  categoriesDetails: null,
  grades: [emptyArr, emptyArr]
};

export const PROPS = {
  a,
  factor,
  emptyData,
  p: (a / 2) * factor, // Padding
  domain: { y: [0, 10] },
  tooltipTriggerRadius: 20
};
