import SvgHome from '../../../../../public/assets/svg/home.svg';
import SvgEyeEmpty from '../../../../../public/assets/svg/eye-empty.svg';
import SvgMatch from '../../../../../public/assets/svg/match.svg';
import SvgAnalyst from '../../../../../public/assets/svg/analyst.svg';
import SvgStaff from '../../../../../public/assets/svg/staff.svg';
import SvgClients from '../../../../../public/assets/svg/clients.svg';
import SvgMegaphone from '../../../../../public/assets/svg/megaphone.svg';
import SvgLightbulb from '../../../../../public/assets/svg/lightbulb.svg';
import routing from '../../../utils/routing';

const navLinks = [
  {
    title: 'Dashboard',
    Icon: SvgHome,
    to: routing().dashboard
  },
  {
    title: 'Opinions',
    Icon: SvgEyeEmpty,
    to: '/'
  },
  {
    title: 'Matching',
    Icon: SvgMatch,
    to: '/'
  },
  {
    title: 'Benchmarks',
    Icon: SvgAnalyst,
    to: '/'
  },
  {
    title: 'Staff',
    Icon: SvgStaff,
    to: '/'
  },
  {
    title: 'My clients',
    Icon: SvgClients,
    to: '/'
  },
  {
    title: 'Community',
    Icon: SvgMegaphone,
    to: '/'
  },
  {
    title: 'Subjects',
    Icon: SvgLightbulb,
    to: '/'
  }
];

export default navLinks;
