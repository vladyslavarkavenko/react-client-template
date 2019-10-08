const styles = {
  container: {
    zIndex: 1
  },
  lines: {
    data: {
      fillOpacity: 0.2,
      strokeWidth: 2,
      pointerEvents: 'none'
    }
  },
  dots: {
    data: {
      strokeWidth: 1,
      stroke: 'white',
      pointerEvents: 'none'
    }
  },
  dependentAxis: {
    axisLabel: {
      padding: 10,
      cursor: 'pointer'
    },
    axis: { stroke: 'none' },
    grid: {
      stroke: 'grey',
      strokeWidth: 0.25,
      opacity: 0.15
    },
    tickLabels: { fill: 'none' }
  },
  mainAxis: {
    axis: { stroke: 'none ' },
    grid: {
      stroke: 'grey',
      opacity: 0.15
    },
    tickLabels: { fill: 'none' }
  },
  activateFeature: (fill) => ({
    data: {
      fill,
      zIndex: 3,
      fillOpacity: 0.2,
      strokeWidth: 2,
      pointerEvents: 'none'
    },
    labels: { fill: 'none' }
  }),
  activeCategory: (fill) => ({
    data: {
      fill,
      zIndex: 3,
      fillOpacity: 0.4,
      pointerEvents: 'none'
    },
    labels: { fill: 'none' }
  })
};

export default styles;
