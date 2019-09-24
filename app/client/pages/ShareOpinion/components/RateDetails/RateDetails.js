import React, { Component } from 'react';
import RateHeader from './RateHeader';
import NewSubjectButton from './NewSubjectButton';
import RateNotification from './RateNotification';
import { LoaderBlock } from '../../../../components/ui-components/Layout/Loader';
import SubjectItemContainer from '../Subject/SubjectItemContainer';
import ShareOpinionBlock from './ShareOpinionBlock';
import CreateTopicModal from '../Modals/CreateTopicModal';

/* eslint-disable */

export default class RateDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCreateTopicModal: false,
      withSubject: false
    };

    this.handleTopicModal = this.handleTopicModal.bind(this);
  }

  handleTopicModal(withSubject = false) {
    this.setState((prevState) => ({
      showCreateTopicModal: !prevState.showCreateTopicModal,
      withSubject: withSubject
    }));
  }

  render() {
    const {
      selectedProfile,

      subjectsStatus,
      subjectsData
    } = this.props;

    const { showCreateTopicModal, withSubject } = this.state;

    const subjectList = subjectsData.map((sub) => (
      <SubjectItemContainer key={`${sub.id}_sub`} data={sub} />
    ));

    return (
      <div className="rate-details">
        <RateHeader profile={selectedProfile} />
        <ul className="details-list">
          {subjectsStatus === 'request' ? (
            <div className="details-list__preloader">
              <LoaderBlock height="50vh" />
            </div>
          ) : (
            <>
              {showCreateTopicModal && (
                <CreateTopicModal withSubject={withSubject} handleModal={this.handleTopicModal} />
              )}

              <RateNotification />
              <NewSubjectButton handleModal={this.handleTopicModal} />
              {subjectList}

              <ShareOpinionBlock />
            </>
          )}
        </ul>
      </div>
    );
  }
}
