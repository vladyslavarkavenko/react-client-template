import React from 'react';
import { connect } from 'react-redux';
import RateComment from './rateForm/RateComment';
import RadioGroup from './rateForm/RadioGroup';
import shareOpinionSelectors from '../../../modules/shareOpinion/shareOpinionSelectors';
import {
  pushUpdateTopics,
  selectWhoCanSee,
  selectExpectAction,
  saveTopicField,
  selectTopicReview
} from '../../../modules/shareOpinion/shareOpinionActions';
import ButtonFullBlock from '../../../components/ui-components/Form/ButtonFullBlock';

const whoCanSeeOptions = [
  { value: 1, title: 'All' },
  { value: 2, title: 'Provider' },
  { value: 3, title: 'Only cTRU' }
];

const expectActionOptions = [{ value: true, title: 'Yes' }, { value: false, title: 'No' }];

class RateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: {}
    };

    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFile({ id, file, fileName, isDelete }) {
    this.setState((prevState) => {
      let files = {};

      if (isDelete) {
        Object.keys(prevState.files).forEach((stateId) => {
          if (Number(stateId) !== id) {
            files[stateId] = prevState.files[stateId];
          }
        });
      } else {
        files = { ...prevState.files, [id]: { file, fileName } };
      }

      return { files };
    });
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    const { handleFinish } = this.props;
    const { files } = this.state;

    handleFinish(files);
  }

  render() {
    const {
      whoCanSee,
      selectWhoCanSee,
      expectingAction,
      selectExpectAction,
      saveTopicField,
      selectTopicReview,
      topics,
      status
    } = this.props;

    const { files } = this.state;

    const isRequest = status === 'request';

    const options = topics.map((topic) => (
      <RateComment
        key={topic.id}
        file={files[topic.id]}
        topic={topic}
        handleChangeFile={this.handleChangeFile}
        handleChangeText={saveTopicField}
        handleCheck={selectTopicReview}
        disabled={isRequest}
      />
    ));

    return (
      <>
        <form onSubmit={this.handleSubmit} className="opinion-form">
          <div className="container">
            <p className="opinion-form__title">Add Comment</p>
            <div className="opinion-form__block">
              <p className="opinion-form__subtitle">
                Select criterias that connect to this situation
              </p>

              {options}

              <p className="opinion-form__subtitle">Who can see the comment?</p>
              <div className="container half">
                <RadioGroup
                  name="see_comment"
                  options={whoCanSeeOptions}
                  handleChange={selectWhoCanSee}
                  selected={whoCanSee}
                  disabled={isRequest}
                />
              </div>

              <p className="opinion-form__subtitle">
                Do you expect for actions from the service provider?
              </p>

              <div className="container half">
                <RadioGroup
                  name="see_comment"
                  options={expectActionOptions}
                  handleChange={selectExpectAction}
                  selected={expectingAction}
                  disabled={isRequest}
                />
              </div>
            </div>
          </div>
        </form>

        <ButtonFullBlock
          title={isRequest ? 'Sending' : 'Send comment'}
          handleClick={this.handleSubmit}
          disabled={isRequest}
        />
      </>
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
  saveTopicField,
  selectWhoCanSee,
  selectExpectAction,
  selectTopicReview
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateForm);
