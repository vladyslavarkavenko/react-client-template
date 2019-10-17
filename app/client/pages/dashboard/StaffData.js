import React from 'react';
import { connect } from 'react-redux';

import { fetchActiveStaff } from '../../modules/dashboard/dashboardActions';
import dashboardSelectors from '../../modules/dashboard/dashboardSelectors';

const arr = [
  {
    id: Math.random(),
    avatar: 'http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg',
    name: 'Rene Maier',
    title: 'Client advisor, since 1996 at Clientis',
    rating: Math.floor(Math.random() * 100) / 10,
    avgSatisfaction: Math.floor(Math.random() * 1000) / 100,
    statistics: [{ x: 0, y: 0 }, { x: 12, y: 10 }]
  }
];

function parseStaff(data) {
  console.log('data', data);
  return arr;
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
