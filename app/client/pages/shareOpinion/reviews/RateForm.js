import React from 'react';
import { connect } from 'react-redux';
import RateComment from './RateComment';
import RadioGroup from './RadioGroup';
import shareOpinionSelectors from '../../../modules/shareOpinion/shareOpinionSelectors';
import {
  pushUpdateTopics,
  selectWhoCanSee,
  selectExpectAction
} from '../../../modules/shareOpinion/shareOpinionActions';

/* eslint-disable */
class RateForm extends React.Component {
  render() {
    const {
      whoCanSee,
      selectWhoCanSee,
      expectingAction,
      selectExpectAction,
      topics,
      withComments
    } = this.props;

    if (!withComments) {
      return null;
    }

    const options = topics.map((topic) => <RateComment key={topic.id} topic={topic} />);

    return (
      <form onSubmit={null} className="opinion-form">
        <div className="container">
          <p className="opinion-form__title">Add Comment</p>
          <div className="opinion-form__block">
            <p className="opinion-form__subtitle">
              Select criterias that connect to this situation
            </p>

            {options}

            {/*<RateComment topic={{ title: 'test 1' }} />*/}
            {/*<RateComment topic={{ title: 'test 2' }} />*/}
            {/*<RateComment topic={{ title: 'test 3' }} />*/}

            <p className="opinion-form__subtitle">Who can see the comment?</p>
            <RadioGroup
              name="see_comment"
              options={[
                { value: 1, title: 'All' },
                { value: 2, title: 'Provider' },
                { value: 3, title: 'Only cTRU' }
              ]}
              handleChange={selectWhoCanSee}
              selected={whoCanSee}
            />
            <p className="opinion-form__subtitle">
              Do you expect for actions from the service provider?
            </p>

            <RadioGroup
              name="see_comment"
              options={[{ value: true, title: 'Yes' }, { value: false, title: 'No' }]}
              handleChange={selectExpectAction}
              selected={expectingAction}
            />
            <div className="opinion-form__send">
              <button type="button" className="send-btn">
                Send comment
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { isExpectingAction, whoCanSee, status } = shareOpinionSelectors.selectedOptions(state);

  return {
    status,
    expectingAction: isExpectingAction,
    whoCanSee,
    topics: shareOpinionSelectors.selectedTopics(state)
  };
};

const mapDispatchToProps = {
  handleFinish: pushUpdateTopics,
  selectWhoCanSee,
  selectExpectAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateForm);
