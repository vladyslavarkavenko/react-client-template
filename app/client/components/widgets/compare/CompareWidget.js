import React from 'react';
import { Link } from 'react-router-dom';

import StaffSelect from './StaffSelect';
import routing from '../../../utils/routing';
import { ROUTING_PARAMS } from '../../../utils/constants';

export default class CompareWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstStaff: null,
      secondStaff: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ value, field }) {
    this.setState({
      [field]: value
    });
  }

  render() {
    const { firstStaff, secondStaff } = this.state;
    const { staff } = this.props;

    const options = staff
      .filter((item) => {
        return (
          item.id !== (firstStaff && firstStaff.id) && item.id !== (secondStaff && secondStaff.id)
        );
      })
      .map((item) => ({
        label: item.fullName,
        id: item.id
      }));

    const compareLink =
      firstStaff &&
      secondStaff &&
      routing({ type: ROUTING_PARAMS.MANAGER, ids: [firstStaff.id, secondStaff.id] }).compare;

    return (
      <div className="compare-widget">
        <p className="compare-widget__title">Name of manager</p>
        <StaffSelect
          options={options}
          handleChange={this.handleChange}
          selected={firstStaff}
          field="firstStaff"
        />

        <p className="compare-widget__title">Name of manager</p>
        <StaffSelect
          options={options}
          handleChange={this.handleChange}
          selected={secondStaff}
          field="secondStaff"
        />

        <div className="compare-widget__ctrl">
          {firstStaff && secondStaff && (
            <Link to={compareLink} className="compare-widget__btn">
              Compare
            </Link>
          )}
        </div>
      </div>
    );
  }
}
