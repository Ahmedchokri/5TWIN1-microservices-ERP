import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    link: '/crm',
  },
  
  {
    id: 55,
    label: 'MENUITEMS.APPS.LIST.LEADS',
    icon: 'ri-user-search-line',
    link: '/crm/leads',
    
  },
  {
    id: 55,
    label: 'MENUITEMS.APPS.LIST.COMPANIES',
    icon: 'ri-account-box-line',
    link: '/crm/companies'
  },
  {
    id: 55,
    label: 'Profils',
    icon: 'ri-account-box-line',
    link: '/crm/profil'
  },
  {
    id: 55,
    label: 'MENUITEMS.APPS.LIST.CONTACTS',
    icon: 'ri-contacts-book-line',
    link: '/crm/contacts'
  },
  {
    id: 55,
    label: 'Opportunities',
    icon: 'ri-hand-coin-line',
    subItems: [
      {
        id: 1,
        label: 'List View',
        link: '/crm/opportunities/liste',
        parentId: 55
      },
    ]
  },
  {
    id: 55,
    label: 'MENUITEMS.APPS.LIST.CHECKOUT',
    icon: 'ri-shuffle-line'
  },
  {
    id: 55,
    label: 'MENUITEMS.APPS.LIST.DEALS',
    icon: 'ri-calendar-check-line',
    link: '/crm/deals'
  },
  {
    id: 55,
    label: 'MENUITEMS.APPS.LIST.TASK',
    icon: 'ri-task-line',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.APPS.LIST.LISTVIEW',
        link: '/tasks/list-view',
        parentId: 55
      },
      {
        id: 2,
        label: 'MENUITEMS.APPS.LIST.KANBANBOARD',
        link: '/tasks/kanban',
        parentId: 55
      }
    ]
  },
  {
    id: 9,
    label: 'MENUITEMS.APPS.LIST.CALENDAR',
    icon: 'ri-calendar-2-line',
    link: '/calendar',
    
  },
  {
    id: 55,
    label: 'MENUITEMS.APPS.LIST.SUPPORTTICKETS',
    icon: 'ri-file-search-line',
    link: "/tickets/list"
  },
  {
    id: 55,
    label: 'MENUITEMS.APPS.LIST.INVOICES',
    icon: 'ri-money-dollar-circle-line',
    link: '/invoices/list'
  },
  {
    id: 55,
    label: 'MENUITEMS.APPS.LIST.ECOMMERCE',
    icon: 'ri-file-line'
  },
  
];
