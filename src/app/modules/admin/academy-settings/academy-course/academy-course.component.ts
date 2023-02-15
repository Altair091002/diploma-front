import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable, Subject, takeUntil} from "rxjs";
import {Category, Course, Step} from "../../../apps/academy/academy.types";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {AcademyService} from "../../../apps/academy/academy.service";
import {AuthSignInComponent} from "../../../auth/sign-in/sign-in.component";
import {MatDialog} from "@angular/material/dialog";
import {CourseStepsComponent} from "./course-steps/course-steps.component";

@Component({
  selector: 'app-academy-course',
  templateUrl: './academy-course.component.html',
  styleUrls: ['./academy-course.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations     : fuseAnimations
})
export class AcademyCourseComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  course$: Observable<Course[]>
  courses: Course[];
  flashMessage: 'success' | 'error' | null = null;
  isLoading: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  selectedCourse: Course | null = null;
  selectedCourseForm: UntypedFormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  currentSteps: Step[];
  currentCourseId: number;



  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private _fuseConfirmationService: FuseConfirmationService,
              private _formBuilder: UntypedFormBuilder,
              private _academyService: AcademyService,
              private dialog: MatDialog
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    //Create the selected course form
    this.selectedCourseForm = this._formBuilder.group({
      id:[''],
      title: [''],
      slug : [''],
      description : [''],
      category : [''],
      duration : [''],
      // steps_order: [''],
      // steps_title: [''],
      // steps_subtitle: [''],
      // steps_content: [''],
      totalSteps: [''],
      // updatedAt: [''],
      featured: [false],
      // currentStep: [''],
      // completed: ['']
    });

    //get the courses
    this._academyService.courses$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((courses: Course[]) => {
          this.courses = courses;

          // Mark for check
          this._changeDetectorRef.markForCheck();
        });
    this.course$ = this._academyService.courses$;

  }
  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Toggle product details
   *
   * @param courseId
   */
  toggleDetails(courseId: string): void
  {
    // If the course is already selected...
    if ( this.selectedCourse && this.selectedCourse.id === courseId )
    {
      // Close the details
      this.closeDetails();
      return;
    }

    // Get the course by id
    this._academyService.getCourseById(courseId)
        .subscribe((course) => {

          // Set the selected course
          this.selectedCourse = course;

          // Fill the form
          this.selectedCourseForm.patchValue(course);

          // Mark for check
          this._changeDetectorRef.markForCheck();
        });
  }

  /**
   * Close the details
   */
  closeDetails(): void
  {
    this.selectedCourse = null;
  }

  /**
   * Create course
   */
  createCourse(): void
  {
    // Create the course
    this._academyService.createCourse().subscribe((newCourse) => {

      // Go to new course
      this.selectedCourse = newCourse;

      // Fill the form
      this.selectedCourseForm.patchValue(newCourse);

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * Update the selected course using the form data
   */
  // TODO add Steps
  updateSelectedCourse(): void
  {
    // Get the course object
    const course = this.selectedCourseForm.getRawValue();
    console.log(course);
    // Update the course on the server
    this._academyService.updateCourse(
        course.id,
        course.title,
        course.slug,
        course.description,
        course.category,
        course.duration,
        course.totalSteps,
        course.featured,
        course).subscribe(() => {

      // Show a success message
      this.showFlashMessage('success');
    });
  }


  /**
   * Delete the selected course using the form data
   */
  deleteSelectedCourse(): void
  {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete course',
      message: 'Are you sure you want to remove this course? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if ( result === 'confirmed' )
      {

        // Get the course object
        const course = this.selectedCourseForm.getRawValue();

        // Delete the course on the server
        this._academyService.deleteCourse(course.id).subscribe(() => {

          // Close the details
          this.closeDetails();
        });
      }
    });
  }



  /**
   * Show flash message
   */
  showFlashMessage(type: 'success' | 'error'): void
  {
    // Show the message
    this.flashMessage = type;

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Hide it after 3 seconds
    setTimeout(() => {

      this.flashMessage = null;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    }, 3000);
  }

  openDialog(id: string, steps: Step[]): void {
    const dialogRef = this.dialog.open(CourseStepsComponent, {
      width: '900px',
      height: '500px',
      data: {
        dataKey: id,
        dataStep: steps
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentCourseId = result.id;
      this.currentSteps = result.steps;
      console.log(this.currentCourseId);
      console.log(this.currentSteps);
      console.log('The dialog was closed');
    });
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any
  {
    return item.id || index;
  }

}
