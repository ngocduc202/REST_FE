import path from "./path";
import { RiDashboardLine } from "react-icons/ri";
import { BsFillHouseGearFill } from "react-icons/bs";

export const navigations = [
  {
    id: 1,
    path: '/',
    text: 'HOME',
  },
  {
    id: 2,
    path: `/${path.ABOUT_US}`,
    text: 'ABOUT US',
  },
  {
    id: 3,
    path: `/${path.OUR_EGENTS}`,
    text: 'OUR EGENTS',
  },
  {
    id: 4,
    path: `/${path.PROPERTIES}`,
    text: 'PROPERTIES',
  },
  {
    id: 5,
    path: `/${path.SEARCH}`,
    text: 'SEARCH',
  },
]

export const adminSidebar = [
  {
    id: 1,
    name: 'Dashboard',
    path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
    icon: <RiDashboardLine />,
    type: 'SINGLE',
  },
  {
    id: 2,
    name: 'Property Types',
    icon: <BsFillHouseGearFill />,
    type: 'PARENT',
    subs: [
      {
        id: 12,
        path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
        name: 'Create'
      },
      {
        id: 13,
        path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
        name: 'Manage'
      },
    ]
  },
]