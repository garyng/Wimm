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
    title: 'Budgets',
    icon: 'nb-notifications',
    children: [
      {
        title: 'All Budgets',
        link: '/app/budgets/list',
      },
      {
        title: 'Set New Budget',
        link: '/app/budgets/add',
      }
    ]
  },
  {
    title: 'Recurrences',
    icon: 'nb-loop',
    children: [
      {
        title: 'All Recurrences',
        link: '/app/recurrences/list',
      },
      {
        title: 'Add Recurrence',
        link: '/app/recurrences/add',
      }
    ]
  },
  {
    title: 'Profile',
    icon: 'nb-person',
    link: '/app/profile'
  },
];
