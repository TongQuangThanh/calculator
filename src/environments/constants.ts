import { faThermometerEmpty } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faCube } from '@fortawesome/free-solid-svg-icons';
import { faRuler } from '@fortawesome/free-solid-svg-icons';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { faBurn } from '@fortawesome/free-solid-svg-icons';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { faCompress } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const length = [{ name: 'Nanomet (nm)', value: 'nm', rate: 0.000001 }, { name: 'Micromet', value: 'um', rate: 0.001 },
                { name: 'Milimet (mm)', value: 'mm', rate: 1 },
                { name: 'Xentimet (cm)', value: 'cm', rate: 100 }, { name: 'Deximet ̣(dm)', value: 'dm' },
                { name: 'Met (m)', value: 'm' },
                { name: 'Hectomet (hm)', value: 'hm' }, { name: 'Kilomet (km)', value: 'km' }, { name: 'Inch (in)', value: 'in' },
                { name: 'Dặm (Mile)', value: 'mile' },
                { name: 'Thước Anh (Yard)', value: 'yard' }, { name: 'feet (foot)', value: 'feet' }, { name: 'Hải lý', value: 'haily' }];

const time = [{ name: 'Mili giây', value: 'ms', rate: 0.001 }, { name: 'Giây', value: 's', rate: 1 },
              { name: 'Phút', value: 'min', rate: 60 }, { name: 'Giờ', value: 'h', rate: 3600 }, { name: 'Ngày', value: 'd', rate: 86400 },
              { name: 'Tuần', value: 'w', rate: 604800 }, { name: 'Năm', value: 'y', rate: 31557600 }
];

const temperature = [
  { name: 'Kelvin', value: 'k' },
  { name: 'Độ C', value: 'c' },
  { name: 'Độ F', value: 'f' }
];

export const calculators = [
  { title: 'Thông thường', url: '/calculator/general', icon: faCalculator },
];

export const converts = [
  { title: 'Tiền tệ', url: '/convert/currency', icon: faCoins },
  // { title: 'Thể tích', url: '/convert/cube', icon: faCube, data: temperature },
  // { title: 'Độ dài', url: '/convert/length', icon: faRuler, data: length },
  // { title: 'Trọng lượng', url: '/convert/weight', icon: faBalanceScale },
  { title: 'Nhiệt độ', url: '/convert/temperature', icon: faThermometerEmpty, data: temperature },
  // { title: 'Năng lượng', url: '/convert/energy', icon: faBurn },
  // { title: 'Diện tích', url: '/convert/square', icon: faVectorSquare },
  // { title: 'Tốc độ', url: '/convert/speed', icon: faTachometerAlt },
  { title: 'Thời gian', url: '/convert/time', icon: faClock, base: 's', data: time },
  // { title: 'Nguồn điện', url: '/convert/power', icon: faBolt },
  // { title: 'Dữ liệu', url: '/convert/data', icon: faServer },
  // { title: 'Áp suất', url: '/convert/pressure', icon: faCompress },
  // { title: 'Góc', url: '/convert/angle', icon: faAngleUp }
];

export const labels = [
  { title: 'Lịch sử', url: 'history', icon: faStopwatch },
  { title: 'Chính sách quyền riêng tư', url: 'privacy', icon: faQuestionCircle },
  { title: 'Về ứng dụng', url: 'about', icon: faInfoCircle },
  { title: 'Thoát', icon: faSignOutAlt }
];

export const currencyApiKey = '082574ea4581f409b026';

export const apiPath = {
  convert: 'convert',
  currencies: 'currencies',
  countries: 'countries'
};
