import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import {AcademyCourseComponent} from "./academy-course.component";
import {academyCourseRoutes} from "./academy-course.routing";

@NgModule({
    declarations: [
        AcademyCourseComponent
    ],
    imports     : [
        RouterModule.forChild(academyCourseRoutes),
        SharedModule
    ]
})
export class AcademyCourseModule
{
}
