import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject, OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
// import {MD_DIALOG_DATA} from '@angular/material/dialog';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog'
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Course, Step} from "../../../../apps/academy/academy.types";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {AcademyService} from "../../../../apps/academy/academy.service";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-steps',
  templateUrl: './course-steps.component.html',
  styleUrls: ['./course-steps.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations     : fuseAnimations
})
export class CourseStepsComponent implements OnInit, OnDestroy {
  // private _step: BehaviorSubject<Step | null> = new BehaviorSubject(null);
  private _steps: BehaviorSubject<Step[] | null> = new BehaviorSubject(null);

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  step$: Observable<Step[]>;
  course$: Observable<Course[]>;
  courseId: number;
  steps: Step[];
  flashMessage: 'success' | 'error' | null = null;
  isLoading: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  selectedStep: Step | null = null;
  selectedStepForm: UntypedFormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(   @Inject(MAT_DIALOG_DATA) public data: any,
                 private _changeDetectorRef: ChangeDetectorRef,
                 private _fuseConfirmationService: FuseConfirmationService,
                 private _formBuilder: UntypedFormBuilder,
                 private _academyService: AcademyService,
                 private dialog: MatDialog,
                 public dialogRef: MatDialogRef<CourseStepsComponent>
  ) { }

   ngOnInit(): void{
    console.log(this.data);

    // get the course id
    this.courseId = this.data.dataKey;

    // get the steps
    this.steps = this.data.dataStep;
    this._steps.next(this.data.dataStep);

    console.log("_Steps")
    console.log(this._steps)

    //sleep
    // await new Promise(f => setTimeout(f, 1000));

    this.step$ = this._steps.asObservable();

    console.log("Steps")
    console.log(this.step$)

    //Create the selected step form

    this.selectedStepForm = this._formBuilder.group({
      order: [''],
      title: [''],
      subtitle: [''],
      content: ['']
    });
  }




    /**
   * On destroy
   */
  ngOnDestroy(): void
  {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this.dialogRef.close({id: this.courseId, steps: this.steps})
  }

  /**
   * Toggle product details
   *
   * @param order
   */
  toggleDetails(order: number): void
  {
    // If the step is already selected...
    if ( this.selectedStep && this.selectedStep.order === order )
    {
      // Close the details
      this.closeDetails();
      return;
    }
    // Get the step by id
    for (let i = 0; i < this.steps.length; i++) {
      if (order == this.steps[i].order){
        // Set the selected course
        this.selectedStep = this.steps[i];
        // Fill the form
        this.selectedStepForm.patchValue(this.steps[i]);
        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    }
  }

  /**
   * Close the details
   */
  closeDetails(): void
  {
    this.selectedStep = null;
  }


  /**
   * Create course
   */
  createStep(): void
  {
    let orderId = 0;
    if (this.steps.length>0)
      orderId = this.steps.length;

    const newStep: Step = {
      order: orderId,
      title: 'New',
      subtitle: 'New',
      content: 'New'
    };
    //Creating order like an id

    //   // Go to new step
    this.selectedStep = newStep;
    // add to array
    this.steps[orderId] = newStep;
    // Fill the form
    this.selectedStepForm.patchValue(newStep);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Update the selected step using the form data
   */
  updateSelectedStep(): void
  {
    // Get the step object
    const step = this.selectedStepForm.getRawValue();
    console.log(step);
    // Update the step on the server
    this.steps[step.order] = step;

    this.sortByOrder(this.steps);
    this.showFlashMessage('success');
  }

  /**
   * Delete the selected step using the form data
   */
  deleteSelectedStep(): void
  {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete step',
      message: 'Are you sure you want to remove this step? This action cannot be undone!',
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
        const step = this.selectedStepForm.getRawValue();

        // Delete the course on the server

        this.steps.splice(step.order,1);

        this.sortByOrder(this.steps);

        this.closeDetails();
      }
    });
  }

  sortByOrder(steps:Step[]): void {
    for (let i = 0; i < steps.length; i++) {
      steps[i].order = i;
    }
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
