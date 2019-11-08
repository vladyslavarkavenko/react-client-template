import React from 'react';
import { connect } from 'react-redux';

import { fetchFeedback } from '../../modules/dashboard/dashboardActions';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';

import FeedbackItem from './feedback/FeedbackItem';
import WidgetPlaceholder from '../../components/widgets/WidgetPlaceholder';
import FeedbackSvg from '../../../../public/assets/svg/user-chart.duotone.svg';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCount: 3
    };

    this.increaseShowCount = this.increaseShowCount.bind(this);
  }

  componentDidMount() {
    const { fetchFeedback } = this.props;

    fetchFeedback && fetchFeedback();
  }

  increaseShowCount() {
    this.setState((state) => ({
      showCount: state.showCount + 5
    }));
  }

  render() {
    const { feedback } = this.props;
    const { showCount } = this.state;

    if (!feedback) {
      return <WidgetPlaceholder icon={<FeedbackSvg />} title="No Feedback Yet" />;
    }

    return (
      <div className="feedback-block">
        {feedback && (
          <ul>
            {feedback.slice(0, showCount).map((d) => (
              <FeedbackItem data={d} />
            ))}
          </ul>
        )}
        {feedback.length > showCount && (
          <button className="see-more" onClick={this.increaseShowCount}>
            See More <span>→</span>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  feedback: dashboardSelectors.feedback(state)
});

export default connect(
  mapStateToProps,
  { fetchFeedback }
)(Feedback);
