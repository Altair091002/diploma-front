import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError} from 'rxjs';
import {Category, Course, Progress, Step} from 'app/modules/apps/academy/academy.types';
import {isDate} from "lodash-es";

@Injectable({
    providedIn: 'root'
})
export class AcademyService
{
    // Private
    private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(null);
    private _category: BehaviorSubject<Category | null> = new BehaviorSubject(null);
    private _course: BehaviorSubject<Course | null> = new BehaviorSubject(null);
    private _courses: BehaviorSubject<Course[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for categories
     */
    get categories$(): Observable<Category[]>
    {
        return this._categories.asObservable();
    }
    /**
     * Getter for category
     */
    get category$(): Observable<Category>
    {
        return this._category.asObservable();
    }

    /**
     * Create category
     */
    createCategory(): Observable<Category>
    {
        return this.categories$.pipe(
            take(1),
            switchMap(categories => this._httpClient.post<Category>('http://localhost:8081/fizmath/academy/api/apps/category', {}).pipe(
                map((newCategory) => {

                    // Update the categories with the new category
                    this._categories.next([newCategory, ...categories]);

                    // Return the new category
                    return newCategory;
                })
            ))
        );
    }
    /**
     * Create course
     */
    createCourse(): Observable<Course>
    {
        return this.courses$.pipe(
            take(1),
            switchMap(courses => this._httpClient.post<Course>('http://localhost:8081/fizmath/academy/api/apps/course', {}).pipe(
                map((newCourse) => {

                    // Update the courses with the new course
                    this._courses.next([newCourse, ...courses]);

                    // Return the new course
                    return newCourse;
                })
            ))
        );
    }

    /**
     * Update category
     *
     * @param id
     * @param title
     * @param slug
     * @param category
     */

    updateCategory(id: string, title: string,slug: string, category: Category): Observable<Category>
    {
        return this.categories$.pipe(
            take(1),
            switchMap(categories => this._httpClient.put<Category>('http://localhost:8081/fizmath/academy/api/apps/category', {
                id,
                title,
                slug
            }).pipe(
                map((updatedCategory) => {

                    // Find the index of the updated category
                    const index = categories.findIndex(item => item.id === id);

                    // Update the category
                    categories[index] = updatedCategory;

                    // Update the categories
                    this._categories.next(categories);

                    // Return the updated category
                    return updatedCategory;
                }),
                switchMap(updatedCategory => this.category$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the category if it's selected
                        this._category.next(updatedCategory);

                        // Return the updated category
                        return updatedCategory;
                    })
                ))
            ))
        );
    }

    /**
     * Update course
     *
     * @param id
     * @param title
     * @param slug
     * @param description
     * @param category
     * @param duration
     * @param steps
     * @param totalSteps
     * @param featured
     * @param progress
     * @param course
     */

    // TODO: Ozgertu kerek: steps kosy

    updateCourse(
        id: string,
        title: string,
        slug: string,
        description: string,
        category:string,
        duration:number,
        steps:Step[],
        totalSteps: number,
        featured: boolean,
        progress: Progress,
        course: Course,

    ): Observable<Course>
    {
        return this.courses$.pipe(
            take(1),
            switchMap(courses => this._httpClient.put<Course>('http://localhost:8081/fizmath/academy/api/apps/course', {
                id,
                title,
                slug,
                description,
                category,
                duration,
                steps,
                totalSteps,
                featured,
                progress
            }).pipe(
                map((updatedCourse) => {

                    // Find the index of the updated course
                    const index = courses.findIndex(item => item.id === id);

                    // Update the course
                    courses[index] = updatedCourse;

                    // Update the courses
                    this._courses.next(courses);

                    // Return the updated course
                    return updatedCourse;
                }),
                switchMap(updatedCourse => this.course$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the course if it's selected
                        this._category.next(updatedCourse);

                        // Return the updated course
                        return updatedCourse;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the category
     *
     * @param id
     */
    deleteCategory(id: string): Observable<boolean>
    {
        return this.categories$.pipe(
            take(1),
            switchMap(categories => this._httpClient.delete('http://localhost:8081/fizmath/academy/api/apps/category', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted category
                    const index = categories.findIndex(item => item.id === id);

                    // Delete the category
                    categories.splice(index, 1);

                    // Update the category
                    this._categories.next(categories);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Delete the course
     *
     * @param id
     */
    deleteCourse(id: string): Observable<boolean>
    {
        return this.courses$.pipe(
            take(1),
            switchMap(courses => this._httpClient.delete('http://localhost:8081/fizmath/academy/api/apps/course', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted course
                    const index = courses.findIndex(item => item.id === id);

                    // Delete the category
                    courses.splice(index, 1);

                    // Update the category
                    this._courses.next(courses);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }


    /**
     * Getter for courses
     */
    get courses$(): Observable<Course[]>
    {
        return this._courses.asObservable();
    }

    /**
     * Getter for course
     */
    get course$(): Observable<Course>
    {
        return this._course.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get categories
     */
    getCategories(): Observable<Category[]>
    {
        return this._httpClient.get<Category[]>('http://localhost:8081/fizmath/academy/api/apps/categories').pipe(
            tap((response: any) => {
                this._categories.next(response);
            })
        );
    }
    /**
     * Get category
     */
    getCategoryById(id: string): Observable<Category>
    {
        return this._httpClient.get<Category>('http://localhost:8081/fizmath/academy/api/apps/category', {params: {id}}).pipe(
            map((category) => {

                // Update the course
                this._course.next(category);

                // Return the course
                return category;
            }),
            switchMap((category) => {

                if ( !category )
                {
                    return throwError('Could not found category with id of ' + id + '!');
                }

                return of(category);
            })
        );
    }

    /**
     * Get courses
     */
    getCourses(): Observable<Course[]>
    {
        return this._httpClient.get<Course[]>('http://localhost:8081/fizmath/academy/api/apps/courses').pipe(
            tap((response: any) => {
                this._courses.next(response);
            })
        );
    }

    /**
     * Get course by id
     */
    getCourseById(id: string): Observable<Course>
    {
        return this._httpClient.get<Course>('http://localhost:8081/fizmath/academy/api/apps/course', {params: {id}}).pipe(
            map((course) => {

                // Update the course
                this._course.next(course);

                // Return the course
                return course;
            }),
            switchMap((course) => {

                if ( !course )
                {
                    return throwError('Could not found course with id of ' + id + '!');
                }

                return of(course);
            })
        );
    }
}
