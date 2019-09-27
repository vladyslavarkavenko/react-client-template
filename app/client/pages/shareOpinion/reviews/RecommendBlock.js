import React from 'react';
import { connect } from 'react-redux';
import Alert from '../../../components/ui-components/Alert';
import YesSvg from '../../../../../public/assets/svg/check-circle.light.svg';
import NoSvg from '../../../../../public/assets/svg/times-circle.light.svg';
import AlarmClockSvg from '../../../../../public/assets/svg/alarm-clock.svg';
import shareOpinionSelectors from '../../../modules/shareOpinion/shareOpinionSelectors';
import {
  pushUpdateTopics,
  selectReviewRecommend
} from '../../../modules/shareOpinion/shareOpinionActions';

function RecommendBlock({ withComments, rate, name, handleRate, handleFinish, handleProceed }) {
  const handleRateBound = ({ currentTarget }) => {
    handleRate(Number(currentTarget.dataset.rate));
  };

  return (
    <div className="container">
      <div className="opinion-rec">
        {withComments ? (
          <p className="opinion-rec__title">
            {rate === 1 && `You are going to recommend ${name} to friends`}
            {rate === 2 && `You are not sure about ${name}`}
            {rate === 3 && `You are not going to recommend ${name} to friends`}
          </p>
        ) : (
          <>
            <p className="opinion-rec__title">Are you going to recommend {name} to friends?</p>
            <div className="opinion-rec__list">
              <button
                type="button"
                data-rate={1}
                className={`opinion-rec__btn ${rate === 1 ? 'active' : ''}`}
                onClick={handleRateBound}
              >
                <YesSvg />
                Yes
              </button>

              <button
                type="button"
                data-rate={2}
                className={`opinion-rec__btn ${rate === 2 ? 'active' : ''}`}
                onClick={handleRateBound}
              >
                <YesSvg />
                Not sure
              </button>

              <button
                type="button"
                data-rate={3}
                className={`opinion-rec__btn ${rate === 3 ? 'active' : ''}`}
                onClick={handleRateBound}
              >
                <NoSvg />
                No
              </button>
            </div>
            <div className="opinion-rec__remind">
              <button className="ask-btn">Ask me later</button>
              {false && (
                <Alert type={Alert.info} icon={<AlarmClockSvg />} message="We will ask you later" />
              )}
            </div>
            <div className="opinion-rec__actions">
              <button className="action white" onClick={() => handleFinish()}>
                Save
              </button>
              <span className="or">or</span>
              <button className="action blue" onClick={() => handleProceed()}>
                Save and add comment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { isRecommended } = shareOpinionSelectors.selectedOptions(state);
  const { name } = shareOpinionSelectors.selectedProfile(state) || {};

  return {
    name,
    rate: isRecommended
  };
};

const handleProceed = selectReviewRecommend.success;
const handleRate = selectReviewRecommend.trigger;

const mapDispatchToProps = {
  handleFinish: pushUpdateTopics,
  handleProceed,
  handleRate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendBlock);
