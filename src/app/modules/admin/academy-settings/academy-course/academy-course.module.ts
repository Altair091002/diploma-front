import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import {AcademyCourseComponent} from "./academy-course.component";
import {academyCourseRoutes} from "./academy-course.routing";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { CourseStepsComponent } from './course-steps/course-steps.component';

@NgModule({
    declarations: [
        AcademyCourseComponent,
        CourseStepsComponent
    ],
    imports: [
        RouterModule.forChild(academyCourseRoutes),
        SharedModule,
        MatProgressBarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        MatSlideToggleModule
    ]
})
export class AcademyCourseModule
{
}
