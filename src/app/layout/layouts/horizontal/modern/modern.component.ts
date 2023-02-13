import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import {AuthService} from "../../../../core/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthSignInComponent} from "../../../../modules/auth/sign-in/sign-in.component";
import {AppConfig, Scheme} from "../../../../core/config/app.config";
import {FuseConfigService} from "../../../../../@fuse/services/config";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
    selector     : 'modern-layout',
    templateUrl  : './modern.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ModernLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    navigation: Navigation;
    config: AppConfig;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    isUserAuthenticated = this.authService.authenticated;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseConfigService: FuseConfigService,

        private authService: AuthService,
        private dialog: MatDialog
    )
    {
    }

    get currentYear(): number
    {
        return new Date().getFullYear();
    }


    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AppConfig) => {

                // Store the config
                this.config = config;
            });
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }


    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /*
     * Set the scheme on the config
     */
    setScheme(value: MatSlideToggleChange): void
    {
        // this._fuseConfigService.config = { scheme: 'light' };
        // if (value.checked)
        //     this._fuseConfigService.config = { scheme: 'dark' };
        this._fuseConfigService.config = { scheme: value.checked ? 'dark' : 'light' };
    }

    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AuthSignInComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
