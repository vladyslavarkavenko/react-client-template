import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import routing from '../../utils/routing';
import companiesSelectors from '../../modules/companies/companiesSelectors';
import authSelectors from '../../modules/auth/authSelectors';
import CONST from '../../utils/constants';

const {
  ROLES: { CUSTOMER }
} = CONST;

function parseCompanies(companies) {
  const newData = [];

  companies.forEach((company) => {
    const { manager } = company;

    {
      const { id, name, avgSatisfaction, avatar, confirmed = true } = company;

      newData.push({
        id,
        name,
        avatar,
        confirmed,
        grades: [],
        isCompany: true,
        description: `${avgSatisfaction}% clients satisfied with the company`
      });
    }
    {
      const { id, firstName, lastName, title, avatar, confirmed = true, avgSatisfaction } = manager;

      newData.push({
        id,
        name: firstName + lastName,
        title,
        avatar,
        confirmed,
        grades: [],
        isManager: true,
        description: `${avgSatisfaction}% of the clients are satisfied with this manager`
      });
    }
  });

  return newData;
}

const Confirmed = () => (
  <div className="confirmed">
    <span className="bg-line" />
    <span className="bg-line" />
    <span className="bg-line" />
    <span className="bg-line" />
    <span className="check">✔</span>
  </div>
);

const Block = ({ id, isManager, avatar, name, confirmed, title, description, grades }) => (
  <li className="block">
    <Link to={isManager ? routing(id).managerProfileAbout : routing(id).companyProfileAbout}>
      <div className="d-flex mb-1">
        <div className={`avatar mr-1 ${isManager ? 'circle' : ''}`}>
          <img src={avatar} alt="Avatar" />
        </div>
        <div>
          <div className="name d-flex ai-center">
            <h2>{name}</h2>
            {confirmed && <Confirmed />}
          </div>
          {title && <p className="title">{title}</p>}
          <p className="description">{description}</p>
        </div>
        <span className="arrow" />
      </div>
      <ul className="grades">
        {grades.map(({ grade, topic, color }) => (
          <li
            style={{
              color: `rgb(${color.join()})`,
              background: `rgb(${color.join()}, .1)`
            }}
          >
            {grade}
            {isManager ? '–' : ''}
            {topic}
          </li>
        ))}
      </ul>
    </Link>
  </li>
);

const Opinions = ({ companies, activeRole }) => {
  if (activeRole !== CUSTOMER) {
    return (
      <div className="opinions">
        <div className="empty-header">
          <h1>Opinions</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="opinions">
      <div className="empty-header">
        <h1>Opinions</h1>
      </div>
      <div className="body">
        <ul>
          {parseCompanies(companies).map((datum) => (
            <Block key={datum.id} {...datum} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeRole: authSelectors.activeRole(state),
  companies: companiesSelectors.getCompaniesForActiveRole(state)
});

export default connect(mapStateToProps)(Opinions);
