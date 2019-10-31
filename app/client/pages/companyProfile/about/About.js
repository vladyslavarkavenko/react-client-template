import React from 'react';
import { connect } from 'react-redux';

import BlockWrapper from '../../../components/widgets/BlockWrapper';
import Contacts from '../../profile/components/Contacts';
import companiesSelectors from '../../../modules/companies/companiesSelectors';

function About({ company }) {
  const { email, phone, web, about } = company;
  return (
    <section className="content-body">
      <main className="main">
        <BlockWrapper title="Portrait">{about}</BlockWrapper>
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
    company: companiesSelectors.getCurrentCompany(state, id)
  };
};

export default connect(mapStateToProps)(About);
