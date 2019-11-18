import React from 'react';
import { Link } from 'react-router-dom';

import Confirmed from './Confirmed';
import routing from '../../../utils/routing';
import { RATE_PROFILE_TYPE } from '../../../utils/constants';
import GradeCircle from '../../../components/ui-components/GradeCircle';

const { MANAGER, COMPANY } = RATE_PROFILE_TYPE;

export default function ProfileBlock({
  to,
  id,
  name,
  type,
  title,
  count,
  score,
  grades,
  avatar,
  confirmed,
  withContact,
  description,
  shareOpinion
}) {
  return (
    <li className="block">
      <Link to={to}>
        <div className="d-flex mb-1">
          <div className={`avatar mr-1 ${type === MANAGER ? 'circle' : ''}`}>
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
          {shareOpinion ? (
            <Link className="block-btn" to={routing({ id, type }).shareOpinionWithProfile}>
              Share your opinion
            </Link>
          ) : (
            <span className="arrow" />
          )}
          {withContact && (
            <Link
              to={
                type === MANAGER ? routing(id).managerProfileAbout : routing(id).companyProfileAbout
              }
              className="block-btn ml-2"
            >
              Contact
            </Link>
          )}
          {type === COMPANY && (
            <div className="ctru-score flex-center">
              <div className="info">
                <h2>cTRU score</h2>
                <p>{count} feedback</p>
              </div>
              <GradeCircle score={score} />
            </div>
          )}
        </div>
        <ul className="grades">
          {grades.map(({ grade, topic, color }) => (
            <li
              key={`${type}_${id}_${topic}`}
              style={{
                color: `rgb(${color.join()})`,
                background: `rgb(${color.join()}, .1)`
              }}
            >
              {`${topic} – ${grade.toFixed(1)}`}
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
}
