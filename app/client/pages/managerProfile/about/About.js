import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import Contacts from '../../profile/components/Contacts';
import companiesSelectors from '../../../modules/companies/companiesSelectors';
import managerProfileSelectors from '../../../modules/managerProfile/managerProfileSelectors';

function About({ manager, company }) {
  const { email, phone, about } = manager;
  const { web } = company;
  return (
    <section className="content-body">
      <main className="main">
        <BlockWrapper title="Portrait">{about || '-'}</BlockWrapper>
      </main>
      <aside className="sidebar">
        <BlockWrapper title="Contacts">
          <Contacts email={email} phone={phone} web={web} />
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
    company: companiesSelectors.findCompanyByManager(state, id),
    manager: managerProfileSelectors.manager(state).data
  };
};

export default connect(mapStateToProps)(About);
