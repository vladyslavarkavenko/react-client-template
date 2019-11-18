import React from 'react';
import { connect } from 'react-redux';

import { pushSaveChanges } from '../../modules/kpiSettings/kpiSettingsActions';
import Button from '../../components/ui-components/Form/Button';
import kpiSettingsSelectors from '../../modules/kpiSettings/kpiSettingsSelectors';

function SaveBlock({ isChanged, handleSave }) {
  if (!isChanged) {
    return null;
  }

  return (
    <div className="kpi-options__save">
      <Button className="save-changes" onClick={() => handleSave()}>
        Save Changes
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isChanged: kpiSettingsSelectors.isChanged(state)
});

const mapDispatchToProps = {
  saveChanges: pushSaveChanges
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveBlock);
