export default {
  radarData: (state) => {
    const { isInitial, grades, featuresDetails, categoriesDetails } = state.profile;

    return { isInitial, grades, featuresDetails, categoriesDetails };
  },
  avgSatisfaction: (state) => state.profile.avgSatisfaction
};
