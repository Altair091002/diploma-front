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
                id      : 'content-management',
                title   : 'Content management',
                type    : 'group',
                icon : 'heroicons_outline:puzzle',
                children: [
                    {
                        id   : 'management.category',
                        title: 'Category management',
                        type : 'basic',
                        link : '/dashboards/content-management/category',
                        icon : 'heroicons_outline:adjustments',
                    },
                    {
                        id   : 'management.course',
                        title: 'Course management',
                        type : 'basic',
                        link : '/dashboards/content-management/course',
                        icon : 'heroicons_outline:adjustments',
                    },
                ]
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
                type : 'basic',
                icon : '',
                link : '/apps/academy'
            },
            {
                id   : 'courses.phys',
                title: 'Physics',
                type : 'basic',
                icon : '',
                link : '/apps/academy'
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
