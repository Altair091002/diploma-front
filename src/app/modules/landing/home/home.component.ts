import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    styleUrls    : ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingHomeComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
