import React from 'react';
import { connect } from 'react-redux';
import OpinionAboutBlock from './OpinionAboutBlock';
import RecommendBlock from './reviews/RecommendBlock';
import RateForm from './reviews/RateForm';
// import shareOpinionSelectors from '../../modules/shareOpinion/shareOpinionSelectors';

/* eslint-disable */
class Reviews extends React.Component {
  render() {
    const { withComments } = this.props;
    return (
      <section className="rate-opinion content">
        <OpinionAboutBlock />
        <RecommendBlock withComments={withComments} />
        <RateForm withComments={withComments} />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  // const { withComments } = shareOpinionSelectors.selectedOptions(state);
  const withComments = true;
  return {
    withComments
  };
};

export default connect(mapStateToProps)(Reviews);
