function parseLinesData(data) {
  const { main, compare } = data;
  return [
    {
      domain: 100,
      values: [main.profile.avgSatisfaction, compare.profile.avgSatisfaction],
      withPercent: true,
      title: 'Satisfied clients'
    },
    {
      values: [main.profile.numberOpinions, compare.profile.numberOpinions],
      title: 'Current number of cTRU feedback'
    }
  ];
}

export default parseLinesData;
