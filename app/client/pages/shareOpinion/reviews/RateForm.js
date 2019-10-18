import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';

import RateComment from './rateForm/RateComment';
import RadioGroup from '../../../components/ui-components/Form/RadioGroup';
import shareOpinionSelectors from '../../../modules/shareOpinion/shareOpinionSelectors';
import {
  pushUpdateTopics,
  selectWhoCanSee,
  selectExpectAction,
  saveTopicField,
  selectTopicReview,
  setSharedComment
} from '../../../modules/shareOpinion/shareOpinionActions';
import ButtonFullBlock from '../../../components/ui-components/Form/ButtonFullBlock';
import SharedComment from './rateForm/SharedComment';

const whoCanSeeOptions = [
  { value: 1, title: i18next.t('shareOpinion.whoCanSee.all') },
  { value: 2, title: i18next.t('shareOpinion.whoCanSee.provider') },
  { value: 3, title: i18next.t('shareOpinion.whoCanSee.ctru') }
];

const expectActionOptions = [
  { value: true, title: i18next.t('shareOpinion.buttons.yes') },
  { value: false, title: i18next.t('shareOpinion.buttons.no') }
];

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
      isSharedComment,
      setSharedComment,
      sharedComment,
      saveSharedComment,
      topics,
      status
    } = this.props;

    const { files } = this.state;

    const isRequest = status === 'request';

    const options =
      !isSharedComment &&
      topics.map((topic) => (
        <RateComment
          key={topic.id}
          file={files[topic.id]}
          topic={topic}
          handleChangeFile={this.handleChangeFile}
          handleChangeText={saveTopicField}
          handleCheck={selectTopicReview}
          disabled={isRequest}
          isHidden={isSharedComment}
        />
      ));

    return (
      <>
        <form onSubmit={this.handleSubmit} className="opinion-form">
          <div className="container">
            <p className="opinion-form__title">{i18next.t('shareOpinion.addComment')}</p>

            <div className="opinion-form__block">
              <p className="opinion-form__subtitle">{i18next.t('shareOpinion.criteria')}</p>

              <SharedComment
                isChecked={isSharedComment}
                handleChangeFile={this.handleChangeFile}
                handleChangeText={saveSharedComment}
                handleCheck={setSharedComment}
                file={files[-1]}
                comment={sharedComment}
                disabled={isRequest}
              />
              {options}

              <p className="opinion-form__subtitle">{i18next.t('shareOpinion.whoCanSee.title')}</p>
              <div className="container half">
                <RadioGroup
                  name="see_comment"
                  options={whoCanSeeOptions}
                  handleChange={selectWhoCanSee}
                  selected={whoCanSee}
                  disabled={isRequest}
                />
              </div>

              <p className="opinion-form__subtitle">{i18next.t('shareOpinion.expectAction')}</p>

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
          title={
            isRequest
              ? i18next.t('shareOpinion.buttons.sending')
              : i18next.t('shareOpinion.buttons.send')
          }
          handleClick={this.handleSubmit}
          disabled={isRequest}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isExpectingAction,
    whoCanSee,
    isSharedComment,
    sharedComment,
    status
  } = shareOpinionSelectors.selectedOptions(state);

  return {
    status,
    expectingAction: isExpectingAction,
    whoCanSee,
    isSharedComment,
    sharedComment,
    topics: shareOpinionSelectors.selectedTopics(state)
  };
};

const saveSharedComment = setSharedComment.success;

const mapDispatchToProps = {
  handleFinish: pushUpdateTopics,
  saveTopicField,
  selectWhoCanSee,
  selectExpectAction,
  selectTopicReview,
  setSharedComment,
  saveSharedComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateForm);
