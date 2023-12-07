/* eslint-disable */
import React from 'react';
import { FiCreditCard } from 'react-icons/fi';
import { BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';

export const links = [

  {
    title: 'Pages',
    links: [
      {
        name: 'dashboard/AllJobs',
        icon: <RiContactsLine />,
        title: 'All jobs'
      },
      {
        name: 'dashboard/UploadedJobs',
        icon: <IoMdContacts />,
        title: 'Uploaded Jobs'
      },
      {
        name: 'dashboard/AppliedJobs',
        icon: <RiContactsLine />,
        title: 'Applied Jobs'
      },
    ],
  }
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
];
