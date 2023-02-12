import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../../core/user/user.service";
import {User} from "../../../core/user/user.types";

@Component({
    selector       : 'profile',
    templateUrl    : './profile.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent
{
    public user: User;

    constructor(private userService: UserService)
    {}

    ngOnInit() {
        this.userService.user$.subscribe(user => {
            console.log(user);
            this.user = user;
        });
    }
}
