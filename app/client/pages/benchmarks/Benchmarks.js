import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SimpleHeader from '../../components/ui-components/Layout/SimpleHeader';
import NavTabs from '../../components/ui-components/Layout/NavTabs';
import routing from '../../utils/routing';
import External from './External';
import Internal from './Internal/Internal';

const navLinks = [
  { to: routing().benchmarksInternal, title: 'Internal' },
  { to: routing().benchmarksExternal, title: 'External', disabled: true }
];

export default function Benchmarks({ match }) {
  if (match.path === routing().benchmarks) {
    return <Redirect to={routing().benchmarksInternal} />;
  }

  return (
    <section className="benchmarks">
      <SimpleHeader title="Benchmarks" />
      <NavTabs navLinks={navLinks} />
      <Switch>
        <Route path={routing().benchmarksInternal} exact component={Internal} />
        <Route path={routing().benchmarksExternal} exact component={External} />
      </Switch>
    </section>
  );
}
