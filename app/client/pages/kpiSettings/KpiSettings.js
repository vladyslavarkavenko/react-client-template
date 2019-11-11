import React from 'react';
import SimpleHeader from '../../components/ui-components/Layout/SimpleHeader';
import CtruScoreOption from './CtruScoreOption';
import SatisfactionOption from './SatisfactionOption';
import ParticipationOption from './ParticipationOption';
import NpsOption from './NpsOption';

export default function KpiSettings() {
  return (
    <>
      <SimpleHeader title="KPI Settings" />
      <div className="kpi-settings" style={{ width: '100%' }}>
        <ul className="kpi-options__list">
          <CtruScoreOption />
          <SatisfactionOption />
          <ParticipationOption />
          <NpsOption />
        </ul>
      </div>
    </>
  );
}
