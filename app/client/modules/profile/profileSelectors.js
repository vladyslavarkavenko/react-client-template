export default {
  radarStatus: (state) => state.profile.status,
  radarData: (state) => {
    const { isInitial, grades, featuresDetails, categoriesDetails } = state.profile.data;

    return { isInitial, grades, featuresDetails, categoriesDetails };
  },
  avgSatisfaction: (state) => state.profile.data.avgSatisfaction,
  detailsData: (state) => state.profile.data.detailsData,
  mainAspects: (state) => state.profile.mainAspects,
  mainCriteria: (state) => state.profile.mainCriteria,
  mainSubjects: (state) => state.profile.mainSubjects,
  mainOpinions: (state) => state.profile.mainOpinions
};
