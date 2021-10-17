import {
  faThermometerEmpty, faCoins, faCube, faRuler, faBalanceScale, faBurn, faServer, faBolt, faClock, faChild,
  faTachometerAlt, faStopwatch, faVectorSquare, faCompress, faAngleUp, faCalculator, faQuestionCircle, faSignOutAlt,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const length = [
  { name: 'Micromet (um)', value: 'um', rate: 0.001 }, { name: 'Milimet (mm)', value: 'mm', rate: 1 },
  { name: 'Xentimet (cm)', value: 'cm', rate: 10 }, { name: 'Deximet ̣(dm)', value: 'dm', rate: 100 },
  { name: 'Met (m)', value: 'm', rate: 1000 }, { name: 'Hectomet (hm)', value: 'hm', rate: 100000 },
  { name: 'Kilomet (km)', value: 'km', rate: 1000000 }, { name: 'Inch (in)', value: 'in', rate: 25.4 },
  { name: 'Dặm (Mile)', value: 'mile', rate: 1609344 }, { name: 'Thước Anh (Yard)', value: 'yard', rate: 914.4 },
  { name: 'feet (foot)', value: 'feet', rate: 304.8 }, { name: 'Hải lý', value: 'haily', rate: 1852000 }
];

const square = [
  { name: 'Milimet vuông', value: 'mm', rate: 1 }, { name: 'Centimet vuông', value: 'cm', rate: 100 },
  { name: 'Mét vuông', value: 'm', rate: 10 ** 6 }, { name: 'Hecta', value: 'hm', rate: 10 ** 10 },
  { name: 'Kilomet vuông', value: 'km', rate: 10 ** 12 }, { name: 'Inch vuông', value: 'in', rate: 645.16 },
  { name: 'Foot vuông (ft)', value: 'ft', rate: 304.8 * 304.8 }, { name: 'Thước vuông (yard)', value: 'yard', rate: 914.4 * 914.4 },
  { name: 'Mẫu Anh (acre)', value: 'acre', rate: 4046856422.4 }, { name: 'Dặm vuông (mile)', value: 'mile', rate: 1609344 * 1609344 }
];

const time = [
  { name: 'Mili giây', value: 'ms', rate: 0.001 }, { name: 'Giây', value: 's', rate: 1 },
  { name: 'Phút', value: 'min', rate: 60 }, { name: 'Giờ', value: 'h', rate: 3600 }, { name: 'Ngày', value: 'd', rate: 86400 },
  { name: 'Tuần', value: 'w', rate: 604800 }, { name: 'Năm', value: 'y', rate: 31557600 }
];

const dataRelative = [
  { name: 'Bit (bit)', value: 'b', rate: 0.125 }, { name: 'Byte (B)', value: 'B', rate: 1 },
  { name: 'Kilobyte (KB)', value: 'kb', rate: 10 ** 3 }, { name: 'Megabyte (MB)', value: 'mb', rate: 10 ** 6 },
  { name: 'Gigabyte (GB)', value: 'gb', rate: 10 ** 9 }, { name: 'Terabyte (TB)', value: 'tb', rate: 10 ** 12 },
  { name: 'Petabyte (PB)', value: 'pb', rate: 10 ** 15 }, { name: 'Exabyte (EB)', value: 'eb', rate: 10 ** 18 },
  { name: 'Zetabyte (ZB)', value: 'zb', rate: 10 ** 21 }, { name: 'Yottabyte (YB)', value: 'yb', rate: 10 ** 24 }
];

const dataAbsolute = [
  { name: 'Bit (bit)', value: 'b', rate: 0.125 }, { name: 'Byte (B)', value: 'B', rate: 1 },
  { name: 'Kilobyte (KB)', value: 'kb', rate: 1024 }, { name: 'Megabyte (MB)', value: 'mb', rate: 1024 ** 2 },
  { name: 'Gigabyte (GB)', value: 'gb', rate: 1024 ** 3 }, { name: 'Terabyte (TB)', value: 'tb', rate: 1024 ** 4 },
  { name: 'Petabyte (PB)', value: 'pb', rate: 1024 ** 5 }, { name: 'Exabyte (EB)', value: 'eb', rate: 1024 ** 6 },
  { name: 'Zetabyte (ZB)', value: 'zb', rate: 1024 ** 7 }, { name: 'Yottabyte (YB)', value: 'yb', rate: 1024 ** 8 }
];

const speed = [
  { name: 'cm/s', value: 'cs', rate: 1 }, { name: 'm/s', value: 'ms', rate: 100 }, { name: 'km/h', value: 'kh', rate: 100000 / 3600 },
  { name: 'Dặm/s', value: 'ds', rate: 30.48 }, { name: 'Dặm/h', value: 'dh', rate: 44.7 },
  { name: 'knot', value: 'k', rate: 185200 / 3600 }, { name: 'Mach', value: 'm', rate: 34030 }
];

const weight = [
  { name: 'Carat', value: 'cr', rate: 0.2 }, { name: 'Miligam (mg)', value: 'mg', rate: 0.001 },
  { name: 'Gam (g)', value: 'g', rate: 1 }, { name: 'Chỉ (kim loại)', value: 'c', rate: 3.75 },
  { name: 'Lượng (kim loại)', value: 'l', rate: 37.5 }, { name: 'Lượng ta (g)', value: 'lt', rate: 100 },
  { name: 'Kilogam (kg)', value: 'kg', rate: 1000 }, { name: 'Yến', value: 'y', rate: 10000 },
  { name: 'Tạ', value: 'ta', rate: 100000 }, { name: 'Tấn (t)', value: 't', rate: 1000000 },
  { name: 'Ounce (oz)', value: 'oz', rate: 28.349523125 }, { name: 'Pound (lb)', value: 'lb', rate: 453.59237 }
];

const power = [
  { name: 'Watt', value: 'w', rate: 1 }, { name: 'Kilowatt', value: 'kW', rate: 10 ** 3 },
  { name: 'Mêgawatt', value: 'MW', rate: 10 ** 6 }, { name: 'Gigawatt', value: 'GW', rate: 10 ** 9 },
  { name: 'Têrawatt', value: 'TW', rate: 10 ** 12 }, { name: 'Pêtawatt', value: 'PW', rate: 10 ** 15 },
  { name: 'Êxawatt', value: 'EW', rate: 10 ** 18 }, { name: 'Zêtawatt', value: 'ZW', rate: 10 ** 21 },
  { name: 'Yôtawatt', value: 'YW', rate: 10 ** 24 }, { name: 'J/s', value: 'Js', rate: 1 },
  { name: 'Mã lực (Mỹ-Anh)', value: 'hp-us-uk', rate: 745.6999 }, { name: 'Mã lực (Pháp)', value: 'hp-fr', rate: 735.5 },
  { name: 'BTU/phút', value: 'btu', rate: 17.58427 }, { name: 'Dặm-pound/phút', value: 'dpm', rate: 0.022597 }
];

const angle = [
  { name: 'Độ', value: 'o', rate: 1 }, { name: 'Phút (góc)', value: 'm', rate: 1 / 60 },
  { name: 'Giây (góc)', value: 's', rate: 1 / 3600 }, { name: 'Radian', value: 'rad', rate: 180 / Math.PI },
  { name: 'Gradian', value: 'grad', rate: 0.9 }
];

const pressure = [
  { name: 'Pascal', value: 'Pa', rate: 1 }, { name: 'Kilo Pascal', value: 'kPa', rate: 1000 }, { name: 'N/m vuông', value: 'Nm', rate: 1 },
  { name: 'bar', value: 'bar', rate: 10 ** 5 }, { name: 'Atmosphere kỹ thuật (at)', value: 'at', rate: 98066.5 },
  { name: 'Atmosphere (atm)', value: 'atm', rate: 101325 }, { name: 'tor', value: 'tor', rate: 101325 / 760 },
  { name: 'Pound/inch vuông (psi)', value: 'psi', rate: 6894.757293168 },
  { name: 'Milimet thủy ngân (mmHg)', value: 'mmHg', rate: 13.5951 * 9.80665 }
];

const cube = [
  { name: 'Mililit', value: 'ml', rate: 1 }, { name: 'Lit', value: 'l', rate: 1000 }, { name: 'Centimet khối', value: 'cm', rate: 1 },
  { name: 'Deximet khối', value: 'dm', rate: 10 ** 3 }, { name: 'Met khối', value: 'm', rate: 1000000 },
  { name: 'Thìa cà phê (Mỹ)', value: 'cf-us', rate: 4.928922 }, { name: 'Thìa canh (Mỹ)', value: 'c-us', rate: 14.78676 },
  { name: 'Ounce (Mỹ)', value: 'oz-us', rate: 29.57353 }, { name: 'Cốc (Mỹ)', value: 'coc-us', rate: 236.5882 },
  { name: 'Panh (Mỹ)', value: 'p-us', rate: 473.1765 }, { name: 'Quart (Mỹ)', value: 'q-us', rate: 946.3529 },
  { name: 'Gallon (Mỹ)', value: 'ga-us', rate: 3785.412 }, { name: 'Inch khối', value: 'in', rate: 16.38706 },
  { name: 'Feet khối', value: 'feet', rate: 28316.85 }, { name: 'Yard khối', value: 'yard', rate: 764554.9 },
  { name: 'Thìa cà phê (Anh)', value: 'cf-uk', rate: 5.919388 }, { name: 'Thìa canh (Anh)', value: 'c-uk', rate: 17.75816 },
  { name: 'Ounce (Anh)', value: 'oz-uk', rate: 28.41306 }, { name: 'Panh (Anh)', value: 'p-uk', rate: 568.2613 },
  { name: 'Quart (Anh)', value: 'q-uk', rate: 1136.523 }, { name: 'Gallon (Anh)', value: 'ga-uk', rate: 4546.09 }
];

const energy = [
  { name: 'Jun', value: 'J', rate: 1 }, { name: 'kilojun', value: 'kJ', rate: 1000 }, { name: 'megajun', value: 'MJ', rate: 1000000 },
  { name: 'gigajun', value: 'GJ', rate: 10 ** 9 }, { name: 'cal', value: 'cal', rate: 4.184 }, { name: 'kcal', value: 'kcal', rate: 4184 },
  { name: 'Foot-pound', value: 'fp', rate: 1.3558179483314004 }, { name: 'BTU', value: 'btu', rate: 1055.056 }
];

const temperature = [
  { name: 'Kelvin', value: 'k' }, { name: 'Độ C', value: 'c' }, { name: 'Độ F', value: 'f' }
];

export const calculators = [
  { title: 'Thông thường', url: '/calculator/general', icon: faCalculator },
  { title: 'Chỉ số cơ thể (BMI)', url: '/calculator/bmi', icon: faChild }
];

export const converts = [
  { title: 'Tiền tệ', url: '/convert/currency', icon: faCoins },
  { title: 'Nhiệt độ', url: '/convert/temperature', icon: faThermometerEmpty, data: temperature },
  { title: 'Thể tích', url: '/convert/cube', icon: faCube, base: 'ml', data: cube },
  { title: 'Độ dài', url: '/convert/length', icon: faRuler, base: 'mm', data: length },
  { title: 'Trọng lượng', url: '/convert/weight', icon: faBalanceScale, base: 'cr', data: weight },
  { title: 'Năng lượng', url: '/convert/energy', icon: faBurn, base: '', data: energy },
  { title: 'Diện tích', url: '/convert/square', icon: faVectorSquare, base: 'mm', data: square },
  { title: 'Tốc độ', url: '/convert/speed', icon: faTachometerAlt, base: 'cs', data: speed },
  { title: 'Thời gian', url: '/convert/time', icon: faClock, base: 's', data: time },
  { title: 'Nguồn điện', url: '/convert/power', icon: faBolt, base: 'w', data: power },
  { title: 'Dữ liệu (tương đối)', url: '/convert/data-relative', icon: faServer, base: 'B', data: dataRelative },
  { title: 'Dữ liệu (tuyệt đối)', url: '/convert/data-absolute', icon: faServer, base: 'B', data: dataAbsolute },
  { title: 'Áp suất', url: '/convert/pressure', icon: faCompress, base: 'Pa', data: pressure },
  { title: 'Góc', url: '/convert/angle', icon: faAngleUp, base: 'o', data: angle }
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
