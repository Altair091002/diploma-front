/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        subtitle: 'Unique dashboard designs',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'apps.file-manager',
                title: 'File Manager',
                type : 'basic',
                icon : 'heroicons_outline:cloud',
                link : '/apps/file-manager'
            },
            {
                id   : 'dashboards.analytics',
                title: 'Analytics',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/analytics'
            },
            {
                id   : 'dashboards.finance',
                title: 'Finance',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/finance'
            }
        ]
    },
    {
        id      : 'academy-settings',
        title   : 'Academy Settings',
        subtitle: 'Unique academy settings',
        type    : 'group',
        icon : 'heroicons_outline:phone',
        children: [
            {
                id   : 'settings.category',
                title: 'Course settings',
                type : 'basic',
                link : '/academy-settings/category',
                icon : 'heroicons_outline:pencil',
            },
            {
                id   : 'settings.course',
                title: 'Course settings',
                type : 'basic',
                link : '/academy-settings/course',
                icon : 'heroicons_outline:pencil',
            },
        ]
    },
    {
        id   : 'courses',
        title: 'Courses',
        subtitle: 'Custom made application designs',
        type : 'group',
        icon : 'heroicons_outline:academic-cap',
        children: [
            {
                id   : 'courses.math',
                title: 'Mathematics',
                type : 'collapsable',
                icon : '',
                children: [
                    {
                        id   : 'math.1',
                        title: 'Trigonometry',
                        type : 'basic',
                        icon : '',
                        link: ''
                    },
                    {
                        id   : 'math.2',
                        title: 'Statistics',
                        type : 'basic',
                        icon : '',
                        link : ''
                    },
                ]
            },
            {
                id   : 'courses.phys',
                title: 'Physics',
                type : 'collapsable',
                icon : '',
                children: [
                    {
                        id   : 'phys.1',
                        title: 'Straight-line movement',
                        type : 'basic',
                        icon : '',
                        link : ''
                    },
                    {
                        id   : 'phys.2',
                        title: 'Newton\'s forces and laws of motion',
                        type : 'basic',
                        icon : '',
                        link : ''
                    },
                ]
            },
        ]
    },
    {
        id  : 'divider-1',
        type: 'divider'
    },
    {
        id   : 'apps.chat',
        title: 'Chat',
        type : 'basic',
        icon : 'heroicons_outline:chat-alt',
        link : '/apps/chat'
    },
    {
        id      : 'apps.help-center',
        title   : 'Help Center',
        type    : 'basic',
        icon    : 'heroicons_outline:support',
        link      : '/apps/help-center',
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: []
    },
    {
        id      : 'academy-settings',
        title   : 'Academy Settings',
        type    : 'group',
        icon : 'heroicons_outline:phone',
        children: []
    },
    {
        id   : 'courses',
        title: 'Courses',
        type : 'group',
        icon : 'heroicons_outline:academic-cap',
        children: []
    },
    {
        id   : 'chat',
        title: 'Chat',
        type : 'basic',
        icon : 'heroicons_outline:chat-alt',
        link : '/apps/chat'
    },
    {
        id: 'help-center',
        title: 'Help Center',
        type: 'basic',
        icon: 'heroicons_outline:support',
        link: '/apps/help-center',
    }
];
