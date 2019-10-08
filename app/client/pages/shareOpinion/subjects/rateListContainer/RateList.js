import React from 'react';
import i18next from 'i18next';

import RateListHeading from './rateList/RateListHeading';
import RateListItem from './rateList/RateListItem';
import { RATE_PROFILE_TYPE } from '../../../../utils/constants';

const { MANAGER, COMPANY } = RATE_PROFILE_TYPE;

export default class RateList extends React.Component {
  componentDidMount() {
    const { companies, managers, handleSelect } = this.props;

    if (companies.length) {
      //select first company in the list
      handleSelect({ data: companies[0], type: COMPANY });
    } else if (managers.length) {
      //select first manager in the list
      handleSelect({ data: managers[0], type: MANAGER });
    }
  }

  render() {
    const { companies, managers, selected, handleSelect } = this.props;

    const companiesList = companies.map((company) => (
      <RateListItem
        key={`${company.id}_c`}
        data={company}
        selected={selected}
        handleSelect={handleSelect}
        isCompany
      />
    ));

    const managersList = managers.map((manager) => (
      <RateListItem
        key={`${manager.id}_m`}
        data={manager}
        selected={selected}
        handleSelect={handleSelect}
      />
    ));

    return (
      <ul className="rate-list">
        {companiesList.length !== 0 && (
          <>
            <RateListHeading>{i18next.t('shareOpinion.my.companies')}</RateListHeading>
            {companiesList}
          </>
        )}

        {managersList.length !== 0 && (
          <>
            <RateListHeading>{i18next.t('shareOpinion.my.managers')}</RateListHeading>
            {managersList}
          </>
        )}
      </ul>
    );
  }
}
