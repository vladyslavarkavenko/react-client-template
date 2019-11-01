import routing from '../../../../utils/routing';

import SvgHome from '../../../../../../public/assets/svg/home.svg';
import SvgEyeEmpty from '../../../../../../public/assets/svg/eye-empty.svg';
import SvgMatch from '../../../../../../public/assets/svg/match.svg';
import SvgAnalyst from '../../../../../../public/assets/svg/analyst.svg';
import SvgStaff from '../../../../../../public/assets/svg/staff.svg';
import SvgClients from '../../../../../../public/assets/svg/clients.svg';
import SvgMegaphone from '../../../../../../public/assets/svg/megaphone.svg';
import SvgLightbulb from '../../../../../../public/assets/svg/lightbulb.svg';
import SvgCompany from '../../../../../../public/assets/svg/company.svg';
import SvgProfile from '../../../../../../public/assets/svg/user.svg';
import SvgMessages from '../../../../../../public/assets/svg/message.svg';
import SvgManager from '../../../../../../public/assets/svg/my-manager.svg';

import CONST from '../../../../utils/constants';

const { ADMIN, MANAGER, ANALYST, CUSTOMER } = CONST.ROLES;

const DASHBOARD = {
  title: 'Dashboard',
  Icon: SvgHome,
  to: routing().dashboard
};

const OPINIONS = {
  title: 'Opinions',
  Icon: SvgEyeEmpty,
  to: routing().opinions
};

const MANAGER_OPINIONS = {
  title: 'Opinions',
  Icon: SvgEyeEmpty,
  to: routing().myOpinionDetails
};

const MATCHING = {
  title: 'Matching',
  Icon: SvgMatch,
  to: routing().notFound
};

const BENCHMARKS = {
  title: 'Benchmarks',
  Icon: SvgAnalyst,
  to: routing().benchmarksInternal,
  isActive(match, { pathname }) {
    return pathname.includes(routing().benchmarks);
  }
};

const STAFF = {
  title: 'Staff',
  Icon: SvgStaff,
  to: routing().staff
};

const MY_CLIENTS = {
  title: 'My clients',
  Icon: SvgClients,
  to: routing().clients
};

const COMMUNITY = {
  title: 'Community',
  Icon: SvgMegaphone,
  to: routing().notFound
};

const SUBJECTS = {
  title: 'Subjects',
  Icon: SvgLightbulb,
  to: routing().notFound
};

const MY_PROFILE = {
  title: 'My profile',
  Icon: SvgProfile,
  to: routing().about,
  isActive(match, location) {
    const { pathname: path } = location;
    return path === routing().about || path === routing().overview;
  }
};

const MY_MANAGERS = {
  title: 'My managers',
  Icon: SvgManager,
  to: routing().myManagers
};

const MY_COMPANIES = {
  title: 'My companies',
  Icon: SvgCompany,
  to: routing().myCompanies
};

const MESSAGES = {
  title: 'Messages',
  Icon: SvgMessages,
  to: routing().messages
};

const NAV_LINKS = {
  [ADMIN]: [DASHBOARD, OPINIONS, MATCHING, BENCHMARKS, STAFF, MY_CLIENTS, COMMUNITY, SUBJECTS],
  [MANAGER]: [
    DASHBOARD,
    MANAGER_OPINIONS,
    MATCHING,
    MY_COMPANIES,
    MY_PROFILE,
    MY_CLIENTS,
    MESSAGES,
    COMMUNITY
  ],
  [ANALYST]: [DASHBOARD, OPINIONS, MATCHING, BENCHMARKS, MY_CLIENTS, COMMUNITY],
  [CUSTOMER]: [
    DASHBOARD,
    OPINIONS,
    MATCHING,
    MY_COMPANIES,
    MY_MANAGERS,
    MY_PROFILE,
    MESSAGES,
    COMMUNITY
  ]
};

export const WORKING_NAV_LINKS = {
  [ADMIN]: [DASHBOARD, BENCHMARKS, STAFF, MY_CLIENTS],
  [MANAGER]: [MY_PROFILE, MANAGER_OPINIONS],
  [ANALYST]: [DASHBOARD],
  [CUSTOMER]: [OPINIONS, MY_PROFILE, MY_MANAGERS, MY_COMPANIES]
};

export default NAV_LINKS;
