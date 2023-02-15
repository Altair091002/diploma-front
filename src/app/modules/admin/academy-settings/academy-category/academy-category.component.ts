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
import {Category} from "../../../apps/academy/academy.types";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {AcademyService} from "../../../apps/academy/academy.service";

@Component({
  selector: 'app-academy-category',
  templateUrl: './academy-category.component.html',
  styleUrls: ['./academy-category.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations     : fuseAnimations
})
export class AcademyCategoryComponent implements OnInit, OnDestroy
{
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  category$: Observable<Category[]>
  categories: Category[];
  flashMessage: 'success' | 'error' | null = null;
  isLoading: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  selectedCategory: Category | null = null;
  selectedCategoryForm: UntypedFormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private _fuseConfirmationService: FuseConfirmationService,
              private _formBuilder: UntypedFormBuilder,
              private _academyService: AcademyService) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    //Create the selected category form
    this.selectedCategoryForm = this._formBuilder.group({
      id:[''],
      title: [''],
      slug : ['']
    });

    //get the categories
    this._academyService.categories$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((categories: Category[]) => {
          this.categories = categories;

          // Mark for check
          this._changeDetectorRef.markForCheck();
        });
    this.category$ = this._academyService.categories$;

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
   * Toggle category details
   *
   * @param categoryId
   */
  toggleDetails(categoryId: string): void
  {
    // If the category is already selected...
    if ( this.selectedCategory && this.selectedCategory.id === categoryId )
    {
      // Close the details
      this.closeDetails();
      return;
    }

    // Get the category by id
    this._academyService.getCategoryById(categoryId)
        .subscribe((category) => {

          // Set the selected category
          this.selectedCategory = category;

          // Fill the form
          this.selectedCategoryForm.patchValue(category);

          // Mark for check
          this._changeDetectorRef.markForCheck();
        });
  }

  /**
   * Close the details
   */
  closeDetails(): void
  {
    this.selectedCategory = null;
  }

  /**
   * Create category
   */
  createCategory(): void
  {
    // Create the category
    this._academyService.createCategory().subscribe((newCategory) => {

      // Go to new category
      this.selectedCategory = newCategory;

      // Fill the form
      this.selectedCategoryForm.patchValue(newCategory);

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * Update the selected course using the form data
   */
  updateSelectedCategory(): void
  {
    // Get the category object
    const category = this.selectedCategoryForm.getRawValue();

    console.log(category);
    // Update the category on the server
    this._academyService.updateCategory(category.id, category.title, category.slug, category).subscribe(() => {

      // Show a success message
      this.showFlashMessage('success');
    });
  }

  /**
   * Delete the selected category using the form data
   */
  deleteSelectedCategory(): void
  {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete category',
      message: 'Are you sure you want to remove this category? This action cannot be undone!',
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

        // Get the category object
        const category = this.selectedCategoryForm.getRawValue();

        // Delete the category on the server
        this._academyService.deleteCategory(category.id).subscribe(() => {

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
