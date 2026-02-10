import Zapravka3 from '../assets/icons/zapravka3';
import Zapravka1 from '../assets/icons/zapravka1';
import Zapravka2 from '../assets/icons/zapravka2';

export const walletData = [
  {
    id: 1,
    name: 'АЗС 047',
    icon: <Zapravka1 width={32} height={32} />,
    status: 'Заправка | Успешно',
    amount: '-13 360',
    color: '#000',
  },
  {
    id: 2,
    name: 'Альфа-банк',
    icon: <Zapravka2 width={32} height={32} />,
    status: 'Пополнение',
    amount: '+13 000',
    color: '#00A046',
  },
  {
    id: 3,
    name: 'ВТБ',
    icon: <Zapravka3 width={32} height={32} />,
    status: 'Пополнение',
    amount: '+5 000',
    color: '#00A046',
  },
  {
    id: 4,
    name: 'АЗС 047',
    icon: <Zapravka2 width={32} height={32} />,
    status: 'Заправка | Прервано',
    amount: '-1 000',
    color: '#000',
  },
  {
    id: 5,
    name: 'АЗС 047',
    icon: <Zapravka1 width={32} height={32} />,
    status: 'Заправка | Отменено',
    amount: '0',
    color: '#F32E2E',
  },
];
