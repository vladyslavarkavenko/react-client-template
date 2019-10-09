import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../BlockWrapper';
import Contacts from '../../profile/components/Contacts';
import companiesSelectors from '../../../modules/companies/companiesSelectors';

function About({ manager }) {
  const { email } = manager;
  return (
    <section className="content-body">
      <main className="main">
        <BlockWrapper title="Portrait">Some text about</BlockWrapper>
      </main>
      <aside className="sidebar">
        <BlockWrapper title="Contacts">
          <Contacts email={email} phone="+380952325" web="https://some.link.com" />
        </BlockWrapper>
      </aside>
    </section>
  );
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  const {
    params: { id }
  } = match;

  return {
    manager: companiesSelectors.getCurrentManager(state, id)
  };
};

export default connect(mapStateToProps)(About);
