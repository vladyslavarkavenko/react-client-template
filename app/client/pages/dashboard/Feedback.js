import React from 'react';
import { connect } from 'react-redux';

import { fetchFeedback } from '../../modules/dashboard/dashboardActions';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';

import FeedbackItem from './feedback/FeedbackItem';
import WidgetPlaceholder from '../../components/widgets/WidgetPlaceholder';
import FeedbackSvg from '../../../../public/assets/svg/user-chart.duotone.svg';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.maxLength = 3;

    this.state = {
      showAll: false
    };

    this.increaseShowCount = this.increaseShowCount.bind(this);
  }

  componentDidMount() {
    const { fetchFeedback } = this.props;

    fetchFeedback && fetchFeedback();
  }

  increaseShowCount() {
    this.setState({
      showAll: true
    });
  }

  render() {
    const { feedback, status } = this.props;
    const { showAll } = this.state;

    if (status === 'request') {
      return <LoaderBlock />;
    }

    if (!feedback || feedback.results.length === 0) {
      return <WidgetPlaceholder icon={<FeedbackSvg />} title="No Feedback Yet" />;
    }

    const list = feedback.results
      .slice(0, showAll ? feedback.results.length : this.maxLength)
      .map((data) => <FeedbackItem data={data} key={`${data.id}_${data.datetime}_f`} />);

    return (
      <div className="feedback-block">
        {feedback && <ul>{list}</ul>}
        {feedback.results.length > list.length && (
          <button className="see-more" onClick={this.increaseShowCount}>
            See More <span>→</span>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  feedback: dashboardSelectors.feedback(state),
  status: dashboardSelectors.feedbackStatus(state)
});

export default connect(
  mapStateToProps,
  { fetchFeedback }
)(Feedback);
