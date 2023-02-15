import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import {academyCategoryRoutes} from "./academy-category.routing";
import {AcademyCategoryComponent} from "./academy-category.component";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
    declarations: [
        AcademyCategoryComponent
    ],
    imports: [
        RouterModule.forChild(academyCategoryRoutes),
        SharedModule,
        MatIconModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule
    ]
})
export class AcademyCategoryModule
{
}
