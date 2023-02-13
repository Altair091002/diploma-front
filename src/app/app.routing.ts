import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import {AuthForgotPasswordComponent} from "./modules/auth/forgot-password/forgot-password.component";
import {AuthConfirmationRequiredComponent} from "./modules/auth/confirmation-required/confirmation-required.component";
import {AuthResetPasswordComponent} from "./modules/auth/reset-password/reset-password.component";
import {AuthSignInComponent} from "./modules/auth/sign-in/sign-in.component";
import {AuthSignUpComponent} from "./modules/auth/sign-up/sign-up.component";


export const appRoutes: Route[] = [

    // Redirect empty path to Homepage
    {path: '', pathMatch : 'full', redirectTo: 'home'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
            {path: 'apps',
                children: [
                    {path: 'academy', loadChildren: () => import('app/modules/apps/academy/academy.module').then(m => m.AcademyModule)},
                    {path: 'help-center', loadChildren: () => import('app/modules/apps/help-center/help-center.module').then(m => m.HelpCenterModule)},
                ]
            },
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        data: {
            layout: 'modern'
        },
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [

            // Admin tool for category and course
            {
                path: 'academy-settings', children: [
                    {path: 'category', loadChildren: () => import('app/modules/admin/academy-settings/academy-category/academy-category.module').then(m => m.AcademyCategoryModule)},
                    {path: 'course', loadChildren: () => import('app/modules/admin/academy-settings/academy-course/academy-course.module').then(m => m.AcademyCourseModule)},
                ]
            },

            // Dashboards
            {path: 'dashboards', children: [
                {path: 'analytics', loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.module').then(m => m.AnalyticsModule)},
                {path: 'finance', loadChildren: () => import('app/modules/admin/dashboards/finance/finance.module').then(m => m.FinanceModule)},
            ]},

            // Apps
            {path: 'apps', children: [
                {path: 'chat', loadChildren: () => import('app/modules/apps/chat/chat.module').then(m => m.ChatModule)},
                {path: 'file-manager', loadChildren: () => import('app/modules/apps/file-manager/file-manager.module').then(m => m.FileManagerModule)},
            ]},

            {path: 'pages', children: [

                // Error
                {path: 'error', children: [
                    {path: '404', loadChildren: () => import('app/modules/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
                ]},

                // Pricing
                {path: 'pricing', children: [
                    {path: 'modern', loadChildren: () => import('app/modules/pages/pricing/modern/modern.module').then(m => m.PricingModernModule)},
                ]},

                // Profile
                {path: 'profile', loadChildren: () => import('app/modules/pages/profile/profile.module').then(m => m.ProfileModule)},

                // Settings
                {path: 'settings', loadChildren: () => import('app/modules/pages/settings/settings.module').then(m => m.SettingsModule)},
            ]},

            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
