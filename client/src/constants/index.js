import { create_project, dashboard, payment, profile } from '../assets';

export const navlinks = [
    {
        name: 'dashboard',
        imgUrl: dashboard,
        link: '/',
    },
    {
        name: 'project',
        imgUrl: create_project,
        link: '/create_project',
    },
    {
        name: 'profile',
        imgUrl: profile,
        link: '/profile',
    },

];