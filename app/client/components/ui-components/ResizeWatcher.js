import React from 'react';
import { connect } from 'react-redux';

import { deviceChange } from '../../modules/device/deviceActions';

class ResizeWatcher extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const { deviceChange } = this.props;
    deviceChange({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  deviceChange
};

export default connect(
  null,
  mapDispatchToProps
)(ResizeWatcher);
