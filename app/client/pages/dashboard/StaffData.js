import React from 'react';
import { connect } from 'react-redux';

import { fetchActiveStaff } from '../../modules/dashboard/dashboardActions';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';

function parseStaff(data) {
  console.log('data', data);
  return data.map(({ userData: { avatar, name, title }, avgSatisfaction, ctruScore }) => ({
    avatar: avatar || '/assets/img/empty-avatar.jpeg',
    name,
    title,
    rating: Math.floor(ctruScore * 10) / 10,
    avgSatisfaction,
    statistics: [{ x: 0, y: 0 }, { x: 12, y: 10 }]
  }));
}

class StaffData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staff: null
    };
  }

  componentDidMount() {
    const { fetchActiveStaff } = this.props;

    fetchActiveStaff && fetchActiveStaff();
  }

  componentWillReceiveProps(nextProps) {
    const { staff } = this.state;
    const { staff: nextStaff } = nextProps;

    if (!staff && nextStaff) {
      this.setState({
        staff: parseStaff(nextStaff)
      });
    }
  }

  render() {
    const { staff } = this.state;

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
          <tbody>
            {staff &&
              staff.map(({ id, avatar, name, title, rating, avgSatisfaction }) => (
                <tr key={id}>
                  <td className="d-flex ai-center">
                    <div className="avatar circle">
                      <img src={avatar} alt="Avatar" />
                    </div>
                    <div>
                      <div className="name">{name}</div>
                      <div className="title"> {title} </div>
                    </div>
                  </td>
                  <td>{rating}</td>
                  <td>{avgSatisfaction}%</td>
                  <td>
                    <div className="chart" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  staff: dashboardSelectors.staff(state)
});

export default connect(
  mapStateToProps,
  { fetchActiveStaff }
)(StaffData);
