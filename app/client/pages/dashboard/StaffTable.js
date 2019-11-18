import React from 'react';
import { connect } from 'react-redux';

import StaffRow from './staffTable/StaffRow';
import { fetchActiveStaff } from '../../modules/dashboard/dashboardActions';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';
import StaffIcon from '../../../../public/assets/svg/user-friends.duotone.svg';
import WidgetPlaceholder from '../../components/widgets/WidgetPlaceholder';
import { LoaderBlock } from '../../components/ui-components/Layout/Loader';

class StaffTable extends React.Component {
  constructor(props) {
    super(props);

    this.maxLength = 3;

    this.state = {
      showAll: false
    };

    this.increaseShowCount = this.increaseShowCount.bind(this);
  }

  componentDidMount() {
    const { fetchActiveStaff } = this.props;

    fetchActiveStaff && fetchActiveStaff();
  }

  increaseShowCount() {
    this.setState({
      showAll: true
    });
  }

  render() {
    const { status, staff } = this.props;
    const { showAll } = this.state;

    if (status === 'request') {
      return <LoaderBlock />;
    }

    if (!staff || staff.length === 0) {
      return <WidgetPlaceholder icon={<StaffIcon />} title="No Staff Yet" />;
    }

    const list = staff
      .slice(0, showAll ? staff.length : this.maxLength)
      .map((item) => <StaffRow data={item} key={`${item.email}_staff`} />);

    return (
      <div className="staff-block">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Satisfied clients</th>
              <th>Statistics</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
        {staff.length > list.length && (
          <button className="see-more" onClick={this.increaseShowCount}>
            See More <span>→</span>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  staff: dashboardSelectors.staff(state),
  status: dashboardSelectors.staffStatus(state)
});

export default connect(
  mapStateToProps,
  { fetchActiveStaff }
)(StaffTable);
