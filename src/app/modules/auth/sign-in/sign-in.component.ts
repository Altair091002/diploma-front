import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {AuthSignUpComponent} from "../sign-up/sign-up.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthForgotPasswordComponent} from "../forgot-password/forgot-password.component";

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;


    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AuthSignInComponent>
    )
    {}


    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            // hughes.brian@company.com
            // admin
            email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
            password  : ['admin', Validators.required],
            rememberMe: ['']
        });
    }


    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                () => {
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/apps/academy';

                    console.log(redirectURL)

                    // Redirect
                    this._router.navigateByUrl(redirectURL);

                    // Close dialog
                    this.dialogRef.close()
                },
                (response) => {

                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Wrong email or password'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }


    openDialog(component: any): void {
        this.dialogRef.close();

        const dialogRef = this.dialog.open(component);
        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });
    }

    openSignUpDialog() {
        this.openDialog(AuthSignUpComponent);
    }

    openForgotPswDialog() {
        this.openDialog(AuthForgotPasswordComponent);
    }
}
