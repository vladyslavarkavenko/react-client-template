import { minMaxRandom } from '../../../utils/helpers';

export default function normalizeStaff(data) {
  return data.map(({ userData: { avatar, name, title, email }, avgSatisfaction, ctruScore }) => ({
    avatar: avatar || '/assets/img/empty-avatar.jpg',
    name,
    title,
    email,
    rating: Math.floor(ctruScore * 10) / 10,
    statistics: minMaxRandom(-100, 100),
    avgSatisfaction
  }));
}
