import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEM: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/app/dashboard',
    home: true
  },
  {
    title: 'Records',
    icon: 'nb-compose',
    children: [
      {
        title: 'All Records',
        link: '/app/records/list',
      },
      {
        title: 'New Record',
        link: '/app/records/add',
      }
    ]
  },
  {
    title: 'Profile',
    icon: 'nb-person',
    link: '/app/profile'
  },
];
