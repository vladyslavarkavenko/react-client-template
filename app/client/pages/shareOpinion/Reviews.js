import React from 'react';
import { connect } from 'react-redux';
import OpinionAboutBlock from './OpinionAboutBlock';
import RecommendBlock from './reviews/RecommendBlock';
import RateForm from './reviews/RateForm';
import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';

function Reviews({ withComments }) {
  return (
    <section className="rate-opinion content">
      <OpinionAboutBlock />
      <RecommendBlock withComments={withComments} />
      {withComments && <RateForm />}
    </section>
  );
}

const mapStateToProps = (state) => {
  const { withComments } = shareOpinionSelectors.selectedOptions(state);
  return {
    withComments
  };
};

export default connect(mapStateToProps)(Reviews);
