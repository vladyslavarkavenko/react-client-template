import SvgHome from '../../../../../../public/assets/svg/home.svg';
import SvgEyeEmpty from '../../../../../../public/assets/svg/eye-empty.svg';
import SvgMatch from '../../../../../../public/assets/svg/match.svg';
import SvgAnalyst from '../../../../../../public/assets/svg/analyst.svg';
import SvgStaff from '../../../../../../public/assets/svg/staff.svg';
import SvgClients from '../../../../../../public/assets/svg/clients.svg';
import SvgMegaphone from '../../../../../../public/assets/svg/megaphone.svg';
import SvgLightbulb from '../../../../../../public/assets/svg/lightbulb.svg';
import routing from '../../../../utils/routing';

const navLinks = [
  {
    title: 'Dashboard',
    Icon: SvgHome,
    to: routing().dashboard
  },
  {
    title: 'Opinions',
    Icon: SvgEyeEmpty,
    to: routing().shareOpinion
  },
  {
    title: 'Matching',
    Icon: SvgMatch,
    to: routing().notFound
  },
  {
    title: 'Benchmarks',
    Icon: SvgAnalyst,
    to: routing().notFound
  },
  {
    title: 'Staff',
    Icon: SvgStaff,
    to: routing().staff
  },
  {
    title: 'My clients',
    Icon: SvgClients,
    to: routing().notFound
  },
  {
    title: 'Community',
    Icon: SvgMegaphone,
    to: routing().notFound
  },
  {
    title: 'Subjects',
    Icon: SvgLightbulb,
    to: routing().notFound
  }
];

export default navLinks;
