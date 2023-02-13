import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import {academyCategoryRoutes} from "./academy-category.routing";
import {AcademyCategoryComponent} from "./academy-category.component";

@NgModule({
    declarations: [
        AcademyCategoryComponent
    ],
    imports     : [
        RouterModule.forChild(academyCategoryRoutes),
        SharedModule
    ]
})
export class AcademyCategoryModule
{
}
