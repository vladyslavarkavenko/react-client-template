import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import routing from '../../utils/routing';
import companiesSelectors from '../../modules/companies/companiesSelectors';
import authSelectors from '../../modules/auth/authSelectors';
import CONST from '../../utils/constants';
import { fetchStaffStatistics } from '../../modules/opinions/opinionsActions';
import opinionsSelectors from '../../modules/opinions/opinionsSelectors';

const {
  ROLES: { CUSTOMER }
} = CONST;

function parseCompanies(companies, staffStatistics) {
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

      console.log('staffStatistics', staffStatistics, id);
      const { numberOpinions: count, ctruScore: score } = staffStatistics[id];

      newData.push({
        id,
        score: Math.floor(score * 10) / 10,
        count,
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

  console.log('newData', newData);
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

const Block = ({
  id,
  name,
  title,
  count,
  score,
  grades,
  avatar,
  confirmed,
  isManager,
  description
}) => (
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
        {isManager && (
          <div className="ctru-score flex-center">
            <div className="info">
              <h2>cTRU score</h2>
              <p>{count} feedback</p>
            </div>
            <div className="grade-circle flex-center">
              <div className="inner-circle flex-center">{score}</div>
            </div>
          </div>
        )}
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

class Opinions extends React.Component {
  componentDidMount() {
    const { staffStatistics, fetchStaffStatistics } = this.props;

    console.log('this.props', this.props);

    !staffStatistics && fetchStaffStatistics && fetchStaffStatistics();
  }

  render() {
    const { companies, staffStatistics, activeRole } = this.props;

    if (activeRole !== CUSTOMER || !staffStatistics) {
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
            {parseCompanies(companies, staffStatistics).map((datum) => (
              <Block key={datum.id} {...datum} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeRole: authSelectors.activeRole(state),
  companies: companiesSelectors.getCompaniesForActiveRole(state),
  staffStatistics: opinionsSelectors.staffStatistics(state)
});

export default connect(
  mapStateToProps,
  { fetchStaffStatistics }
)(Opinions);
