import { LINE_TYPES } from '../../modules/dashboard/helpers/constants';

const config = {
  canvasX: 1000,
  canvasY: 450,
  padding: 0,

  strokeWidth: 2,
  interpolation: 'monotoneX',

  tickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

  lineColors: {
    [LINE_TYPES.CTRU]: '#F57575',
    [LINE_TYPES.SATISFACTION]: '#938cf5',
    [LINE_TYPES.PARTICIPATION]: '#4ab74c',
    [LINE_TYPES.NPS]: '#d39e36'
  },

  baseColor: '#3ea0da',
  fontColor: '#808fa3',
  gridColor: '#808fa3',
  fontSize: '14px',
  fontFamily: 'Muli'
};

export default config;
