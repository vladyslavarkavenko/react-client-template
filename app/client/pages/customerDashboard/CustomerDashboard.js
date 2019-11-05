import React from 'react';

import ShiftedHeader from '../../components/ui-components/Layout/ShiftedHeader';
import BlockWrapper from '../../components/widgets/BlockWrapper';
import ProfileList from './ProfileList';

export default function CustomerDashboard() {
  return (
    <section className="customer-dashboard">
      <ShiftedHeader title="Dashboard" />
      <section className="content-body">
        <main className="main">
          <BlockWrapper title="My banks and bankers">
            <ProfileList />
          </BlockWrapper>
        </main>
        <aside className="sidebar">Some content</aside>
      </section>
    </section>
  );
}
